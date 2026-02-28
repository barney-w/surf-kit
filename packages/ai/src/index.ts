// Types
export type {
  UseAIChatOptions,
  UseAIChatReturn,
  UseAIStreamOptions,
  UseAIStreamReturn,
} from './types'

// Re-exported surf-kit types for convenience
export type { ChatMessage, StreamState } from './types'

// Hooks
export { useAIChat } from './hooks/useAIChat'
export { useAIStream } from './hooks/useAIStream'

// Components
export { AIChat } from './components/AIChat'
export type { AIChatProps } from './components/AIChat'
