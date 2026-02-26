import { twMerge } from 'tailwind-merge'
import React from 'react'

type ResponsiveColumns = {
  default?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
}

type GridProps = {
  columns?: number | ResponsiveColumns
  gap?: number
  className?: string
  children?: React.ReactNode
} & Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'children'>

function getColumnsClass(columns: number | ResponsiveColumns | undefined): string {
  if (columns === undefined) return 'grid-cols-1'
  if (typeof columns === 'number') return `grid-cols-${columns}`

  const classes: string[] = []
  if (columns.default) classes.push(`grid-cols-${columns.default}`)
  if (columns.sm) classes.push(`sm:grid-cols-${columns.sm}`)
  if (columns.md) classes.push(`md:grid-cols-${columns.md}`)
  if (columns.lg) classes.push(`lg:grid-cols-${columns.lg}`)
  if (columns.xl) classes.push(`xl:grid-cols-${columns.xl}`)
  return classes.join(' ') || 'grid-cols-1'
}

function getGapClass(gap: number | undefined): string {
  if (gap === undefined) return 'gap-4'
  return `gap-${gap}`
}

function Grid({ columns, gap, className, children, ...props }: GridProps) {
  return (
    <div
      className={twMerge('grid', getColumnsClass(columns), getGapClass(gap), className)}
      {...props}
    >
      {children}
    </div>
  )
}

export { Grid }
export type { GridProps }
