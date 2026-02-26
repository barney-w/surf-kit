import React, { useState } from 'react'
import type { Source } from '../../types/agent'
import { SourceCard } from '../SourceCard'

type SourceListProps = {
  sources: Source[]
  variant?: 'compact' | 'expanded'
  collapsible?: boolean
  defaultExpanded?: boolean
  onNavigate?: (source: Source) => void
  className?: string
}

function SourceList({
  sources,
  variant = 'compact',
  collapsible = false,
  defaultExpanded = true,
  onNavigate,
  className,
}: SourceListProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  if (sources.length === 0) return null

  const content = (
    <div className="flex flex-col gap-2" data-testid="source-list-items">
      {sources.map((source) => (
        <SourceCard
          key={source.document_id}
          source={source}
          variant={variant}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  )

  if (!collapsible) {
    return (
      <div className={className} data-testid="source-list">
        {content}
      </div>
    )
  }

  return (
    <div className={className} data-testid="source-list">
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        aria-expanded={isExpanded}
        className="flex items-center gap-1 text-sm font-medium text-text-primary mb-2 hover:text-accent transition-colors"
      >
        <svg
          className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
        Sources ({sources.length})
      </button>
      {isExpanded && content}
    </div>
  )
}

export { SourceList }
export type { SourceListProps }
