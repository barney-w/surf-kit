import React from 'react'

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
      className={`flex items-center gap-2 text-sm font-body ${className ?? ''}`}
      role="status"
      data-testid="verification-progress"
    >
      <div className="brand-spinner brand-spinner-sm" aria-hidden="true" />
      <span className="text-brand-cyan/70 animate-pulse">{label}</span>
    </div>
  )
}

export { VerificationProgress }
export type { VerificationProgressProps }
