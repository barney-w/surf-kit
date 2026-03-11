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
  /** Request headers (e.g. Authorization). Can be a static object or an async function that returns headers (useful for refreshing auth tokens). */
  headers?: Record<string, string> | (() => Promise<Record<string, string>>)
  /** Request timeout in milliseconds */
  timeout?: number
  /** Enable localStorage persistence for conversations */
  persistConversations?: boolean
  /** Map of agent IDs to their display config */
  agentThemes?: Record<string, AgentInfo>
  /** Custom stream reader for environments without ReadableStream (e.g. React Native).
   *  When provided, this function handles sending the request and parsing SSE events
   *  instead of the default fetch + getReader() approach. */
  streamAdapter?: (
    url: string,
    options: { method: string; headers: Record<string, string>; body: string; signal: AbortSignal },
    onEvent: (event: { type: string; [key: string]: unknown }) => void,
  ) => Promise<void>
}
