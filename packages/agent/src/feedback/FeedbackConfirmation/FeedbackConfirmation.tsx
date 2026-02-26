import React from 'react'

type FeedbackConfirmationProps = {
  variant?: 'inline' | 'toast'
  className?: string
}

function FeedbackConfirmation({ variant = 'inline', className }: FeedbackConfirmationProps) {
  if (variant === 'toast') {
    return (
      <div
        role="status"
        className={`fixed bottom-4 right-4 bg-surface border border-border rounded-lg px-4 py-3 shadow-lg text-sm text-text-primary ${className ?? ''}`}
        data-testid="feedback-confirmation"
      >
        Thanks for your feedback
      </div>
    )
  }

  return (
    <span
      role="status"
      className={`text-sm text-text-secondary ${className ?? ''}`}
      data-testid="feedback-confirmation"
    >
      Thanks for your feedback
    </span>
  )
}

export { FeedbackConfirmation }
export type { FeedbackConfirmationProps }
