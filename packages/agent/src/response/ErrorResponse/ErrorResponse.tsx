import React from 'react'
import { Alert, Button } from '@surf-kit/core'
import type { ChatError } from '../../types/chat'

type ErrorResponseProps = {
  error: ChatError
  onRetry?: () => void
  className?: string
}

function ErrorResponse({ error, onRetry, className }: ErrorResponseProps) {
  return (
    <div role="alert" className={className} data-testid="error-response">
      <Alert intent="error" title="Error">
        <p>{error.message}</p>
        {error.retryable && onRetry && (
          <div className="mt-3">
            <Button
              intent="secondary"
              size="sm"
              onPress={onRetry}
              aria-label="Retry"
            >
              Retry
            </Button>
          </div>
        )}
      </Alert>
    </div>
  )
}

export { ErrorResponse }
export type { ErrorResponseProps }
