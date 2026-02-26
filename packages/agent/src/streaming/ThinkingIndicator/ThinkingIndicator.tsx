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
      className={`inline-flex items-center gap-1 text-sm text-text-secondary ${className ?? ''}`}
      data-testid="thinking-indicator"
    >
      <span>{label}</span>
      {!reducedMotion && (
        <span className="flex gap-0.5" aria-hidden="true" data-testid="animated-dots">
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce [animation-delay:0ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce [animation-delay:150ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce [animation-delay:300ms]" />
        </span>
      )}
    </span>
  )
}

export { ThinkingIndicator }
export type { ThinkingIndicatorProps }
