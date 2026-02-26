import React from 'react'
import { Badge } from '@surf-kit/core'

type SourceBadgeProps = {
  count: number
  className?: string
}

function SourceBadge({ count, className }: SourceBadgeProps) {
  if (count === 0) return null

  return (
    <Badge intent="info" size="sm" className={className} data-testid="source-badge">
      {count} {count === 1 ? 'source' : 'sources'}
    </Badge>
  )
}

export { SourceBadge }
export type { SourceBadgeProps }
