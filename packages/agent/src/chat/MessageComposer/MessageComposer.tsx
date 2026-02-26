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
        'flex items-end gap-3 border-t border-border px-4 py-3 bg-canvas',
        className,
      )}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={1}
        disabled={isLoading}
        className={twMerge(
          'flex-1 resize-none rounded-xl border border-border bg-surface',
          'px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted',
          'focus:border-transparent focus:ring-2 focus:ring-accent/40 focus:outline-none',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'transition-all duration-200',
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
          'inline-flex items-center justify-center rounded-xl px-5 py-2.5',
          'text-sm font-semibold text-white shrink-0',
          'transition-all duration-200',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
          value.trim() && !isLoading
            ? 'bg-accent hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98]'
            : 'bg-accent/30 text-text-muted cursor-not-allowed',
        )}
      >
        Send
      </button>
    </div>
  )
}

export { MessageComposer }
