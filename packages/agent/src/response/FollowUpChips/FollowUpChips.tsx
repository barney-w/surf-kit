import React from 'react'
import { Button } from '@surf-kit/core'

type FollowUpChipsProps = {
  suggestions: string[]
  onSelect: (suggestion: string) => void
  className?: string
}

function FollowUpChips({ suggestions, onSelect, className }: FollowUpChipsProps) {
  if (suggestions.length === 0) return null

  return (
    <div
      role="group"
      aria-label="Follow-up suggestions"
      className={`flex gap-2 overflow-x-auto ${className ?? ''}`}
      data-testid="follow-up-chips"
    >
      {suggestions.map((suggestion) => (
        <Button
          key={suggestion}
          intent="secondary"
          size="sm"
          onPress={() => onSelect(suggestion)}
          className="whitespace-nowrap flex-shrink-0"
        >
          {suggestion}
        </Button>
      ))}
    </div>
  )
}

export { FollowUpChips }
export type { FollowUpChipsProps }
