import { twMerge } from 'tailwind-merge'
import React, { useRef, useEffect } from 'react'
import { AgentChat } from '../../chat/AgentChat'

export type AgentPanelProps = {
  endpoint: string
  isOpen: boolean
  onClose: () => void
  side?: 'left' | 'right'
  width?: string | number
  title?: string
  className?: string
}

function AgentPanel({
  endpoint,
  isOpen,
  onClose,
  side = 'right',
  width = 400,
  title = 'Chat',
  className,
}: AgentPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const widthStyle = typeof width === 'number' ? `${width}px` : width

  return (
    <div
      className={twMerge('fixed inset-0 z-50', !isOpen && 'pointer-events-none')}
      aria-hidden={!isOpen}
    >
      {/* Backdrop */}
      <div
        className={twMerge(
          'fixed inset-0 transition-opacity duration-300',
          isOpen
            ? 'opacity-100 bg-brand-dark/70 backdrop-blur-sm pointer-events-auto'
            : 'opacity-0 pointer-events-none',
        )}
        onClick={isOpen ? onClose : undefined}
        data-testid="panel-backdrop"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-label={title}
        aria-modal={isOpen ? 'true' : undefined}
        style={{ width: widthStyle, maxWidth: '100vw' }}
        className={twMerge(
          'fixed top-0 h-full flex flex-col z-50 bg-brand-dark shadow-card',
          'transition-transform duration-300 ease-in-out',
          side === 'left'
            ? `left-0 border-r border-brand-gold/15 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`
            : `right-0 border-l border-brand-gold/15 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`,
          className,
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-brand-gold/15 px-5 py-3.5 bg-brand-dark-panel/60 backdrop-blur-sm shrink-0">
          <h2 className="text-base font-display font-semibold text-brand-cream">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close panel"
            className="rounded-xl p-2 text-brand-cream/40 hover:text-brand-cream/80 hover:bg-brand-cream/5 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Chat */}
        <AgentChat
          endpoint={endpoint}
          title={title}
          showHeader={false}
          showWelcomeTitle={false}
          className="flex-1 rounded-none border-0"
        />
      </div>
    </div>
  )
}

export { AgentPanel }
