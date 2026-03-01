import type { AgentInfo } from '../../types/agent'
import { AgentAvatar } from '../AgentAvatar'

export type AgentHandoffProps = {
  from: AgentInfo
  to: AgentInfo
  className?: string
}

function AgentHandoff({ from, to, className }: AgentHandoffProps) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-surface ${className ?? ''}`}
      data-testid="agent-handoff"
    >
      <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-2 duration-300">
        <AgentAvatar agent={from} size="sm" />
        <span className="text-xs text-text-secondary">{from.label}</span>
      </div>

      <span className="text-text-secondary text-xs" aria-hidden="true">
        {'\u2192'}
      </span>

      <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-2 duration-300">
        <AgentAvatar agent={to} size="sm" />
        <span className="text-xs text-text-secondary">{to.label}</span>
      </div>

      <div className="sr-only" role="status" aria-live="polite">
        Handing off from {from.label} to {to.label}
      </div>
    </div>
  )
}

export { AgentHandoff }
