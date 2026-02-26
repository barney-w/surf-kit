import { twMerge } from 'tailwind-merge'
import React from 'react'
import type { ChatMessage } from '../../types/chat'

export type MessageBubbleProps = {
  message: ChatMessage
  showAgent?: boolean
  className?: string
}

function MessageBubble({ message, showAgent, className }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <div
      data-message-id={message.id}
      className={twMerge(
        'flex w-full',
        isUser ? 'justify-end' : 'justify-start',
        className,
      )}
    >
      <div
        className={twMerge(
          'max-w-[80%] rounded-xl px-4 py-2.5',
          isUser
            ? 'bg-accent text-white rounded-br-sm'
            : 'bg-surface-raised text-text-primary rounded-bl-sm',
        )}
      >
        {!isUser && showAgent && message.agent && (
          <div className="text-xs font-medium text-text-secondary mb-1">
            {message.agent}
          </div>
        )}
        <div className="whitespace-pre-wrap text-sm">{message.content}</div>
      </div>
    </div>
  )
}

export { MessageBubble }
