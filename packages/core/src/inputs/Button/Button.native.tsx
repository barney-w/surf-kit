'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import React from 'react'
import { Pressable, Text } from 'react-native'

const button = cva(
  'inline-flex items-center justify-center rounded-lg',
  {
    variants: {
      intent: {
        primary: 'bg-accent',
        secondary: 'bg-transparent border border-border',
        ghost: 'bg-transparent',
        tonal: 'bg-accent-subtlest',
        danger: 'bg-status-error',
      },
      size: {
        sm: 'h-8 px-3',
        md: 'h-10 px-4',
        lg: 'h-12 px-6',
      },
    },
    defaultVariants: { intent: 'primary', size: 'md' },
  },
)

const buttonText = cva('font-medium', {
  variants: {
    intent: {
      primary: 'text-white',
      secondary: 'text-text-primary',
      ghost: 'text-text-primary',
      tonal: 'text-accent',
      danger: 'text-white',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: { intent: 'primary', size: 'md' },
})

type ButtonProps = {
  className?: string
  children?: React.ReactNode
  onPress?: () => void
  isDisabled?: boolean
  'aria-label'?: string
} & VariantProps<typeof button>

function Button({
  intent,
  size,
  className,
  children,
  onPress,
  isDisabled,
  'aria-label': ariaLabel,
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled ?? false}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled ?? false }}
      accessibilityLabel={ariaLabel}
      className={twMerge(
        button({ intent, size }),
        isDisabled && 'opacity-50',
        className,
      )}
    >
      {typeof children === 'string' ? (
        <Text className={buttonText({ intent, size })}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  )
}

export { Button, button }
export type { ButtonProps }
