import { cva, type VariantProps } from 'class-variance-authority'
import type React from 'react'
import { twMerge } from 'tailwind-merge'

const text = cva('', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    color: {
      primary: 'text-text-primary',
      secondary: 'text-text-secondary',
      muted: 'text-text-muted',
      inverse: 'text-white',
      accent: 'text-accent',
      error: 'text-status-error',
      success: 'text-status-success',
    },
  },
  defaultVariants: { size: 'base', weight: 'normal', color: 'primary' },
})

type TextProps<C extends React.ElementType = 'p'> = {
  as?: C
  className?: string
  children?: React.ReactNode
} & VariantProps<typeof text> &
  Omit<React.ComponentPropsWithoutRef<C>, 'as' | 'className' | 'children' | 'color'>

function Text<C extends React.ElementType = 'p'>({
  as,
  size,
  weight,
  color,
  className,
  ...props
}: TextProps<C>) {
  const Component = as || 'p'
  return <Component className={twMerge(text({ size, weight, color }), className)} {...props} />
}

export { Text, text }
export type { TextProps }
