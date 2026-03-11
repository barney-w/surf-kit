import React, { useEffect, useRef } from 'react'
import { View, Text, Animated } from 'react-native'
import { twMerge } from 'tailwind-merge'
import { WaveLoader } from '@surf-kit/core'
import type { StreamState } from '../../types/streaming'
import { useCharacterDrain } from '../../hooks/useCharacterDrain'
import { ResponseMessage } from '../../response/ResponseMessage'

type StreamingMessageProps = {
  stream: StreamState
  onComplete?: () => void
  onDraining?: (isDraining: boolean) => void
  showPhases?: boolean
  className?: string
}

const phaseLabels: Record<StreamState['phase'], string> = {
  idle: '',
  waiting: 'Waiting...',
  thinking: 'Thinking...',
  retrieving: 'Searching...',
  generating: 'Writing...',
  verifying: 'Verifying...',
}

function BlinkingCursor() {
  const opacity = useRef(new Animated.Value(1)).current

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    )
    animation.start()
    return () => animation.stop()
  }, [opacity])

  return (
    <Animated.View
      style={{
        opacity,
        width: 2,
        height: 14,
        backgroundColor: '#e1b989',
        marginLeft: 2,
      }}
    />
  )
}

function StreamingMessage({
  stream,
  onComplete,
  onDraining,
  showPhases = true,
  className,
}: StreamingMessageProps) {
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete
  const onDrainingRef = useRef(onDraining)
  onDrainingRef.current = onDraining
  const wasActiveRef = useRef(stream.active)

  useEffect(() => {
    if (wasActiveRef.current && !stream.active) {
      onCompleteRef.current?.()
    }
    wasActiveRef.current = stream.active
  }, [stream.active])

  const phaseLabel = phaseLabels[stream.phase]
  const { displayed: rawDisplayed, isDraining } = useCharacterDrain(stream.content)
  const displayedContent = (stream.active || isDraining) ? rawDisplayed.trimEnd() : rawDisplayed

  // Notify parent of draining state changes
  useEffect(() => {
    onDrainingRef.current?.(isDraining)
  }, [isDraining])

  // Format agent label from stream.agent
  const agentLabel = stream.agent
    ? stream.agent.replace('_agent', '').replace('_', ' ')
    : null

  // Show phase indicator only when there's no displayed content yet
  const showPhaseIndicator = showPhases && stream.active && stream.phase !== 'idle' && !displayedContent
  const showCursor = (stream.active || isDraining) && !!displayedContent

  return (
    <View className={twMerge('flex w-full flex-col items-start', className)} testID="streaming-message">
      {/* Screen reader announcements */}
      <View accessibilityLiveRegion="assertive" className="sr-only">
        {stream.active && stream.phase !== 'idle' && (
          <Text>Response started</Text>
        )}
        {!stream.active && stream.content && (
          <Text>Response complete</Text>
        )}
      </View>

      {/* Agent label */}
      {agentLabel && (
        <View className="px-1 mb-1.5">
          <Text className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-muted">
            {agentLabel}
          </Text>
        </View>
      )}

      <View className="max-w-[88%] px-4 py-3 rounded-[18px] rounded-tl-[4px] bg-surface border border-border">
        {showPhaseIndicator && (
          <View
            className="flex flex-row items-center gap-2"
            testID="phase-indicator"
          >
            <WaveLoader size="sm" color="#38bdf8" />
            <Text className="text-sm text-text-secondary">{phaseLabel}</Text>
          </View>
        )}

        {displayedContent && (
          <View className="flex flex-row items-end">
            <View className="flex-1">
              <ResponseMessage content={displayedContent} />
            </View>
            {showCursor && <BlinkingCursor />}
          </View>
        )}
      </View>
    </View>
  )
}

export { StreamingMessage }
export type { StreamingMessageProps }
