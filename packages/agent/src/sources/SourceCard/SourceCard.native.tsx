import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { Badge } from '@surf-kit/core'
import { twMerge } from 'tailwind-merge'
import type { Source } from '../../types/agent'

type SourceCardProps = {
  source: Source
  variant?: 'compact' | 'expanded'
  onNavigate?: (source: Source) => void
  className?: string
}

function getConfidenceIntent(confidence: number) {
  if (confidence >= 0.8) return 'success' as const
  if (confidence >= 0.5) return 'warning' as const
  return 'error' as const
}

function getConfidenceLabel(confidence: number) {
  if (confidence >= 0.8) return 'High'
  if (confidence >= 0.5) return 'Medium'
  return 'Low'
}

function SourceCard({ source, variant = 'compact', onNavigate, className }: SourceCardProps) {
  const handlePress = () => {
    if (onNavigate) {
      onNavigate(source)
    }
  }

  const isCompact = variant === 'compact'

  const innerContent = (
    <View className={isCompact ? 'px-4 py-3' : 'px-6 py-4'}>
      <View className="flex-row items-start justify-between gap-2">
        <View className="flex-1 min-w-0">
          <Text className="text-sm font-medium text-text-primary" numberOfLines={1}>
            {source.title}
          </Text>
          {source.section && (
            <Text
              className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary mt-0.5"
              numberOfLines={1}
            >
              {source.section}
            </Text>
          )}
        </View>
        <Badge intent={getConfidenceIntent(source.confidence)} size="sm">
          {getConfidenceLabel(source.confidence)}
        </Badge>
      </View>
      {!isCompact && (
        <Text className="text-xs text-text-secondary mt-2 leading-relaxed" numberOfLines={3}>
          {source.snippet}
        </Text>
      )}
    </View>
  )

  if (onNavigate) {
    return (
      <Pressable
        className={twMerge(
          'rounded-xl border',
          'bg-surface border-border',
          className,
        )}
        onPress={handlePress}
        accessibilityRole="button"
        testID="source-card"
      >
        {innerContent}
      </Pressable>
    )
  }

  return (
    <View
      className={twMerge(
        'rounded-xl border',
        'bg-surface border-border',
        className,
      )}
      testID="source-card"
    >
      {innerContent}
    </View>
  )
}

export { SourceCard }
export type { SourceCardProps }
