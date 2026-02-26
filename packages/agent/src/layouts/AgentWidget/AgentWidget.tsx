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

  const positionClasses = position === 'bottom-left' ? 'left-4 bottom-4' : 'right-4 bottom-4'
  const popoverPositionClasses = position === 'bottom-left' ? 'left-4 bottom-20' : 'right-4 bottom-20'
  const popoverOrigin = position === 'bottom-left' ? 'origin-bottom-left' : 'origin-bottom-right'

  return (
    <div className={className}>
      {/* Popover — always rendered, animated with CSS */}
      <div
        role="dialog"
        aria-label={title}
        aria-hidden={!isOpen}
        className={twMerge(
          'fixed z-50 flex flex-col',
          'w-[min(400px,calc(100vw-2rem))] h-[min(600px,calc(100vh-6rem))]',
          'rounded-2xl overflow-hidden border border-brand-gold/15',
          'bg-brand-dark/95 backdrop-blur-[12px] shadow-card',
          popoverPositionClasses,
          popoverOrigin,
          'transition-all duration-200 ease-out',
          isOpen
            ? 'opacity-100 scale-100 pointer-events-auto translate-y-0'
            : 'opacity-0 scale-95 pointer-events-none translate-y-2',
        )}
      >
        {/* Popover header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-brand-dark-panel/80 border-b border-brand-gold/15 shrink-0">
          <h2 className="text-sm font-display font-semibold text-brand-cream">{title}</h2>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Minimize chat"
            className="rounded-lg p-1.5 text-brand-cream/40 hover:text-brand-cream/70 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <AgentChat
          endpoint={endpoint}
          title={title}
          showHeader={false}
          showWelcomeTitle={false}
          className="flex-1 rounded-none border-0 min-h-0"
        />
      </div>

      {/* FAB — gold glow */}
      <button
        type="button"
        onClick={toggle}
        aria-label={isOpen ? 'Close chat' : triggerLabel}
        aria-expanded={isOpen}
        className={twMerge(
          'fixed z-50 flex items-center justify-center w-14 h-14 rounded-full',
          'bg-brand-blue text-brand-cream shadow-glow-cyan',
          'hover:bg-brand-cyan hover:shadow-glow-cyan hover:scale-105',
          'active:scale-95',
          'transition-all duration-200',
          positionClasses,
        )}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
    </div>
  )
}

export { AgentWidget }
