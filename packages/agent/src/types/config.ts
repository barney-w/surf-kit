import type { AgentInfo } from './agent'

export interface AgentChatConfig {
  /** Base URL for the agent API */
  apiUrl: string
  /** SSE endpoint path (appended to apiUrl) */
  streamPath?: string
  /** Feedback endpoint path (appended to apiUrl) */
  feedbackPath?: string
  /** Conversations endpoint path (appended to apiUrl) */
  conversationsPath?: string
  /** Request headers (e.g. Authorization) */
  headers?: Record<string, string>
  /** Request timeout in milliseconds */
  timeout?: number
  /** Enable localStorage persistence for conversations */
  persistConversations?: boolean
  /** Map of agent IDs to their display config */
  agentThemes?: Record<string, AgentInfo>
}
