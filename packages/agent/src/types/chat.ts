import type { AgentResponse } from './agent'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  response?: AgentResponse
  agent?: string
  timestamp: Date
}

export interface ConversationSummary {
  id: string
  title: string
  lastMessage: string
  updatedAt: Date
  messageCount: number
}

export interface ChatError {
  code: 'NETWORK_ERROR' | 'API_ERROR' | 'STREAM_ERROR' | 'TIMEOUT'
  message: string
  retryable: boolean
}
