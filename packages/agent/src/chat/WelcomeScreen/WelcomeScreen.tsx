import type React from 'react'
import { twMerge } from 'tailwind-merge'

export type WelcomeScreenProps = {
  title?: string
  message?: string
  icon?: React.ReactNode
  suggestedQuestions?: string[]
  onQuestionSelect?: (question: string) => void
  className?: string
}

function WelcomeScreen({
  title = 'Welcome',
  message = 'How can I help you today?',
  icon,
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
      <div
        className="w-14 h-14 rounded-2xl bg-accent/10 border border-border flex items-center justify-center pulse-glow"
        aria-hidden="true"
      >
        {icon ?? <span className="text-2xl">✦</span>}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2">
        {title && <h2 className="text-3xl font-bold text-text-primary">{title}</h2>}
        <p className="text-text-secondary text-base leading-relaxed max-w-md">{message}</p>
      </div>

      {/* Suggested question chips */}
      {suggestedQuestions.length > 0 && (
        <div
          className="flex flex-wrap justify-center gap-2 max-w-md"
          role="group"
          aria-label="Suggested questions"
        >
          {suggestedQuestions.map((question) => (
            <button
              key={question}
              type="button"
              onClick={() => onQuestionSelect?.(question)}
              className={twMerge(
                'px-4 py-2 rounded-full text-sm',
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
