import type React from 'react'

export interface Source {
  title: string
  section?: string
  document_id: string
  url: string
  confidence: number // 0-1
  snippet: string
}

export interface ConfidenceBreakdown {
  overall: 'high' | 'medium' | 'low'
  retrieval_quality: number // 0-1
  source_authority: number // 0-1
  answer_groundedness: number // 0-1
  recency: number // 0-1
  reasoning: string
}

export interface VerificationResult {
  status: 'passed' | 'flagged' | 'failed'
  flags: string[]
  claims_checked: number
  claims_verified: number
}

export interface AgentResponse {
  message: string
  sources: Source[]
  confidence: ConfidenceBreakdown
  verification: VerificationResult
  ui_hint: 'text' | 'table' | 'card' | 'list' | 'steps' | 'warning'
  structured_data: Record<string, unknown> | null
  follow_up_suggestions: string[]
}

export interface AgentInfo {
  id: string
  label: string
  accent?: string
  icon?: React.ComponentType<{ size?: number; className?: string }>
}
