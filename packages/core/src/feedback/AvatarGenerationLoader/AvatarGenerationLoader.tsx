import React from 'react'
import { twMerge } from 'tailwind-merge'
import { VisuallyHidden } from '../../primitives/VisuallyHidden'
import { useReducedMotion } from '@surf-kit/hooks'

type AvatarRingsProps = {
  className?: string
}

function AvatarRings({ className }: AvatarRingsProps) {
  const reducedMotion = useReducedMotion()

  return (
    <div className={twMerge('relative w-20 h-20', className)}>
      {/* Layer 1 — Outer ring: scales up and fades (ping) */}
      <div
        className={twMerge(
          'absolute inset-0 rounded-full border-2 border-brand-gold/20',
          !reducedMotion && 'animate-ping',
        )}
      />

      {/* Layer 2 — Middle ring: same ping, delayed 300ms */}
      <div
        className={twMerge(
          'absolute inset-2 rounded-full border-2 border-brand-gold/30',
          !reducedMotion && 'animate-ping animation-delay-300',
        )}
      />

      {/* Layer 3 — Inner ring: gentle opacity pulse, stays in place */}
      <div
        className={twMerge(
          'absolute inset-4 rounded-full border-2 border-brand-gold/40',
          !reducedMotion && 'animate-pulse',
        )}
      />

      {/* Layer 4 — Centre: spinning arc (gold top border only) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={twMerge(
            'w-8 h-8 border-2 border-brand-gold/30 border-t-brand-gold rounded-full',
            !reducedMotion && 'animate-spin',
          )}
        />
      </div>
    </div>
  )
}

type AvatarGenerationLoaderProps = {
  primaryText?: string
  secondaryText?: string
  className?: string
}

function AvatarGenerationLoader({
  primaryText = 'Creating your AI avatar...',
  secondaryText = 'Transforming your photo into a stylised portrait',
  className,
}: AvatarGenerationLoaderProps) {
  return (
    <div role="status" className={twMerge('text-center py-12 space-y-4', className)}>
      <VisuallyHidden>{primaryText}</VisuallyHidden>

      <div aria-hidden="true">
        <AvatarRings className="mx-auto" />
      </div>

      <div className="space-y-1" aria-hidden="true">
        <p className="text-brand-cream font-surf-display font-semibold">{primaryText}</p>
        <p className="text-brand-cream/40 text-sm">{secondaryText}</p>
      </div>
    </div>
  )
}

export { AvatarRings, AvatarGenerationLoader }
export type { AvatarRingsProps, AvatarGenerationLoaderProps }
