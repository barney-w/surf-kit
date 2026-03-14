import { twMerge } from 'tailwind-merge'
import React from 'react'

export type WelcomeScreenProps = {
  title?: string
  message?: React.ReactNode
  icon?: React.ReactNode
  iconClassName?: string
  suggestedQuestions?: string[]
  onQuestionSelect?: (question: string) => void
  className?: string
}

function WelcomeScreen({
  title = 'Welcome',
  message = 'How can I help you today?',
  icon,
  iconClassName,
  suggestedQuestions = [],
  onQuestionSelect,
  className,
}: WelcomeScreenProps) {
  return (
    <div
      className={twMerge(
        'flex flex-1 flex-col items-center justify-center gap-8 p-8 text-center motion-safe:animate-fadeUp',
        className,
      )}
    >
      {/* Icon */}
      {icon ? (
        iconClassName ? (
          <div className={iconClassName} aria-hidden="true">
            {icon}
          </div>
        ) : (
          icon
        )
      ) : (
        <div
          className={twMerge(
            'w-14 h-14 rounded-2xl bg-accent/10 border border-border flex items-center justify-center pulse-glow',
            iconClassName,
          )}
          aria-hidden="true"
        >
          <span className="text-2xl">✦</span>
        </div>
      )}

      {/* Text */}
      <div className="flex flex-col gap-2">
        {title && (
          <h2 className="text-3xl font-bold text-text-primary">{title}</h2>
        )}
        <p className="text-text-secondary text-base leading-relaxed max-w-md">{message}</p>
      </div>

      {/* Suggested question chips */}
      {suggestedQuestions.length > 0 && (
        <div
          className="flex flex-wrap justify-center gap-2 max-w-xl"
          role="group"
          aria-label="Suggested questions"
        >
          {suggestedQuestions.map(question => (
            <button
              key={question}
              type="button"
              onClick={() => onQuestionSelect?.(question)}
              className={twMerge(
                'px-3.5 py-1.5 rounded-full text-[12px]',
                'border border-border bg-transparent text-text-secondary',
                'hover:bg-accent/10 hover:border-interactive hover:text-text-primary',
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
