import React from 'react'
import { twMerge } from 'tailwind-merge'
import { VisuallyHidden } from '../../primitives/VisuallyHidden'
import { useReducedMotion } from '@surf-kit/hooks'

const sizes = {
  sm: 16,
  md: 24,
  lg: 32,
} as const

type SpinnerProps = {
  size?: keyof typeof sizes
  label?: string
  className?: string
}

function Spinner({ size = 'md', label = 'Loading', className }: SpinnerProps) {
  const reducedMotion = useReducedMotion()
  const px = sizes[size]

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
