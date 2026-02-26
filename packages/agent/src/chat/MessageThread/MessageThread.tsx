import { twMerge } from 'tailwind-merge'
import React, { useEffect, useRef } from 'react'
import type { ChatMessage } from '../../types/chat'
import { MessageBubble } from '../MessageBubble'

export type MessageThreadProps = {
  messages: ChatMessage[]
  streamingSlot?: React.ReactNode
  showSources?: boolean
  showConfidence?: boolean
  showVerification?: boolean
  className?: string
}

function MessageThread({ messages, streamingSlot, showSources, showConfidence, showVerification, className }: MessageThreadProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView?.({ behavior: 'smooth' })
  }, [messages.length, streamingSlot])

  return (
    <div
      role="log"
      aria-live="polite"
      aria-label="Message thread"
      className={twMerge(
        'flex flex-col gap-4 overflow-y-auto flex-1 px-4 py-6',
        className,
      )}
    >
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          showSources={showSources}
          showConfidence={showConfidence}
          showVerification={showVerification}
        />
      ))}
      {streamingSlot}
      <div ref={bottomRef} />
    </div>
  )
}

export { MessageThread }
