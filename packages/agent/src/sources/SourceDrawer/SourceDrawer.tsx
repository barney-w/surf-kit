import { Badge, Sheet } from '@surf-kit/core'
import type { Source } from '../../types/agent'

type SourceDrawerProps = {
  source: Source | null
  isOpen: boolean
  onClose: () => void
  className?: string
}

function getConfidenceIntent(confidence: number) {
  if (confidence >= 0.8) return 'success' as const
  if (confidence >= 0.5) return 'warning' as const
  return 'error' as const
}

function SourceDrawer({ source, isOpen, onClose, className }: SourceDrawerProps) {
  if (!source) return null

  return (
    <Sheet isOpen={isOpen} onClose={onClose} title={source.title} size="md" className={className}>
      <div data-testid="source-drawer" data-document-id={source.document_id}>
        {source.section && <p className="text-sm text-text-secondary mb-4">{source.section}</p>}

        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-text-secondary">Confidence:</span>
          <Badge intent={getConfidenceIntent(source.confidence)} size="sm">
            {Math.round(source.confidence * 100)}%
          </Badge>
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-medium text-text-primary mb-2">Snippet</h3>
          <p className="text-sm text-text-secondary bg-surface-raised p-4 rounded-lg">
            {source.snippet}
          </p>
        </div>

        {source.url && (
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-2">Source URL</h3>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-accent hover:underline break-all"
            >
              {source.url}
            </a>
          </div>
        )}
      </div>
    </Sheet>
  )
}

export { SourceDrawer }
export type { SourceDrawerProps }
