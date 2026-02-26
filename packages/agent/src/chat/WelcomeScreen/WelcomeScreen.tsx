import { twMerge } from 'tailwind-merge'
import React from 'react'

export type WelcomeScreenProps = {
  title?: string
  message?: string
  suggestedQuestions?: string[]
  onQuestionSelect?: (question: string) => void
  className?: string
}

function WelcomeScreen({
  title = 'Welcome',
  message = 'How can I help you today?',
  suggestedQuestions = [],
  onQuestionSelect,
  className,
}: WelcomeScreenProps) {
  return (
    <div
      className={twMerge(
        'flex flex-1 flex-col items-center justify-center gap-6 p-8 text-center',
        className,
      )}
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold text-text-primary">{title}</h2>
        <p className="text-base text-text-secondary">{message}</p>
      </div>
      {suggestedQuestions.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Suggested questions">
          {suggestedQuestions.map((question) => (
            <button
              key={question}
              type="button"
              onClick={() => onQuestionSelect?.(question)}
              className={twMerge(
                'rounded-full border border-border bg-surface px-4 py-2 text-sm text-text-primary',
                'transition-colors hover:bg-surface-raised hover:border-interactive',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
              )}
            >
              {question}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export { WelcomeScreen }
