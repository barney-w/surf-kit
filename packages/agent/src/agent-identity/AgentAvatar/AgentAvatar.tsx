import React from 'react'
import type { AgentInfo } from '../../types/agent'
import { useAgentTheme } from '../../hooks/useAgentTheme'

export type AgentAvatarProps = {
  agentId?: string
  agent?: AgentInfo
  size?: 'sm' | 'md' | 'lg'
  agentThemes?: Record<string, AgentInfo>
  className?: string
}

const sizeMap = {
  sm: 'h-6 w-6 text-xs',
  md: 'h-8 w-8 text-sm',
  lg: 'h-10 w-10 text-base',
} as const

const iconSizeMap = {
  sm: 14,
  md: 18,
  lg: 22,
} as const

function AgentAvatar({ agentId, agent, size = 'md', agentThemes, className }: AgentAvatarProps) {
  const resolvedId = agent?.id ?? agentId ?? null
  const themes = agent ? { ...agentThemes, [agent.id]: agent } : agentThemes
  const { accent, icon: Icon, label } = useAgentTheme(resolvedId, themes)

  const initial = label.charAt(0).toUpperCase()

  return (
    <div
      className={`inline-flex items-center justify-center rounded-full shrink-0 font-medium text-white ${sizeMap[size]} ${className ?? ''}`}
      style={{ backgroundColor: accent }}
      role="img"
      aria-label={`${label} avatar`}
      data-testid="agent-avatar"
    >
      {Icon ? (
        <Icon size={iconSizeMap[size]} className="text-white" />
      ) : (
        <span aria-hidden="true">{initial}</span>
      )}
    </div>
  )
}

export { AgentAvatar }
