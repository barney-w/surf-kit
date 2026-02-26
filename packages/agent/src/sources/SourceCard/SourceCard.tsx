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
        'bg-brand-dark-panel border-brand-gold/15',
        onNavigate && 'cursor-pointer hover:border-brand-gold/30 hover:shadow-glow',
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
            <p className="text-sm font-medium text-brand-cream truncate">
              {source.title}
            </p>
            {source.section && (
              <p className="text-[11px] font-display font-semibold uppercase tracking-wider text-brand-gold/60 truncate mt-0.5">
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
          <p className="text-xs text-brand-cream/50 mt-2 line-clamp-3 leading-relaxed">
            {source.snippet}
          </p>
        )}
      </div>
    </div>
  )
}

export { SourceCard }
export type { SourceCardProps }
