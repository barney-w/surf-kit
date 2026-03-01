import { useState } from 'react'
import type { VerificationResult } from '../../types/agent'
import { VerificationBadge } from '../VerificationBadge'

export type VerificationDetailProps = {
  verification: VerificationResult
  expandable?: boolean
  defaultExpanded?: boolean
  className?: string
}

function VerificationDetail({
  verification,
  expandable = true,
  defaultExpanded = false,
  className,
}: VerificationDetailProps) {
  const [expanded, setExpanded] = useState(defaultExpanded)

  const isExpanded = expandable ? expanded : true

  return (
    <div
      className={`rounded-xl border border-border bg-surface ${className ?? ''}`}
      data-testid="verification-detail"
    >
      <button
        type="button"
        className="flex w-full items-center justify-between px-4 py-3 text-left"
        onClick={() => expandable && setExpanded((prev) => !prev)}
        aria-expanded={isExpanded}
        disabled={!expandable}
      >
        <span className="text-sm font-medium text-text-primary">Verification</span>
        <VerificationBadge verification={verification} />
      </button>

      {isExpanded && (
        <div
          className="border-t border-border px-4 py-3 space-y-2 animate-in fade-in slide-in-from-top-1 duration-200"
          data-testid="verification-detail-content"
        >
          <div className="flex gap-4 text-xs text-text-secondary">
            <span data-testid="claims-checked">
              Claims checked:{' '}
              <strong className="text-text-primary">{verification.claims_checked}</strong>
            </span>
            <span data-testid="claims-verified">
              Claims verified:{' '}
              <strong className="text-text-primary">{verification.claims_verified}</strong>
            </span>
          </div>

          {verification.flags.length > 0 && (
            <ul className="mt-2 space-y-1" data-testid="verification-flags">
              {verification.flags.map((flag, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-text-secondary">
                  <span className="text-yellow-500 shrink-0" aria-hidden="true">
                    {'\u26A0'}
                  </span>
                  {flag}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

export { VerificationDetail }
