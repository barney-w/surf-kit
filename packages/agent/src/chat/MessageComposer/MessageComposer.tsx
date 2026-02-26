import { twMerge } from 'tailwind-merge'
import React, { useState, useRef, useCallback } from 'react'

export type MessageComposerProps = {
  onSend: (content: string) => void
  isLoading?: boolean
  placeholder?: string
  className?: string
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

  const handleSend = useCallback(() => {
    if (!canSend) return
    onSend(value.trim())
    setValue('')
    textareaRef.current?.focus()
  }, [canSend, onSend, value])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSend()
      }
    },
    [handleSend],
  )

  return (
    <div
      className={twMerge(
        'flex items-end gap-2 border-t border-border p-4 bg-surface',
        className,
      )}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={1}
        aria-label="Message input"
        className={twMerge(
          'flex-1 resize-none rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary',
          'focus:border-interactive focus:ring-2 focus:ring-accent/20 focus:outline-none',
          'disabled:opacity-50 disabled:cursor-not-allowed',
        )}
        disabled={isLoading}
      />
      <button
        type="button"
        onClick={handleSend}
        disabled={!canSend}
        aria-label="Send message"
        className={twMerge(
          'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium',
          'bg-accent text-white transition-colors',
          'hover:bg-accent-hover',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        )}
      >
        Send
      </button>
    </div>
  )
}

export { MessageComposer }
