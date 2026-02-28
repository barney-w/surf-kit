import React from 'react'
import { twMerge } from 'tailwind-merge'

type FollowUpChipsProps = {
  suggestions: string[]
  onSelect: (suggestion: string) => void
  className?: string
}

function FollowUpChips({ suggestions, onSelect, className }: FollowUpChipsProps) {
  if (suggestions.length === 0) return null

  return (
    <div
      className={twMerge('flex flex-wrap gap-2 py-1', className)}
      role="group"
      aria-label="Follow-up suggestions"
      data-testid="follow-up-chips"
    >
      {suggestions.map(suggestion => (
        <button
          key={suggestion}
          type="button"
          onClick={() => onSelect(suggestion)}
          className={twMerge(
            'px-4 py-1.5 rounded-full text-sm whitespace-nowrap',
            'border border-border bg-transparent text-text-secondary',
            'hover:bg-accent/10 hover:border-interactive hover:text-text-primary',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
            'transition-all duration-200',
          )}
        >
          {suggestion}
        </button>
      ))}
    </div>
  )
}

export { FollowUpChips }
export type { FollowUpChipsProps }
