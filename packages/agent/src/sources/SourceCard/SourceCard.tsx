import React from 'react'
import { Badge } from '@surf-kit/core'
import { twMerge } from 'tailwind-merge'
import type { Source } from '../../types/agent'

type SourceCardProps = {
  source: Source
  variant?: 'compact' | 'expanded'
  onNavigate?: (source: Source) => void
  className?: string
}

function getConfidenceIntent(confidence: number) {
  if (confidence >= 0.8) return 'success' as const
  if (confidence >= 0.5) return 'warning' as const
  return 'error' as const
}

function getConfidenceLabel(confidence: number) {
  if (confidence >= 0.8) return 'High'
  if (confidence >= 0.5) return 'Medium'
  return 'Low'
}

function SourceCard({ source, variant = 'compact', onNavigate, className }: SourceCardProps) {
  const handleClick = () => {
    if (onNavigate) {
      onNavigate(source)
    }
  }

  const isCompact = variant === 'compact'

  return (
    <div
      className={twMerge(
        'rounded-xl border transition-all duration-200',
        'bg-surface border-border',
        onNavigate && 'cursor-pointer hover:border-border-strong',
        className,
      )}
      data-document-id={source.document_id}
      data-testid="source-card"
    >
      <div
        className={isCompact ? 'px-4 py-3' : 'px-6 py-4'}
        onClick={handleClick}
        role={onNavigate ? 'button' : undefined}
        tabIndex={onNavigate ? 0 : undefined}
        onKeyDown={
          onNavigate
            ? (e: React.KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleClick()
                }
              }
            : undefined
        }
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            {source.url ? (
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-accent hover:underline truncate block"
                onClick={(e) => e.stopPropagation()}
              >
                {source.title}
                <svg
                  className="inline-block ml-1 w-3 h-3 opacity-60"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            ) : (
              <p className="text-sm font-medium text-text-primary truncate">
                {source.title}
              </p>
            )}
            {source.section && (
              <p className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary truncate mt-0.5">
                {source.section}
              </p>
            )}
          </div>
          <Badge
            intent={getConfidenceIntent(source.confidence)}
            size="sm"
          >
            {getConfidenceLabel(source.confidence)}
          </Badge>
        </div>
        {!isCompact && (
          <p className="text-xs text-text-secondary mt-2 line-clamp-3 leading-relaxed">
            {source.snippet}
          </p>
        )}
      </div>
    </div>
  )
}

export { SourceCard }
export type { SourceCardProps }
