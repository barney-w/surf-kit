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
  const shouldAutoScroll = useRef(true)
  const hasStreaming = !!streamingSlot

  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current
    if (el && shouldAutoScroll.current) {
      el.scrollTop = el.scrollHeight
    }
  }, [])

  // Detect user scroll-up intent via wheel events (never fired by programmatic scrolling)
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY < 0) {
        shouldAutoScroll.current = false
      }
    }
    const onPointerDown = () => {
      // If the user interacts with the scroll area (e.g. scrollbar drag),
      // let handleScroll determine whether to pause auto-scroll
      // by marking this as a user-initiated interaction.
      el.dataset.userPointer = '1'
    }
    const onPointerUp = () => {
      delete el.dataset.userPointer
    }
    el.addEventListener('wheel', onWheel, { passive: true })
    el.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointerup', onPointerUp)
    return () => {
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
    }
  }, [])

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 80
    if (nearBottom) {
      shouldAutoScroll.current = true
    } else if (el.dataset.userPointer) {
      // User is dragging scrollbar upward
      shouldAutoScroll.current = false
    }
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

  // Reset auto-scroll when streaming ends so the next message auto-scrolls
  useEffect(() => {
    if (!hasStreaming) {
      shouldAutoScroll.current = true
    }
  }, [hasStreaming])

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
