import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import React from 'react'
import { View, Text, Pressable } from 'react-native'

const alert = cva(
  'flex flex-row items-start gap-3 rounded-lg border p-4',
  {
    variants: {
      intent: {
        info: 'bg-sky-100 text-sky-700 border-sky-300',
        success: 'bg-status-success-subtle border-status-success',
        warning: 'bg-status-warning-subtle border-status-warning',
        error: 'bg-status-error-subtle border-status-error',
      },
    },
    defaultVariants: { intent: 'info' },
  },
)

type AlertProps = {
  intent?: 'info' | 'success' | 'warning' | 'error'
  title?: string
  children?: React.ReactNode
  onDismiss?: () => void
  className?: string
}

function Alert({ intent = 'info', title, children, onDismiss, className }: AlertProps) {
  return (
    <View
      className={twMerge(alert({ intent }), className)}
      accessibilityRole={intent === 'error' || intent === 'warning' ? 'alert' : 'none'}
    >
      <View className="flex-1">
        {title && <Text className="font-semibold">{title}</Text>}
        {children && <View className={title ? 'mt-1' : ''}>{children}</View>}
      </View>
      {onDismiss && (
        <Pressable
          onPress={onDismiss}
          accessibilityLabel="Dismiss"
          className="shrink-0 rounded p-1 opacity-70"
        >
          <Text className="text-base">✕</Text>
        </Pressable>
      )}
    </View>
  )
}

export { Alert, alert }
export type { AlertProps }
