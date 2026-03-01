import { Badge } from '@surf-kit/core'
import type { ConfidenceBreakdown } from '../../types/agent'

export type ConfidenceBadgeProps = {
  confidence: ConfidenceBreakdown
  className?: string
}

const intentMap = {
  high: 'success',
  medium: 'warning',
  low: 'error',
} as const

const labelMap = {
  high: 'High confidence',
  medium: 'Medium confidence',
  low: 'Low confidence',
} as const

function ConfidenceBadge({ confidence, className }: ConfidenceBadgeProps) {
  const level = confidence.overall

  return (
    <Badge
      intent={intentMap[level]}
      size="sm"
      role="status"
      aria-label={labelMap[level]}
      className={className}
    >
      {level.charAt(0).toUpperCase() + level.slice(1)}
    </Badge>
  )
}

export { ConfidenceBadge }
