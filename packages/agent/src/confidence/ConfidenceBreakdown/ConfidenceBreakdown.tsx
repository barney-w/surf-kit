import { useState } from 'react'
import type { ConfidenceBreakdown as ConfidenceBreakdownType } from '../../types/agent'
import { ConfidenceBadge } from '../ConfidenceBadge'
import { ConfidenceMeter } from '../ConfidenceMeter'

export type ConfidenceBreakdownProps = {
  confidence: ConfidenceBreakdownType
  expandable?: boolean
  defaultExpanded?: boolean
  className?: string
}

const dimensions: {
  key: keyof Pick<
    ConfidenceBreakdownType,
    'retrieval_quality' | 'source_authority' | 'answer_groundedness' | 'recency'
  >
  label: string
}[] = [
  { key: 'retrieval_quality', label: 'Retrieval Quality' },
  { key: 'source_authority', label: 'Source Authority' },
  { key: 'answer_groundedness', label: 'Answer Groundedness' },
  { key: 'recency', label: 'Recency' },
]

function ConfidenceBreakdown({
  confidence,
  expandable = true,
  defaultExpanded = false,
  className,
}: ConfidenceBreakdownProps) {
  const [expanded, setExpanded] = useState(defaultExpanded)

  const isExpanded = expandable ? expanded : true

  return (
    <div
      className={`rounded-xl border border-border bg-surface ${className ?? ''}`}
      data-testid="confidence-breakdown"
    >
      <button
        type="button"
        className="flex w-full items-center justify-between px-4 py-3 text-left"
        onClick={() => expandable && setExpanded((prev) => !prev)}
        aria-expanded={isExpanded}
        disabled={!expandable}
      >
        <span className="text-sm font-medium text-text-primary">Confidence</span>
        <ConfidenceBadge confidence={confidence} />
      </button>

      {isExpanded && (
        <div
          className="border-t border-border px-4 py-3 space-y-3 animate-in fade-in slide-in-from-top-1 duration-200"
          data-testid="confidence-breakdown-details"
        >
          {dimensions.map((dim) => (
            <ConfidenceMeter key={dim.key} value={confidence[dim.key]} label={dim.label} />
          ))}
          {confidence.reasoning && (
            <p className="text-xs text-text-secondary mt-2">{confidence.reasoning}</p>
          )}
        </div>
      )}
    </div>
  )
}

export { ConfidenceBreakdown }
