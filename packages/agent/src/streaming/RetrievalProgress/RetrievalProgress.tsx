import { Spinner } from '@surf-kit/core'
import type { Source } from '../../types/agent'

type RetrievalProgressProps = {
  sources: Source[]
  isActive: boolean
  className?: string
}

function RetrievalProgress({ sources, isActive, className }: RetrievalProgressProps) {
  return (
    <div
      className={`space-y-2 ${className ?? ''}`}
      role="status"
      aria-label={
        isActive
          ? `Retrieving sources, ${sources.length} found so far`
          : `${sources.length} sources found`
      }
      data-testid="retrieval-progress"
    >
      {isActive && (
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <span aria-hidden="true">
            <Spinner size="sm" />
          </span>
          <span>Retrieving sources...</span>
        </div>
      )}

      {sources.length > 0 && (
        <ul className="space-y-1" data-testid="source-list">
          {sources.map((source, index) => (
            <li
              key={source.document_id}
              className="text-sm text-text-secondary flex items-center gap-2 animate-in fade-in slide-in-from-left-2"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
              data-testid="retrieval-source-item"
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0"
                aria-hidden="true"
              />
              <span className="truncate">{source.title}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export { RetrievalProgress }
export type { RetrievalProgressProps }
