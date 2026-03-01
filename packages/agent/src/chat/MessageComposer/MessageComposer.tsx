import type React from 'react'
import { useCallback, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

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

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
    const el = e.target
    el.style.height = 'auto'
    const capped = Math.min(el.scrollHeight, 128)
    el.style.height = `${capped}px`
    el.style.overflowY = el.scrollHeight > 128 ? 'auto' : 'hidden'
  }, [])

  return (
    <div
      className={twMerge(
        'flex items-end gap-3 shrink-0 border-t border-border px-4 py-3',
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
          'flex-1 resize-none rounded-xl border border-border bg-surface/80',
          'px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted',
          'focus:border-transparent focus:ring-2 focus:ring-accent/40 focus:outline-none',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'overflow-hidden',
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
            ? 'bg-accent hover:bg-accent-hover hover:scale-[1.02] hover:shadow-glow-cyan active:scale-[0.98]'
            : 'bg-accent/30 text-text-muted cursor-not-allowed',
        )}
      >
        Send
      </button>
    </div>
  )
}

export { MessageComposer }
