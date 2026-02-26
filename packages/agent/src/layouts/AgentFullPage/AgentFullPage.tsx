import { twMerge } from 'tailwind-merge'
import React, { useState, useCallback } from 'react'
import { AgentChat } from '../../chat/AgentChat'
import { ConversationList } from '../../chat/ConversationList'
import type { ConversationSummary } from '../../types/chat'

export type AgentFullPageProps = {
  endpoint: string
  title?: string
  showConversationList?: boolean
  conversations?: ConversationSummary[]
  activeConversationId?: string
  onConversationSelect?: (id: string) => void
  onConversationDelete?: (id: string) => void
  onNewConversation?: () => void
  className?: string
}

function AgentFullPage({
  endpoint,
  title = 'Chat',
  showConversationList = false,
  conversations = [],
  activeConversationId,
  onConversationSelect,
  onConversationDelete,
  onNewConversation,
  className,
}: AgentFullPageProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleSelect = useCallback(
    (id: string) => {
      onConversationSelect?.(id)
      setSidebarOpen(false)
    },
    [onConversationSelect],
  )

  return (
    <div
      className={twMerge('flex h-screen w-full overflow-hidden bg-brand-dark', className)}
      data-testid="agent-full-page"
    >
      {/* Sidebar */}
      {showConversationList && (
        <>
          {/* Mobile overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-brand-dark/80 backdrop-blur-sm z-30 md:hidden"
              onClick={() => setSidebarOpen(false)}
              data-testid="sidebar-overlay"
            />
          )}

          {/* Sidebar panel */}
          <aside
            className={twMerge(
              'bg-brand-dark border-r border-brand-gold/15 w-72 shrink-0 flex-col z-40',
              // Desktop: always visible
              'hidden md:flex',
              // Mobile: overlay when open
              sidebarOpen && 'fixed inset-y-0 left-0 flex md:relative',
            )}
            aria-label="Conversations sidebar"
          >
            <ConversationList
              conversations={conversations}
              activeId={activeConversationId}
              onSelect={handleSelect}
              onDelete={onConversationDelete}
              onNew={onNewConversation}
            />
          </aside>
        </>
      )}

      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0 bg-brand-dark">
        {/* Mobile sidebar toggle */}
        {showConversationList && (
          <div className="md:hidden flex items-center border-b border-brand-gold/15 px-3 py-2 bg-brand-dark-panel/60 backdrop-blur-sm">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open conversations sidebar"
              className="p-2 rounded-xl text-brand-cream/60 hover:text-brand-cream hover:bg-brand-dark-panel transition-colors duration-200"
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
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        )}

        <AgentChat
          endpoint={endpoint}
          title={title}
          className="flex-1 rounded-none border-0"
        />
      </div>
    </div>
  )
}

export { AgentFullPage }
