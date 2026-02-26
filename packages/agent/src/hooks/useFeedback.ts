import { useState, useCallback, useRef } from 'react'

export type FeedbackState = 'idle' | 'submitting' | 'submitted' | 'error'

export interface UseFeedbackOptions {
  /** API endpoint URL for feedback submission */
  url: string
  /** Additional request headers */
  headers?: Record<string, string>
}

export interface FeedbackPayload {
  messageId: string
  rating: 'positive' | 'negative'
  comment?: string
}

export function useFeedback(options: UseFeedbackOptions) {
  const { url, headers } = options
  const [state, setState] = useState<FeedbackState>('idle')
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const submit = useCallback(
    async (messageId: string, rating: 'positive' | 'negative', comment?: string) => {
      setState('submitting')
      setError(null)

      const controller = new AbortController()
      abortRef.current = controller

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...headers,
          },
          body: JSON.stringify({ messageId, rating, comment }),
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }

        setState('submitted')
      } catch (err: unknown) {
        if ((err as Error).name === 'AbortError') return
        setError((err as Error).message ?? 'Failed to submit feedback')
        setState('error')
      }
    },
    [url, headers],
  )

  const reset = useCallback(() => {
    setState('idle')
    setError(null)
  }, [])

  return { state, error, submit, reset }
}
