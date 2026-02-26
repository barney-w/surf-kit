import { twMerge } from 'tailwind-merge'
import React, { useEffect, useRef } from 'react'
import type { ChatMessage } from '../../types/chat'
import { MessageBubble } from '../MessageBubble'

export type MessageThreadProps = {
  messages: ChatMessage[]
  streamingSlot?: React.ReactNode
  className?: string
}

function MessageThread({ messages, streamingSlot, className }: MessageThreadProps) {
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
        'flex flex-col gap-3 overflow-y-auto flex-1 p-4',
        className,
      )}
    >
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      {streamingSlot}
      <div ref={bottomRef} />
    </div>
  )
}

export { MessageThread }
