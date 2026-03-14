'use client'

import { useReducer, useCallback, useRef } from 'react'
import type { ChatMessage, ChatError, Attachment } from '../types/chat'
import type { AgentResponse } from '../types/agent'
import type { StreamState } from '../types/streaming'
import type { AgentChatConfig } from '../types/config'

// ── State ──────────────────────────────────────────────────────────────

export interface AgentChatState {
  messages: ChatMessage[]
  conversationId: string | null
  isLoading: boolean
  error: ChatError | null
  inputValue: string
  streamPhase: StreamState['phase']
  streamingContent: string
  streamingAgent: string | null
}

const initialState: AgentChatState = {
  messages: [],
  conversationId: null,
  isLoading: false,
  error: null,
  inputValue: '',
  streamPhase: 'idle',
  streamingContent: '',
  streamingAgent: null,
}

// ── Actions ────────────────────────────────────────────────────────────

type Action =
  | { type: 'SET_INPUT'; value: string }
  | { type: 'SEND_START'; message: ChatMessage }
  | { type: 'STREAM_PHASE'; phase: StreamState['phase'] }
  | { type: 'STREAM_CONTENT'; content: string }
  | { type: 'STREAM_CONTENT_RESET' }
  | { type: 'STREAM_AGENT'; agent: string }
  | { type: 'SEND_SUCCESS'; message: ChatMessage; streamingContent: string; conversationId: string | null }
  | { type: 'SEND_ERROR'; error: ChatError }
  | { type: 'LOAD_CONVERSATION'; conversationId: string; messages: ChatMessage[] }
  | { type: 'RESET' }
  | { type: 'CLEAR_ERROR' }

function reducer(state: AgentChatState, action: Action): AgentChatState {
  switch (action.type) {
    case 'SET_INPUT':
      return { ...state, inputValue: action.value }

    case 'SEND_START':
      return {
        ...state,
        messages: [...state.messages, action.message],
        isLoading: true,
        error: null,
        inputValue: '',
        streamPhase: 'thinking',
        streamingContent: '',
        streamingAgent: null,
      }

    case 'STREAM_PHASE':
      return { ...state, streamPhase: action.phase }

    case 'STREAM_CONTENT':
      return { ...state, streamingContent: state.streamingContent + action.content }

    case 'STREAM_CONTENT_RESET':
      return { ...state, streamingContent: '' }

    case 'STREAM_AGENT':
      return { ...state, streamingAgent: action.agent }

    case 'SEND_SUCCESS':
      return {
        ...state,
        messages: [...state.messages, action.message],
        conversationId: action.conversationId ?? state.conversationId,
        isLoading: false,
        streamPhase: 'idle',
        streamingContent: '',
      }

    case 'SEND_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.error,
        streamPhase: 'idle',
        streamingContent: '',
        streamingAgent: null,
      }

    case 'LOAD_CONVERSATION':
      return {
        ...state,
        conversationId: action.conversationId,
        messages: action.messages,
        error: null,
      }

    case 'RESET':
      return { ...initialState }

    case 'CLEAR_ERROR':
      return { ...state, error: null }

    default:
      return state
  }
}

// ── Hook ───────────────────────────────────────────────────────────────

let msgIdCounter = 0
function generateMessageId(): string {
  return `msg-${Date.now()}-${++msgIdCounter}`
}

export interface AgentChatActions {
  sendMessage: (content: string, attachments?: Attachment[]) => Promise<void>
  setInputValue: (value: string) => void
  loadConversation: (conversationId: string, messages: ChatMessage[]) => void
  submitFeedback: (messageId: string, rating: 'positive' | 'negative', comment?: string) => Promise<void>
  retry: () => Promise<void>
  reset: () => void
}

export function useAgentChat(config: AgentChatConfig) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const configRef = useRef(config)
  configRef.current = config
  const lastUserMessageRef = useRef<string | null>(null)
  const lastUserAttachmentsRef = useRef<Attachment[] | undefined>(undefined)

  const sendMessage = useCallback(
    async (content: string, attachments?: Attachment[]) => {
      const { apiUrl, streamPath = '/chat/stream', headers: headersOrFn, timeout = 30000, bodyExtra } = configRef.current
      const headers = typeof headersOrFn === 'function' ? await headersOrFn() : (headersOrFn ?? {})

      lastUserMessageRef.current = content
      lastUserAttachmentsRef.current = attachments

      const userMessage: ChatMessage = {
        id: generateMessageId(),
        role: 'user',
        content,
        attachments,
        timestamp: new Date(),
      }

      dispatch({ type: 'SEND_START', message: userMessage })

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), timeout)

      try {
        const url = `${apiUrl}${streamPath}`
        const mergedHeaders: Record<string, string> = {
          'Content-Type': 'application/json',
          Accept: 'text/event-stream',
          ...headers,
        }

        // Build request body — include attachments if present
        const requestBody: Record<string, unknown> = {
          message: content,
          conversation_id: state.conversationId,
          ...bodyExtra,
        }
        if (attachments && attachments.length > 0) {
          requestBody.attachments = attachments.map(a => ({
            filename: a.filename,
            content_type: a.content_type,
            data: a.data,
          }))
        }
        const body = JSON.stringify(requestBody)

        // These variables are mutated inside handleEvent (called from async stream processing).
        // TypeScript can't track mutations through closures, so we use a mutable context object.
        const ctx = {
          accumulatedContent: '',
          agentResponse: null as AgentResponse | null,
          capturedAgent: null as string | null,
          capturedConversationId: null as string | null,
          hadStreamError: false,
        }

        // Shared handler for parsed SSE events (used by both adapter and default paths)
        const handleEvent = (event: { type: string; [key: string]: unknown }) => {
          switch (event.type) {
            case 'agent':
              ctx.capturedAgent = event.agent as string
              dispatch({ type: 'STREAM_AGENT', agent: ctx.capturedAgent })
              break
            case 'phase':
              dispatch({ type: 'STREAM_PHASE', phase: event.phase as StreamState['phase'] })
              break
            case 'delta':
              ctx.accumulatedContent += event.content
              dispatch({ type: 'STREAM_CONTENT', content: event.content as string })
              break
            case 'delta_reset':
              ctx.accumulatedContent = ''
              dispatch({ type: 'STREAM_CONTENT_RESET' })
              break
            case 'done':
              ctx.agentResponse = event.response as AgentResponse
              ctx.capturedConversationId = (event.conversation_id as string) ?? null
              break
            case 'error':
              ctx.hadStreamError = true
              dispatch({ type: 'SEND_ERROR', error: event.error as ChatError })
              break
          }
        }

        const { streamAdapter } = configRef.current

        if (streamAdapter) {
          // Use the custom stream adapter (e.g. React Native XHR-based SSE)
          await streamAdapter(
            url,
            { method: 'POST', headers: mergedHeaders, body, signal: controller.signal },
            handleEvent,
          )
          clearTimeout(timeoutId)
        } else {
          // Default path: fetch + ReadableStream getReader()
          const response = await fetch(url, {
            method: 'POST',
            headers: mergedHeaders,
            body,
            signal: controller.signal,
          })

          clearTimeout(timeoutId)

          if (!response.ok) {
            dispatch({
              type: 'SEND_ERROR',
              error: {
                code: 'API_ERROR',
                message: `HTTP ${response.status}: ${response.statusText}`,
                retryable: response.status >= 500,
              },
            })
            return
          }

          const reader = response.body?.getReader()
          if (!reader) {
            dispatch({
              type: 'SEND_ERROR',
              error: { code: 'STREAM_ERROR', message: 'No response body', retryable: true },
            })
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
                const event = JSON.parse(data)
                handleEvent(event)
              } catch {
                // Skip malformed events
              }
            }
          }
        }

        // If an error event was dispatched during streaming, don't dispatch success
        if (ctx.hadStreamError) return

        const assistantMessage: ChatMessage = {
          id: generateMessageId(),
          role: 'assistant',
          content: ctx.agentResponse?.message ?? ctx.accumulatedContent,
          response: ctx.agentResponse ?? undefined,
          agent: ctx.capturedAgent ?? undefined,
          timestamp: new Date(),
        }

        dispatch({
          type: 'SEND_SUCCESS',
          message: assistantMessage,
          streamingContent: ctx.accumulatedContent,
          conversationId: ctx.capturedConversationId,
        })
      } catch (err: unknown) {
        clearTimeout(timeoutId)
        if ((err as Error).name === 'AbortError') {
          dispatch({
            type: 'SEND_ERROR',
            error: { code: 'TIMEOUT', message: 'Request timed out', retryable: true },
          })
        } else {
          dispatch({
            type: 'SEND_ERROR',
            error: {
              code: 'NETWORK_ERROR',
              message: (err as Error).message ?? 'Network error',
              retryable: true,
            },
          })
        }
      }
    },
    [state.conversationId],
  )

  const setInputValue = useCallback((value: string) => {
    dispatch({ type: 'SET_INPUT', value })
  }, [])

  const loadConversation = useCallback((conversationId: string, messages: ChatMessage[]) => {
    dispatch({ type: 'LOAD_CONVERSATION', conversationId, messages })
  }, [])

  const submitFeedback = useCallback(
    async (messageId: string, rating: 'positive' | 'negative', comment?: string) => {
      const { apiUrl, feedbackPath = '/feedback', headers: headersOrFn } = configRef.current
      const headers = typeof headersOrFn === 'function' ? await headersOrFn() : (headersOrFn ?? {})
      await fetch(`${apiUrl}${feedbackPath}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify({ messageId, rating, comment }),
      })
    },
    [],
  )

  const retry = useCallback(async () => {
    if (lastUserMessageRef.current) {
      await sendMessage(lastUserMessageRef.current, lastUserAttachmentsRef.current)
    }
  }, [sendMessage])

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' })
    lastUserMessageRef.current = null
    lastUserAttachmentsRef.current = undefined
  }, [])

  const actions: AgentChatActions = {
    sendMessage,
    setInputValue,
    loadConversation,
    submitFeedback,
    retry,
    reset,
  }

  return { state, actions }
}
