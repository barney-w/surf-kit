import React from 'react'
import { useReducedMotion } from '@surf-kit/hooks'

type ThinkingIndicatorProps = {
  label?: string
  className?: string
}

function ThinkingIndicator({ label = 'Thinking...', className }: ThinkingIndicatorProps) {
  const reducedMotion = useReducedMotion()

  return (
    <span
      role="status"
      className={`inline-flex items-center gap-2 text-sm font-body ${className ?? ''}`}
      data-testid="thinking-indicator"
    >
      <span className="text-brand-cream/50">{label}</span>
      {!reducedMotion && (
        <span className="flex gap-1" aria-hidden="true" data-testid="animated-dots">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-bounce [animation-delay:0ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-bounce [animation-delay:150ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-bounce [animation-delay:300ms]" />
        </span>
      )}
    </span>
  )
}

export { ThinkingIndicator }
export type { ThinkingIndicatorProps }
