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
        'flex items-end gap-3 border-t border-brand-gold/12 px-4 py-3 bg-brand-dark/80 backdrop-blur-sm',
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
          'flex-1 resize-none rounded-xl border border-brand-gold/15 bg-brand-dark-panel/80',
          'px-4 py-2.5 text-sm text-brand-cream placeholder:text-brand-charcoal font-body',
          'focus:border-transparent focus:ring-2 focus:ring-brand-gold/40 focus:outline-none',
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
          'text-sm font-display font-semibold text-brand-cream shrink-0',
          'transition-all duration-200',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-cyan',
          value.trim() && !isLoading
            ? 'bg-brand-blue hover:bg-brand-cyan hover:shadow-glow-cyan hover:scale-[1.02] active:scale-[0.98]'
            : 'bg-brand-blue/30 text-brand-cream/40 cursor-not-allowed',
        )}
      >
        Send
      </button>
    </div>
  )
}

export { MessageComposer }
