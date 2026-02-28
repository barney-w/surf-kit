export type MCPToolStatus = 'pending' | 'running' | 'success' | 'error'

export interface MCPToolCallData {
  id: string
  name: string
  serverName?: string
  arguments: Record<string, unknown>
  result?: unknown
  error?: string
  status: MCPToolStatus
  startedAt?: Date
  completedAt?: Date
}

export interface MCPResource {
  uri: string
  name: string
  mimeType?: string
  description?: string
  content?: string | Uint8Array
}

export interface MCPServerInfo {
  name: string
  version?: string
  status: 'connected' | 'disconnected' | 'error'
  tools: { name: string; description?: string }[]
  resources: { uri: string; name: string }[]
  lastPing?: Date
}
