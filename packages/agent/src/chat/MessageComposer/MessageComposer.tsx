'use client'

import { twMerge } from 'tailwind-merge'
import React, { useState, useRef, useCallback } from 'react'

export type MessageComposerProps = {
  onSend: (content: string) => void
  isLoading?: boolean
  placeholder?: string
  className?: string
}

function ArrowUpIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 16V4" />
      <path d="M4 10l6-6 6 6" />
    </svg>
  )
}

function StopIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <rect x="3" y="3" width="10" height="10" rx="2" />
    </svg>
  )
}

function MessageComposer({
  onSend,
  isLoading = false,
  placeholder = 'Type a message...',
  className,
}: MessageComposerProps) {
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const canSend = value.trim().length > 0 && !isLoading

  const resetHeight = useCallback(() => {
    const el = textareaRef.current
    if (el) {
      el.style.height = 'auto'
      el.style.overflowY = 'hidden'
    }
  }, [])

  const handleSend = useCallback(() => {
    if (!canSend) return
    onSend(value.trim())
    setValue('')
    resetHeight()
    textareaRef.current?.focus()
  }, [canSend, onSend, value, resetHeight])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSend()
      }
    },
    [handleSend],
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value)
      const el = e.target
      el.style.height = 'auto'
      const capped = Math.min(el.scrollHeight, 200)
      el.style.height = `${capped}px`
      el.style.overflowY = el.scrollHeight > 200 ? 'auto' : 'hidden'
    },
    [],
  )

  return (
    <div
      className={twMerge(
        'relative shrink-0 rounded-3xl border border-border/60 bg-surface',
        'shadow-lg shadow-black/10',
        'transition-all duration-200',
        'focus-within:border-accent/40 focus-within:shadow-accent/5',
        className,
      )}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={1}
        disabled={isLoading}
        className={twMerge(
          'w-full resize-none bg-transparent',
          'pl-5 pr-14 pt-4 pb-4 text-[15px] leading-relaxed',
          'text-text-primary placeholder:text-text-muted/70',
          'focus:outline-none',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'overflow-hidden',
        )}
        style={{ colorScheme: 'dark' }}
        aria-label="Message input"
      />

      <button
        type="button"
        onClick={handleSend}
        disabled={!value.trim() || isLoading}
        aria-label="Send message"
        className={twMerge(
          'absolute bottom-3 right-3',
          'inline-flex items-center justify-center',
          'w-9 h-9 rounded-full',
          'transition-all duration-200',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
          canSend
            ? 'bg-accent text-white hover:bg-accent-hover active:scale-90 shadow-md shadow-accent/25'
            : isLoading
              ? 'bg-text-muted/20 text-text-secondary hover:bg-text-muted/30'
              : 'bg-transparent text-text-muted/40 cursor-default',
        )}
      >
        {isLoading ? <StopIcon /> : <ArrowUpIcon />}
      </button>
    </div>
  )
}

export { MessageComposer }
