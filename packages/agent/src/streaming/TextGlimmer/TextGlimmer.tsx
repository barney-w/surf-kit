import { useReducedMotion } from '@surf-kit/hooks'
import { twMerge } from 'tailwind-merge'

type TextGlimmerProps = {
  lines?: number
  className?: string
}

const shimmerKeyframes = `
@keyframes text-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
`

const widthPattern = ['100%', '90%', '60%']

function TextGlimmer({ lines = 3, className }: TextGlimmerProps) {
  const reducedMotion = useReducedMotion()

  return (
    <div
      role="status"
      aria-label="Loading"
      className={twMerge('flex flex-col gap-2', className)}
      data-testid="text-glimmer"
    >
      {!reducedMotion && <style>{shimmerKeyframes}</style>}
      {Array.from({ length: lines }, (_, i) => (
        <div
          key={i}
          className="h-3 rounded bg-surface-raised"
          style={{
            width: widthPattern[i % widthPattern.length],
            ...(reducedMotion
              ? undefined
              : {
                  backgroundImage:
                    'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                  backgroundSize: '200% 100%',
                  animation: 'text-shimmer 1.5s infinite ease-in-out',
                }),
          }}
          data-testid="glimmer-line"
        />
      ))}
    </div>
  )
}

export { TextGlimmer }
export type { TextGlimmerProps }
