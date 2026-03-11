'use client'

import { twMerge } from 'tailwind-merge'
import React, { useCallback, useEffect, useRef } from 'react'
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
  const scrollRef = useRef<HTMLDivElement>(null)
  const isNearBottom = useRef(true)
  const hasStreaming = !!streamingSlot

  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current
    if (el && isNearBottom.current) {
      el.scrollTop = el.scrollHeight
    }
  }, [])

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    isNearBottom.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80
  }, [])

  // Scroll on new messages
  useEffect(scrollToBottom, [messages.length, scrollToBottom])

  // Continuously follow streaming content growth
  useEffect(() => {
    if (!hasStreaming) return
    let raf: number
    const tick = () => {
      scrollToBottom()
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [hasStreaming, scrollToBottom])

  return (
    <div
      ref={scrollRef}
      role="log"
      aria-live="polite"
      aria-label="Message thread"
      onScroll={handleScroll}
      className={twMerge(
        'flex flex-col gap-4 overflow-y-auto flex-1 px-4 py-6',
        className,
      )}
    >
      <div className="flex-1 shrink-0" />
      {messages.map((message, i) => {
        if (
          hideLastAssistant &&
          i === messages.length - 1 &&
          message.role === 'assistant'
        ) {
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
    </div>
  )
}

export { MessageThread }
