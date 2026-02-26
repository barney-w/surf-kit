import React from 'react'
import type { AgentInfo } from '../../types/agent'

export type AgentLabelProps = {
  agent: AgentInfo
  className?: string
}

function AgentLabel({ agent, className }: AgentLabelProps) {
  const accent = agent.accent ?? '#6366f1'

  return (
    <span
      className={`text-xs font-medium ${className ?? ''}`}
      data-testid="agent-label"
    >
      Answered by{' '}
      <span style={{ color: accent }}>{agent.label}</span>
    </span>
  )
}

export { AgentLabel }
