import React from 'react'
import { twMerge } from 'tailwind-merge'
import { useReducedMotion } from '@surf-kit/hooks'

type SkeletonProps = {
  width?: string | number
  height?: string | number
  className?: string
  variant?: 'text' | 'circle' | 'rect'
}

const variantClasses = {
  text: 'h-4 w-full rounded',
  circle: 'rounded-full',
  rect: 'rounded-md',
} as const

function Skeleton({ width, height, className, variant = 'text' }: SkeletonProps) {
  const reducedMotion = useReducedMotion()

  return (
    <div
      aria-hidden="true"
      className={twMerge(
        'bg-neutral-200',
        variantClasses[variant],
        !reducedMotion && 'animate-pulse',
        className,
      )}
      style={{
        ...(width != null ? { width: typeof width === 'number' ? `${width}px` : width } : {}),
        ...(height != null
          ? { height: typeof height === 'number' ? `${height}px` : height }
          : {}),
      }}
    />
  )
}

export { Skeleton }
export type { SkeletonProps }
