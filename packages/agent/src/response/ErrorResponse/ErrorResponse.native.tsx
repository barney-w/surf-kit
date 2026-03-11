import React from 'react'
import { View, Text } from 'react-native'
import { Alert, Button } from '@surf-kit/core'
import type { ChatError } from '../../types/chat'

type ErrorResponseProps = {
  error: ChatError
  onRetry?: () => void
  className?: string
}

function ErrorResponse({ error, onRetry, className }: ErrorResponseProps) {
  return (
    <View className={className} accessibilityRole="alert">
      <Alert intent="error" title="Error">
        <Text>{error.message}</Text>
        {error.retryable && onRetry && (
          <View className="mt-3">
            <Button intent="secondary" size="sm" onPress={onRetry} accessibilityLabel="Retry">
              Retry
            </Button>
          </View>
        )}
      </Alert>
    </View>
  )
}

export { ErrorResponse }
export type { ErrorResponseProps }
