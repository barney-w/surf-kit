import { useReducer, useCallback, useRef } from 'react'
import type { ChatMessage, ChatError } from '../types/chat'
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
}

const initialState: AgentChatState = {
  messages: [],
  conversationId: null,
  isLoading: false,
  error: null,
  inputValue: '',
  streamPhase: 'idle',
}

// ── Actions ────────────────────────────────────────────────────────────

type Action =
  | { type: 'SET_INPUT'; value: string }
  | { type: 'SEND_START'; message: ChatMessage }
  | { type: 'STREAM_PHASE'; phase: StreamState['phase'] }
  | { type: 'STREAM_CONTENT'; content: string }
  | { type: 'SEND_SUCCESS'; message: ChatMessage }
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
      }

    case 'STREAM_PHASE':
      return { ...state, streamPhase: action.phase }

    case 'STREAM_CONTENT':
      return state // Content is tracked by the streaming hook, not duplicated here

    case 'SEND_SUCCESS':
      return {
        ...state,
        messages: [...state.messages, action.message],
        isLoading: false,
        streamPhase: 'idle',
      }

    case 'SEND_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.error,
        streamPhase: 'idle',
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
  sendMessage: (content: string) => Promise<void>
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

  const sendMessage = useCallback(
    async (content: string) => {
      const { apiUrl, streamPath = '/chat/stream', headers = {}, timeout = 30000 } = configRef.current

      lastUserMessageRef.current = content

      const userMessage: ChatMessage = {
        id: generateMessageId(),
        role: 'user',
        content,
        timestamp: new Date(),
      }

      dispatch({ type: 'SEND_START', message: userMessage })

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), timeout)

      try {
        const response = await fetch(`${apiUrl}${streamPath}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'text/event-stream',
            ...headers,
          },
          body: JSON.stringify({
            message: content,
            conversation_id: state.conversationId,
          }),
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
        let accumulatedContent = ''
        let agentResponse: AgentResponse | null = null
        let capturedAgent: string | null = null

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
              switch (event.type) {
                case 'agent':
                  capturedAgent = event.agent as string
                  break
                case 'phase':
                  dispatch({ type: 'STREAM_PHASE', phase: event.phase })
                  break
                case 'delta':
                  accumulatedContent += event.content
                  break
                case 'done':
                  agentResponse = event.response
                  break
                case 'error':
                  dispatch({ type: 'SEND_ERROR', error: event.error })
                  return
              }
            } catch {
              // Skip malformed events
            }
          }
        }

        const assistantMessage: ChatMessage = {
          id: generateMessageId(),
          role: 'assistant',
          content: agentResponse?.message ?? accumulatedContent,
          response: agentResponse ?? undefined,
          agent: capturedAgent ?? undefined,
          timestamp: new Date(),
        }

        dispatch({ type: 'SEND_SUCCESS', message: assistantMessage })
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
      const { apiUrl, feedbackPath = '/feedback', headers = {} } = configRef.current
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
      await sendMessage(lastUserMessageRef.current)
    }
  }, [sendMessage])

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' })
    lastUserMessageRef.current = null
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
