import { twMerge } from 'tailwind-merge'
import React from 'react'
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
      <div
        data-message-id={message.id}
        className={twMerge('flex w-full justify-end', className)}
      >
        <div
          className={twMerge(
            'max-w-[70%] rounded-[18px] rounded-br-[4px] px-4 py-2.5 bg-[#e8e8e8] text-[#1a1a1a] break-words whitespace-pre-wrap text-sm leading-relaxed',
            animated && 'motion-safe:animate-slideFromRight',
            userBubbleClassName,
          )}
        >
          {message.content}
        </div>
      </div>
    )
  }

  return (
    <div
      data-message-id={message.id}
      className={twMerge('flex w-full flex-col items-start gap-1.5', className)}
    >
      {showAgent && message.agent && (
        <div className="text-[11px] font-display font-semibold uppercase tracking-[0.08em] text-text-muted px-1">
          {message.agent.replace('_agent', '').replace('_', ' ')}
        </div>
      )}
      <div
        className={twMerge(
          'max-w-[88%] rounded-[18px] rounded-tl-[4px] px-4 py-3 bg-surface border border-border',
          animated && 'motion-safe:animate-springFromLeft',
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
      </div>
    </div>
  )
}

export { MessageBubble }
