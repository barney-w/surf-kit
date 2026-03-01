import { useReducedMotion } from '@surf-kit/hooks'
import type React from 'react'
import { twMerge } from 'tailwind-merge'
import { TypingIndicator } from '../TypingIndicator'

type StreamingListProps<T> = {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  isStreaming?: boolean
  className?: string
  emptyMessage?: string
}

const fadeSlideInKeyframes = `
@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
`

function StreamingList<T>({
  items,
  renderItem,
  isStreaming = false,
  className,
  emptyMessage,
}: StreamingListProps<T>) {
  const reducedMotion = useReducedMotion()

  if (items.length === 0 && !isStreaming) {
    return emptyMessage ? (
      <p
        className={twMerge('text-sm text-text-secondary', className)}
        data-testid="streaming-list-empty"
      >
        {emptyMessage}
      </p>
    ) : null
  }

  return (
    <ul
      aria-live="polite"
      className={twMerge('list-none p-0 m-0', className)}
      data-testid="streaming-list"
    >
      {!reducedMotion && <style>{fadeSlideInKeyframes}</style>}
      {items.map((item, index) => (
        <li
          key={index}
          style={reducedMotion ? undefined : { animation: 'fadeSlideIn 0.3s ease-out' }}
          data-testid="streaming-list-item"
        >
          {renderItem(item, index)}
        </li>
      ))}
      {isStreaming && (
        <li data-testid="streaming-list-loading">
          <TypingIndicator />
        </li>
      )}
    </ul>
  )
}

export { StreamingList }
export type { StreamingListProps }
