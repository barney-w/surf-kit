import { Tooltip } from '@surf-kit/core'

import type { Source } from '../../types/agent'

type SourceInlineProps = {
  source: Source
  index: number
  className?: string
}

function SourceInline({ source, index, className }: SourceInlineProps) {
  const tooltipContent = `${source.title}${source.section ? ` - ${source.section}` : ''}: ${source.snippet.slice(0, 120)}${source.snippet.length > 120 ? '...' : ''}`

  return (
    <Tooltip content={tooltipContent} placement="top">
      <span
        className={`inline-flex items-center justify-center text-xs text-accent font-medium cursor-help ${className ?? ''}`}
        data-testid="source-inline"
        data-document-id={source.document_id}
        aria-label={`Source ${index}: ${source.title}`}
      >
        [{index}]
      </span>
    </Tooltip>
  )
}

export { SourceInline }
export type { SourceInlineProps }
