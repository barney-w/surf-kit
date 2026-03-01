export type ConfidenceMeterProps = {
  value: number // 0-1
  label: string
  className?: string
}

function getBarColor(value: number): string {
  if (value >= 0.8) return 'bg-green-500'
  if (value >= 0.5) return 'bg-yellow-500'
  return 'bg-red-500'
}

function ConfidenceMeter({ value, label, className }: ConfidenceMeterProps) {
  const clamped = Math.max(0, Math.min(1, value))
  const pct = Math.round(clamped * 100)

  return (
    <div className={className} data-testid="confidence-meter">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-text-secondary">{label}</span>
        <span className="text-xs text-text-secondary">{pct}%</span>
      </div>
      <div
        className="h-2 w-full rounded-full bg-surface-secondary overflow-hidden"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label}: ${pct}%`}
      >
        <div
          className={`h-full rounded-full transition-all duration-300 ${getBarColor(clamped)}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export { ConfidenceMeter }
