import { Badge } from '@surf-kit/core'
import type { VerificationResult } from '../../types/agent'

export type VerificationBadgeProps = {
  verification: VerificationResult
  className?: string
}

const config = {
  passed: {
    intent: 'success' as const,
    label: 'Verified',
    icon: '\u2713',
    ariaLabel: 'Verification passed',
  },
  flagged: {
    intent: 'warning' as const,
    label: 'Flagged',
    icon: '\u26A0',
    ariaLabel: 'Verification flagged',
  },
  failed: {
    intent: 'error' as const,
    label: 'Failed',
    icon: '\u2717',
    ariaLabel: 'Verification failed',
  },
} as const

function VerificationBadge({ verification, className }: VerificationBadgeProps) {
  const { intent, label, icon, ariaLabel } = config[verification.status]

  return (
    <Badge intent={intent} size="sm" role="status" aria-label={ariaLabel} className={className}>
      <span aria-hidden="true" className="mr-1">
        {icon}
      </span>
      {label}
    </Badge>
  )
}

export { VerificationBadge }
