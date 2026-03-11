import React, { useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import type { Source } from '../../types/agent'
import { SourceCard } from '../SourceCard'

type SourceListProps = {
  sources: Source[]
  variant?: 'compact' | 'expanded'
  collapsible?: boolean
  defaultExpanded?: boolean
  onNavigate?: (source: Source) => void
  className?: string
}

function SourceList({
  sources,
  variant = 'compact',
  collapsible = false,
  defaultExpanded = true,
  onNavigate,
  className,
}: SourceListProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  if (sources.length === 0) return null

  const content = (
    <View className="flex flex-col gap-1.5" testID="source-list-items">
      {sources.map((source) => (
        <SourceCard
          key={source.document_id}
          source={source}
          variant={variant}
          onNavigate={onNavigate}
        />
      ))}
    </View>
  )

  if (!collapsible) {
    return (
      <View className={className} testID="source-list">
        {content}
      </View>
    )
  }

  return (
    <View className={className} testID="source-list">
      <Pressable
        onPress={() => setIsExpanded((prev) => !prev)}
        accessibilityRole="button"
        accessibilityState={{ expanded: isExpanded }}
        className="flex-row items-center gap-1.5 mb-2"
      >
        <Text
          className={`text-sm text-text-secondary ${isExpanded ? '' : '-rotate-90'}`}
        >
          {isExpanded ? '\u25BC' : '\u25B6'}
        </Text>
        <Text className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
          Sources ({sources.length})
        </Text>
      </Pressable>
      {isExpanded && content}
    </View>
  )
}

export { SourceList }
export type { SourceListProps }
