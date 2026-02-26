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
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const widthStyle = typeof width === 'number' ? `${width}px` : width

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
        data-testid="panel-backdrop"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-label={title}
        style={{ width: widthStyle, maxWidth: '100vw' }}
        className={twMerge(
          'fixed top-0 h-full bg-surface shadow-xl flex flex-col z-50 transition-transform duration-300 ease-in-out',
          side === 'left' ? 'left-0 border-r border-border' : 'right-0 border-l border-border',
          className,
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3 shrink-0">
          <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close panel"
            className="rounded p-1 text-text-secondary hover:text-text-primary transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
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

        {/* Chat */}
        <AgentChat
          endpoint={endpoint}
          title={title}
          className="flex-1 rounded-none border-0"
        />
      </div>
    </div>
  )
}

export { AgentPanel }
