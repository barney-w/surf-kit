import type { Source, ConfidenceBreakdown, VerificationResult, AgentResponse } from './agent'
import type { ChatError } from './chat'

export type StreamEvent =
  | { type: 'phase'; phase: 'thinking' | 'retrieving' | 'generating' | 'verifying' | 'waiting' }
  | { type: 'delta'; content: string }
  | { type: 'source'; source: Source }
  | { type: 'agent'; agent: string }
  | { type: 'verification'; result: VerificationResult }
  | { type: 'confidence'; breakdown: ConfidenceBreakdown }
  | { type: 'done'; response: AgentResponse }
  | { type: 'error'; error: ChatError }

export interface StreamState {
  active: boolean
  phase: 'idle' | 'thinking' | 'retrieving' | 'generating' | 'verifying' | 'waiting'
  content: string
  sources: Source[]
  agent: string | null
  agentLabel: string | null
}
