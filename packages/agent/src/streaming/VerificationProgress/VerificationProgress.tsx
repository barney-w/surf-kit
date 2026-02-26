import React from 'react'
import { Spinner } from '@surf-kit/core'

type VerificationProgressProps = {
  isActive: boolean
  label?: string
  className?: string
}

function VerificationProgress({
  isActive,
  label = 'Checking accuracy...',
  className,
}: VerificationProgressProps) {
  if (!isActive) return null

  return (
    <div
      className={`flex items-center gap-2 text-sm text-text-secondary ${className ?? ''}`}
      role="status"
      data-testid="verification-progress"
    >
      <span aria-hidden="true">
        <Spinner size="sm" />
      </span>
      <span>{label}</span>
    </div>
  )
}

export { VerificationProgress }
export type { VerificationProgressProps }
