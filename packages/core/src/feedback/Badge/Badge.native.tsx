import { twMerge } from 'tailwind-merge'
import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'
import { View, Text } from 'react-native'

const badge = cva('flex-row items-center rounded-full', {
  variants: {
    intent: {
      default: 'bg-surface-sunken',
      success: 'bg-status-success-subtle',
      warning: 'bg-status-warning-subtle',
      error: 'bg-status-error-subtle',
      info: 'bg-status-info-subtle',
    },
    size: {
      sm: 'px-2 py-0.5',
      md: 'px-2.5 py-0.5',
    },
  },
  defaultVariants: { intent: 'default', size: 'md' },
})

const badgeText = cva('font-medium', {
  variants: {
    intent: {
      default: 'text-text-secondary',
      success: 'text-status-success',
      warning: 'text-status-warning',
      error: 'text-status-error',
      info: 'text-status-info',
    },
    size: {
      sm: 'text-xs',
      md: 'text-sm',
    },
  },
  defaultVariants: { intent: 'default', size: 'md' },
})

type BadgeProps = {
  className?: string
  children?: React.ReactNode
} & VariantProps<typeof badge>

function Badge({ intent, size, className, children }: BadgeProps) {
  return (
    <View className={twMerge(badge({ intent, size }), className)}>
      <Text className={badgeText({ intent, size })}>
        {children}
      </Text>
    </View>
  )
}

export { Badge, badge }
export type { BadgeProps }
