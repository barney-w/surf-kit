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
      className={`flex items-center gap-2 text-sm ${className ?? ''}`}
      role="status"
      data-testid="verification-progress"
    >
      <svg
        className="w-4 h-4 animate-spin text-accent"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
      <span className="text-accent animate-pulse">{label}</span>
    </div>
  )
}

export { VerificationProgress }
export type { VerificationProgressProps }
