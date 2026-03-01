import { useReducedMotion } from '@surf-kit/hooks'
import { twMerge } from 'tailwind-merge'

type TypingIndicatorProps = {
  label?: string
  dotCount?: number
  className?: string
}

const bounceKeyframes = `
@keyframes typing-bounce {
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-6px); }
}
`

function TypingIndicator({ label, dotCount = 3, className }: TypingIndicatorProps) {
  const reducedMotion = useReducedMotion()

  return (
    <span
      role="status"
      aria-label={label ?? 'typing'}
      className={twMerge('inline-flex items-center gap-2', className)}
      data-testid="typing-indicator"
    >
      {!reducedMotion && <style>{bounceKeyframes}</style>}
      {label && <span className="text-sm text-text-secondary">{label}</span>}
      <span className="flex gap-1" data-testid="typing-dots">
        {Array.from({ length: dotCount }, (_, i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-text-secondary"
            style={
              reducedMotion
                ? undefined
                : {
                    animation: 'typing-bounce 1.4s infinite ease-in-out',
                    animationDelay: `${i * 160}ms`,
                  }
            }
          />
        ))}
      </span>
    </span>
  )
}

export { TypingIndicator }
export type { TypingIndicatorProps }
