import { twMerge } from 'tailwind-merge'
import React, { useState, useCallback } from 'react'
import { AgentChat } from '../../chat/AgentChat'

export type AgentWidgetProps = {
  endpoint: string
  position?: 'bottom-right' | 'bottom-left'
  triggerLabel?: string
  title?: string
  className?: string
}

function AgentWidget({
  endpoint,
  position = 'bottom-right',
  triggerLabel = 'Chat',
  title = 'Chat',
  className,
}: AgentWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const positionClasses =
    position === 'bottom-left' ? 'left-4 bottom-4' : 'right-4 bottom-4'

  const popoverPositionClasses =
    position === 'bottom-left' ? 'left-4 bottom-20' : 'right-4 bottom-20'

  return (
    <div className={className}>
      {/* Chat popover */}
      {isOpen && (
        <div
          role="dialog"
          aria-label={title}
          className={twMerge(
            'fixed z-50 w-[min(400px,calc(100vw-2rem))] h-[min(600px,calc(100vh-6rem))] rounded-xl shadow-2xl overflow-hidden',
            popoverPositionClasses,
          )}
        >
          <div className="flex items-center justify-between bg-surface border-b border-border px-4 py-2 rounded-t-xl">
            <h2 className="text-sm font-semibold text-text-primary">{title}</h2>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Minimize chat"
              className="rounded p-1 text-text-secondary hover:text-text-primary transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <AgentChat
            endpoint={endpoint}
            title={title}
            className="h-[calc(100%-2.5rem)] rounded-none rounded-b-xl border-0"
          />
        </div>
      )}

      {/* Floating trigger button */}
      <button
        type="button"
        onClick={toggle}
        aria-label={isOpen ? 'Close chat' : triggerLabel}
        aria-expanded={isOpen}
        className={twMerge(
          'fixed z-50 flex items-center justify-center w-14 h-14 rounded-full bg-brand text-white shadow-lg hover:bg-brand/90 transition-colors',
          positionClasses,
        )}
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
    </div>
  )
}

export { AgentWidget }
