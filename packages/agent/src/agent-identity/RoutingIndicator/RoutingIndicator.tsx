export type RoutingIndicatorProps = {
  from: string
  to: string
  reason?: string
  className?: string
}

function RoutingIndicator({ from, to, reason, className }: RoutingIndicatorProps) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-md border border-border/50 bg-surface-secondary/50 px-2.5 py-1 font-mono text-[11px] text-text-secondary ${className ?? ''}`}
      data-testid="routing-indicator"
    >
      <span className="opacity-60">Routed:</span>
      <span>{from}</span>
      <span className="opacity-40" aria-hidden="true">
        {'\u2192'}
      </span>
      <span>{to}</span>
      {reason && (
        <span className="opacity-50 ml-1" title={reason}>
          ({reason})
        </span>
      )}
    </div>
  )
}

export { RoutingIndicator }
