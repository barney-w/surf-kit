import { cva, type VariantProps } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import React, { useRef } from 'react'
import { useButton } from 'react-aria'

const button = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      intent: {
        primary: 'bg-accent text-white hover:bg-accent-hover',
        secondary:
          'bg-transparent border border-border text-text-primary hover:bg-surface-raised',
        ghost: 'bg-transparent text-text-primary hover:bg-surface-raised',
        danger: 'bg-status-error text-white hover:bg-status-error/90',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-12 px-6 text-lg',
      },
    },
    defaultVariants: { intent: 'primary', size: 'md' },
  },
)

type ButtonProps = {
  className?: string
  children?: React.ReactNode
  onPress?: () => void
  isDisabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  'aria-label'?: string
} & VariantProps<typeof button>

function Button({
  intent,
  size,
  className,
  children,
  onPress,
  isDisabled,
  type,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const { buttonProps } = useButton(
    { onPress, isDisabled, type, 'aria-label': ariaLabel },
    ref,
  )

  return (
    <button
      {...buttonProps}
      ref={ref}
      className={twMerge(button({ intent, size }), className)}
    >
      {children}
    </button>
  )
}

export { Button, button }
export type { ButtonProps }
