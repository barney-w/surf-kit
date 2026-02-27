import React from 'react'
import { twMerge } from 'tailwind-merge'
import { VisuallyHidden } from '../../primitives/VisuallyHidden'
import { useReducedMotion } from '@surf-kit/hooks'

const sizes = {
  sm: 16,
  md: 24,
  lg: 32,
} as const

const dualRingSizes = {
  sm: { outer: 20, inner: 13 },
  md: { outer: 32, inner: 21 },
  lg: { outer: 48, inner: 31 },
} as const

type SpinnerProps = {
  size?: keyof typeof sizes
  label?: string
  className?: string
  variant?: 'default' | 'dual-ring'
}

function DualRingSpinner({
  size = 'md',
  label = 'Loading',
  className,
  reducedMotion,
}: {
  size: keyof typeof dualRingSizes
  label: string
  className?: string
  reducedMotion: boolean
}) {
  const { outer, inner } = dualRingSizes[size]
  const borderWidth = size === 'sm' ? 2 : size === 'md' ? 3 : 4

  const ringStyle = (
    diameter: number,
    delay?: string,
  ): React.CSSProperties => ({
    width: diameter,
    height: diameter,
    borderRadius: '50%',
    border: `${borderWidth}px solid rgba(225,185,137,0.2)`,
    borderTopColor: '#E1B989',
    animation: reducedMotion
      ? 'none'
      : `brand-spin 1.2s linear infinite${delay ? ` ${delay}` : ''}`,
    display: 'inline-block',
    flexShrink: 0,
  })

  return (
    <span
      role="status"
      className={twMerge('inline-flex items-center justify-center relative', className)}
      style={{ width: outer, height: outer }}
    >
      <span style={{ ...ringStyle(outer), position: 'absolute' }} aria-hidden="true" />
      <span
        style={{ ...ringStyle(inner, '-0.4s'), position: 'absolute' }}
        aria-hidden="true"
      />
      <VisuallyHidden>{label}</VisuallyHidden>
    </span>
  )
}

function Spinner({ size = 'md', label = 'Loading', className, variant = 'default' }: SpinnerProps) {
  const reducedMotion = useReducedMotion()
  const px = sizes[size]

  if (variant === 'dual-ring') {
    return (
      <DualRingSpinner
        size={size}
        label={label}
        className={className}
        reducedMotion={reducedMotion}
      />
    )
  }

  if (reducedMotion) {
    return (
      <span role="status" className={twMerge('inline-flex', className)}>
        <svg
          width={px}
          height={px}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray="32 32"
            strokeLinecap="round"
          />
        </svg>
        <VisuallyHidden>{label}</VisuallyHidden>
      </span>
    )
  }

  return (
    <span role="status" className={twMerge('inline-flex', className)}>
      <svg
        width={px}
        height={px}
        viewBox="0 0 24 24"
        fill="none"
        className="animate-spin"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
          strokeOpacity="0.25"
        />
        <path
          d="M12 2a10 10 0 0 1 10 10"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <VisuallyHidden>{label}</VisuallyHidden>
    </span>
  )
}

export { Spinner }
export type { SpinnerProps }
