import type { ChatMessage, StreamState } from '@surf-kit/agent'

export type { ChatMessage, StreamState }

/** Options for the useAIChat hook */
export interface UseAIChatOptions {
  /** API endpoint for chat completions. Defaults to '/api/chat'. */
  api?: string
  /** Callback when a response finishes streaming */
  onFinish?: (params: { messages: unknown[] }) => void
  /** Callback on error */
  onError?: (error: Error) => void
  /** Additional headers to send with requests */
  headers?: Record<string, string>
  /** Additional body fields to send with requests */
  body?: Record<string, unknown>
}

/** Return type for the useAIChat hook */
export interface UseAIChatReturn {
  /** Messages converted to surf-kit ChatMessage format */
  messages: ChatMessage[]
  /** Current streaming state in surf-kit StreamState format */
  streamState: StreamState
  /** Send a new user message */
  sendMessage: (content: string) => void
  /** Whether a response is currently streaming */
  isLoading: boolean
  /** Current error, if any */
  error: Error | undefined
  /** Stop the current stream */
  stop: () => void
  /** Regenerate the last assistant message */
  regenerate: () => void
}

/** Options for the useAIStream hook */
export interface UseAIStreamOptions {
  /** API endpoint for completions */
  api?: string
  /** Callback when a completion finishes */
  onFinish?: (prompt: string, completion: string) => void
  /** Callback on error */
  onError?: (error: Error) => void
  /** Additional headers to send with requests */
  headers?: Record<string, string>
  /** Additional body fields to send with requests */
  body?: Record<string, unknown>
}

/** Return type for the useAIStream hook */
export interface UseAIStreamReturn {
  /** Current streaming state in surf-kit StreamState format */
  streamState: StreamState
  /** The completed text */
  completion: string
  /** Trigger a completion */
  complete: (prompt: string) => void
  /** Whether a completion is currently streaming */
  isLoading: boolean
  /** Current error, if any */
  error: Error | undefined
  /** Stop the current stream */
  stop: () => void
  /** Controlled input value */
  input: string
  /** Set the controlled input value */
  setInput: (input: string) => void
  /** Form submit handler */
  handleSubmit: (e?: { preventDefault?: () => void }) => void
}
