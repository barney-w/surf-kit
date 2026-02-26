import { useState, useCallback, useRef, useEffect } from 'react'
import type { StreamEvent, StreamState } from '../types/streaming'
import type { Source } from '../types/agent'

export interface UseStreamingOptions {
  /** SSE endpoint URL */
  url: string
  /** Additional headers for fetch-based SSE (not used with native EventSource) */
  headers?: Record<string, string>
  /** Called when a complete response is received */
  onDone?: (event: Extract<StreamEvent, { type: 'done' }>) => void
  /** Called on error */
  onError?: (event: Extract<StreamEvent, { type: 'error' }>) => void
}

const initialState: StreamState = {
  active: false,
  phase: 'idle',
  content: '',
  sources: [],
  agent: null,
  agentLabel: null,
}

export function useStreaming(options: UseStreamingOptions) {
  const { url, headers, onDone, onError } = options
  const [state, setState] = useState<StreamState>(initialState)
  const abortRef = useRef<AbortController | null>(null)
  const optionsRef = useRef(options)
  optionsRef.current = options

  const stop = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort()
      abortRef.current = null
    }
    setState((prev) => ({ ...prev, active: false, phase: 'idle' }))
  }, [])

  const start = useCallback(
    async (body: Record<string, unknown>) => {
      // Reset state
      setState({ ...initialState, active: true, phase: 'thinking' })

      const controller = new AbortController()
      abortRef.current = controller

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'text/event-stream',
            ...headers,
          },
          body: JSON.stringify(body),
          signal: controller.signal,
        })

        if (!response.ok) {
          const errorEvent: StreamEvent = {
            type: 'error',
            error: {
              code: 'API_ERROR',
              message: `HTTP ${response.status}: ${response.statusText}`,
              retryable: response.status >= 500,
            },
          }
          setState((prev) => ({ ...prev, active: false, phase: 'idle' }))
          optionsRef.current.onError?.(errorEvent as Extract<StreamEvent, { type: 'error' }>)
          return
        }

        const reader = response.body?.getReader()
        if (!reader) {
          setState((prev) => ({ ...prev, active: false, phase: 'idle' }))
          return
        }

        const decoder = new TextDecoder()
        let buffer = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() ?? ''

          for (const line of lines) {
            if (!line.startsWith('data: ')) continue
            const data = line.slice(6).trim()
            if (data === '[DONE]') continue

            try {
              const event = JSON.parse(data) as StreamEvent
              processEvent(event, setState, optionsRef)
            } catch {
              // Skip malformed events
            }
          }
        }
      } catch (err: unknown) {
        if ((err as Error).name === 'AbortError') return
        const errorEvent: StreamEvent = {
          type: 'error',
          error: {
            code: 'NETWORK_ERROR',
            message: (err as Error).message ?? 'Network error',
            retryable: true,
          },
        }
        setState((prev) => ({ ...prev, active: false, phase: 'idle' }))
        optionsRef.current.onError?.(errorEvent as Extract<StreamEvent, { type: 'error' }>)
      }
    },
    [url, headers],
  )

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortRef.current) {
        abortRef.current.abort()
      }
    }
  }, [])

  return { state, start, stop }
}

function processEvent(
  event: StreamEvent,
  setState: React.Dispatch<React.SetStateAction<StreamState>>,
  optionsRef: React.MutableRefObject<UseStreamingOptions>,
) {
  switch (event.type) {
    case 'phase':
      setState((prev) => ({ ...prev, phase: event.phase }))
      break
    case 'delta':
      setState((prev) => ({ ...prev, content: prev.content + event.content }))
      break
    case 'source':
      setState((prev) => ({ ...prev, sources: [...prev.sources, event.source] }))
      break
    case 'agent':
      setState((prev) => ({ ...prev, agent: event.agent }))
      break
    case 'done':
      setState((prev) => ({ ...prev, active: false, phase: 'idle' }))
      optionsRef.current.onDone?.(event)
      break
    case 'error':
      setState((prev) => ({ ...prev, active: false, phase: 'idle' }))
      optionsRef.current.onError?.(event)
      break
  }
}
