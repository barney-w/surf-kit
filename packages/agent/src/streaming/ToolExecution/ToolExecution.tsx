import React from 'react'
import { WaveLoader } from '@surf-kit/core'

type ToolExecutionProps = {
  tool: string
  label?: string
  className?: string
}

const defaultLabels: Record<string, string> = {
  search: 'Searching knowledge base...',
  retrieve: 'Retrieving documents...',
  calculate: 'Calculating...',
}

function ToolExecution({ tool, label, className }: ToolExecutionProps) {
  const displayLabel = label ?? defaultLabels[tool] ?? `Running ${tool}...`

  return (
    <div
      className={`flex items-center gap-2 text-sm text-text-secondary ${className ?? ''}`}
      role="status"
      data-testid="tool-execution"
    >
      <span aria-hidden="true">
        <WaveLoader size="sm" color="#38bdf8" />
      </span>
      <span>{displayLabel}</span>
    </div>
  )
}

export { ToolExecution }
export type { ToolExecutionProps }
