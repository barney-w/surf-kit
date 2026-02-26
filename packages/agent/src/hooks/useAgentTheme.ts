import { useMemo } from 'react'
import type { AgentInfo } from '../types/agent'

export interface AgentThemeResult {
  accent: string
  icon: AgentInfo['icon'] | null
  label: string
}

const DEFAULT_ACCENT = '#6366f1'
const DEFAULT_LABEL = 'Agent'

export function useAgentTheme(
  agentId: string | null | undefined,
  agentThemes?: Record<string, AgentInfo>,
): AgentThemeResult {
  return useMemo(() => {
    if (!agentId) {
      return { accent: DEFAULT_ACCENT, icon: null, label: DEFAULT_LABEL }
    }

    const theme = agentThemes?.[agentId]
    if (!theme) {
      return { accent: DEFAULT_ACCENT, icon: null, label: agentId }
    }

    return {
      accent: theme.accent ?? DEFAULT_ACCENT,
      icon: theme.icon ?? null,
      label: theme.label,
    }
  }, [agentId, agentThemes])
}
