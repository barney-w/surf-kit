import React, { useEffect, useState } from 'react'
import { View, Text, AccessibilityInfo } from 'react-native'
import Animated, { FadeInRight, FadeInLeft } from 'react-native-reanimated'
import { twMerge } from 'tailwind-merge'
import type { ChatMessage } from '../../types/chat'
import { AgentResponse } from '../../response/AgentResponse'
import { ResponseMessage } from '../../response/ResponseMessage'

export type MessageBubbleProps = {
  message: ChatMessage
  showAgent?: boolean
  showSources?: boolean
  showConfidence?: boolean
  showVerification?: boolean
  animated?: boolean
  userBubbleClassName?: string
  className?: string
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    void AccessibilityInfo.isReduceMotionEnabled().then(setReduced)
    const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduced)
    return () => sub.remove()
  }, [])
  return reduced
}

function MessageBubble({
  message,
  showAgent,
  showSources = true,
  showConfidence = true,
  showVerification = true,
  animated = true,
  userBubbleClassName,
  className,
}: MessageBubbleProps) {
  const isUser = message.role === 'user'
  const reduceMotion = useReducedMotion()
  const shouldAnimate = animated && !reduceMotion

  const entering = shouldAnimate
    ? (isUser ? FadeInRight.duration(300).springify() : FadeInLeft.duration(300).springify())
    : undefined

  if (isUser) {
    return (
      <Animated.View
        testID={`message-${message.id}`}
        entering={entering}
        className={twMerge('flex w-full flex-row justify-end', className)}
      >
        <View
          className={twMerge(
            'max-w-[70%] rounded-[18px] rounded-br-[4px] px-4 py-2.5 bg-accent-subtle',
            userBubbleClassName,
          )}
        >
          <Text className="text-text-primary text-sm leading-relaxed">
            {message.content}
          </Text>
        </View>
      </Animated.View>
    )
  }

  return (
    <Animated.View
      testID={`message-${message.id}`}
      entering={entering}
      className={twMerge('flex w-full flex-col items-start gap-1.5', className)}
    >
      {showAgent && message.agent && (
        <View className="px-1">
          <Text className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-muted">
            {message.agent.replace('_agent', '').replace('_', ' ')}
          </Text>
        </View>
      )}
      <View
        className={twMerge(
          'max-w-[88%] rounded-[18px] rounded-tl-[4px] px-4 py-3 bg-surface border border-border',
        )}
      >
        {message.response ? (
          <AgentResponse
            response={message.response}
            showSources={showSources}
            showConfidence={showConfidence}
            showVerification={showVerification}
          />
        ) : (
          <ResponseMessage content={message.content} />
        )}
      </View>
    </Animated.View>
  )
}

export { MessageBubble }
