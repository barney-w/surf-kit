import type { AgentResponse } from './agent'

export interface Attachment {
  filename: string
  content_type: string
  /** base64-encoded file content */
  data: string
  /** local preview URL (blob URL, not sent to server) */
  preview_url?: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  response?: AgentResponse
  agent?: string
  attachments?: Attachment[]
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
  code: 'NETWORK_ERROR' | 'API_ERROR' | 'STREAM_ERROR' | 'TIMEOUT' | 'ABORTED'
  message: string
  retryable: boolean
}
