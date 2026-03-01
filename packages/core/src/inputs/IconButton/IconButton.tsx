import { cva, type VariantProps } from 'class-variance-authority'
import type React from 'react'
import { useRef } from 'react'
import { useButton } from 'react-aria'
import { twMerge } from 'tailwind-merge'

const iconButton = cva(
  'inline-flex items-center justify-center rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      intent: {
        primary: 'bg-accent text-white hover:bg-accent-hover',
        secondary: 'bg-transparent border border-border text-text-primary hover:bg-surface-raised',
        ghost: 'bg-transparent text-text-primary hover:bg-surface-raised',
        danger: 'bg-status-error text-white hover:bg-status-error/90',
      },
      size: {
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-12 w-12',
      },
    },
    defaultVariants: { intent: 'primary', size: 'md' },
  },
)

type IconButtonProps = {
  'aria-label': string
  className?: string
  children?: React.ReactNode
  onPress?: () => void
  isDisabled?: boolean
  type?: 'button' | 'submit' | 'reset'
} & VariantProps<typeof iconButton>

function IconButton({
  intent,
  size,
  className,
  children,
  onPress,
  isDisabled,
  type,
  'aria-label': ariaLabel,
}: IconButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const { buttonProps } = useButton({ onPress, isDisabled, type, 'aria-label': ariaLabel }, ref)

  return (
    <button {...buttonProps} ref={ref} className={twMerge(iconButton({ intent, size }), className)}>
      {children}
    </button>
  )
}

export { IconButton, iconButton }
export type { IconButtonProps }
