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
        'flex flex-1 flex-col items-center justify-center gap-8 p-8 text-center',
        className,
      )}
    >
      {/* Pulsing icon */}
      <div
        className="w-14 h-14 rounded-2xl bg-accent/10 border border-border flex items-center justify-center pulse-glow"
        aria-hidden="true"
      >
        <span className="text-2xl">✦</span>
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2">
        {title && (
          <h2 className="text-2xl font-semibold text-text-primary">{title}</h2>
        )}
        <p className="text-text-secondary text-base leading-relaxed max-w-sm">{message}</p>
      </div>

      {/* Suggested question chips */}
      {suggestedQuestions.length > 0 && (
        <div
          className="flex flex-wrap justify-center gap-2 max-w-md"
          role="group"
          aria-label="Suggested questions"
        >
          {suggestedQuestions.map(question => (
            <button
              key={question}
              type="button"
              onClick={() => onQuestionSelect?.(question)}
              className={twMerge(
                'px-4 py-2 rounded-full text-sm',
                'border border-border bg-surface text-text-primary',
                'hover:bg-surface-raised hover:border-interactive hover:text-text-primary',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
                'transition-colors duration-200',
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
