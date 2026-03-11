import React from 'react'
import { View, Text } from 'react-native'
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

  if (isUser) {
    return (
      <View
        testID={`message-${message.id}`}
        className={twMerge('flex w-full flex-row justify-end', className)}
      >
        <View
          className={twMerge(
            'max-w-[70%] rounded-[18px] rounded-br-[4px] px-4 py-2.5 bg-[#e8e8e8]',
            userBubbleClassName,
          )}
        >
          <Text className="text-[#1a1a1a] text-sm leading-relaxed">
            {message.content}
          </Text>
        </View>
      </View>
    )
  }

  return (
    <View
      testID={`message-${message.id}`}
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
    </View>
  )
}

export { MessageBubble }
