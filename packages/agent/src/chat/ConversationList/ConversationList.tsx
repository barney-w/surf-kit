import { twMerge } from 'tailwind-merge'
import React from 'react'
import type { ConversationSummary } from '../../types/chat'

export type ConversationListProps = {
  conversations: ConversationSummary[]
  activeId?: string
  onSelect: (id: string) => void
  onDelete?: (id: string) => void
  onNew?: () => void
  className?: string
}

function ConversationList({
  conversations,
  activeId,
  onSelect,
  onDelete,
  onNew,
  className,
}: ConversationListProps) {
  return (
    <nav
      aria-label="Conversation list"
      className={twMerge('flex flex-col h-full bg-brand-dark', className)}
    >
      {onNew && (
        <div className="p-3 border-b border-border">
          <button
            type="button"
            onClick={onNew}
            className="w-full px-4 py-2.5 rounded-xl text-sm font-display font-semibold bg-brand-blue text-brand-cream hover:bg-brand-cyan hover:shadow-glow-cyan transition-all duration-200"
          >
            New conversation
          </button>
        </div>
      )}

      <ul role="list" className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => {
          const isActive = conversation.id === activeId
          return (
            <li
              key={conversation.id}
              className={twMerge(
                'flex items-start border-b border-brand-gold/8 transition-colors duration-200',
                'hover:bg-brand-dark-panel/50',
                isActive && 'bg-brand-dark-panel/70 border-l-2 border-l-brand-gold',
              )}
            >
              <button
                type="button"
                onClick={() => onSelect(conversation.id)}
                aria-current={isActive ? 'true' : undefined}
                className="flex-1 min-w-0 text-left px-4 py-3"
              >
                <div className="text-sm font-medium text-brand-cream truncate">
                  {conversation.title}
                </div>
                <div className="text-xs text-brand-cream/40 truncate mt-0.5 leading-relaxed">
                  {conversation.lastMessage}
                </div>
              </button>
              {onDelete && (
                <button
                  type="button"
                  onClick={() => onDelete(conversation.id)}
                  aria-label={`Delete ${conversation.title}`}
                  className="shrink-0 p-1.5 m-2 rounded-lg text-brand-cream/25 hover:text-brand-watermelon hover:bg-brand-watermelon/10 transition-colors duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
              )}
            </li>
          )
        })}

        {conversations.length === 0 && (
          <li className="px-4 py-8 text-center">
            <span className="text-sm text-brand-cream/30 font-body">No conversations yet</span>
          </li>
        )}
      </ul>
    </nav>
  )
}

export { ConversationList }
