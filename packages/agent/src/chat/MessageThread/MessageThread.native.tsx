'use client'

import { twMerge } from 'tailwind-merge'
import React, { useCallback, useEffect, useRef } from 'react'
import { ScrollView, useColorScheme } from 'react-native'
import type { ChatMessage } from '../../types/chat'
import { MessageBubble } from '../MessageBubble'

export type MessageThreadProps = {
  messages: ChatMessage[]
  streamingSlot?: React.ReactNode
  showAgent?: boolean
  showSources?: boolean
  showConfidence?: boolean
  showVerification?: boolean
  hideLastAssistant?: boolean
  userBubbleClassName?: string
  className?: string
}

function MessageThread({ messages, streamingSlot, showAgent, showSources, showConfidence, showVerification, hideLastAssistant, userBubbleClassName, className }: MessageThreadProps) {
  const scrollRef = useRef<ScrollView>(null)
  const isNearBottom = useRef(true)
  const colorScheme = useColorScheme()
  const indicatorStyle = colorScheme === 'dark' ? 'white' : 'black' as const

  const scrollToBottom = useCallback(() => {
    if (isNearBottom.current) {
      scrollRef.current?.scrollToEnd({ animated: true })
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages.length, scrollToBottom])

  return (
    <ScrollView
      ref={scrollRef}
      className={twMerge('flex-1 px-4 py-6', className)}
      onContentSizeChange={scrollToBottom}
      onScroll={(e) => {
        const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent
        isNearBottom.current = contentSize.height - contentOffset.y - layoutMeasurement.height < 80
      }}
      scrollEventThrottle={16}
      indicatorStyle={indicatorStyle}
      accessibilityRole="adjustable"
      accessibilityLabel="Message thread"
    >
      {messages.map((message, i) => {
        if (hideLastAssistant && i === messages.length - 1 && message.role === 'assistant') {
          return null
        }
        return (
          <MessageBubble
            key={message.id}
            message={message}
            showAgent={showAgent}
            showSources={showSources}
            showConfidence={showConfidence}
            showVerification={showVerification}
            userBubbleClassName={userBubbleClassName}
          />
        )
      })}
      {streamingSlot}
    </ScrollView>
  )
}

export { MessageThread }
