import React from 'react'
import { twMerge } from 'tailwind-merge'
import { View, Text, Pressable } from 'react-native'

type FollowUpChipsProps = {
  suggestions: string[]
  onSelect: (suggestion: string) => void
  className?: string
}

function FollowUpChips({ suggestions, onSelect, className }: FollowUpChipsProps) {
  if (suggestions.length === 0) return null

  return (
    <View
      className={twMerge('flex flex-row flex-wrap gap-2 py-1', className)}
      accessibilityRole="none"
      accessibilityLabel="Follow-up suggestions"
    >
      {suggestions.map(suggestion => (
        <Pressable
          key={suggestion}
          onPress={() => onSelect(suggestion)}
          className="px-4 py-1.5 rounded-full border border-border bg-transparent"
          accessibilityRole="button"
        >
          <Text className="text-sm text-text-secondary">{suggestion}</Text>
        </Pressable>
      ))}
    </View>
  )
}

export { FollowUpChips }
export type { FollowUpChipsProps }
