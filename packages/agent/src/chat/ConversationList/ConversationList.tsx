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
      className={twMerge('flex flex-col h-full', className)}
    >
      {onNew && (
        <div className="p-3 border-b border-border">
          <button
            type="button"
            onClick={onNew}
            className="w-full px-3 py-2 text-sm font-medium rounded-lg bg-brand text-white hover:bg-brand/90 transition-colors"
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
                'flex items-start border-b border-border transition-colors hover:bg-surface-hover',
                isActive && 'bg-surface-hover',
              )}
            >
              <button
                type="button"
                onClick={() => onSelect(conversation.id)}
                aria-current={isActive ? 'true' : undefined}
                className="flex-1 min-w-0 text-left px-4 py-3"
              >
                <div className="text-sm font-medium text-text-primary truncate">
                  {conversation.title}
                </div>
                <div className="text-xs text-text-secondary truncate mt-0.5">
                  {conversation.lastMessage}
                </div>
              </button>
              {onDelete && (
                <button
                  type="button"
                  onClick={() => onDelete(conversation.id)}
                  aria-label={`Delete ${conversation.title}`}
                  className="shrink-0 p-1 m-3 rounded text-text-secondary hover:text-text-primary transition-colors"
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
          <li className="px-4 py-8 text-center text-sm text-text-secondary">
            No conversations yet
          </li>
        )}
      </ul>
    </nav>
  )
}

export { ConversationList }
