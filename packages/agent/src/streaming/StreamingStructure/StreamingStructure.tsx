import React from 'react'
import { twMerge } from 'tailwind-merge'
import { useReducedMotion } from '@surf-kit/hooks'
import { TextGlimmer } from '../TextGlimmer'

type StreamingStructureProps = {
  data: Record<string, unknown>
  isStreaming?: boolean
  className?: string
}

const fadeSlideInKeyframes = `
@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
`

function renderValue(value: unknown, reducedMotion: boolean): React.ReactNode {
  if (value === null) {
    return <span className="italic text-text-secondary">null</span>
  }
  if (value === undefined) {
    return <span className="italic text-text-secondary">undefined</span>
  }
  if (Array.isArray(value)) {
    return (
      <ol className="list-decimal pl-4 m-0">
        {value.map((item, i) => (
          <li key={i} className="text-text-secondary text-sm">
            {renderValue(item, reducedMotion)}
          </li>
        ))}
      </ol>
    )
  }
  if (typeof value === 'object') {
    return renderNestedDl(value as Record<string, unknown>, reducedMotion)
  }
  return String(value)
}

function renderNestedDl(
  data: Record<string, unknown>,
  reducedMotion: boolean,
): React.ReactNode {
  const entries = Object.entries(data)
  return (
    <dl className="pl-4 m-0" data-testid="streaming-structure-nested">
      {entries.map(([key, value]) => (
        <div
          key={key}
          style={
            reducedMotion
              ? undefined
              : { animation: 'fadeSlideIn 0.3s ease-out' }
          }
        >
          <dt className="font-medium text-text-primary text-sm">{key}</dt>
          <dd className="text-text-secondary text-sm ml-0 mb-3">
            {renderValue(value, reducedMotion)}
          </dd>
        </div>
      ))}
    </dl>
  )
}

function StreamingStructure({
  data,
  isStreaming = false,
  className,
}: StreamingStructureProps) {
  const reducedMotion = useReducedMotion()
  const entries = Object.entries(data)

  return (
    <dl
      aria-live="polite"
      className={twMerge('m-0', className)}
      data-testid="streaming-structure"
    >
      {!reducedMotion && <style>{fadeSlideInKeyframes}</style>}
      {entries.map(([key, value]) => (
        <div
          key={key}
          style={
            reducedMotion
              ? undefined
              : { animation: 'fadeSlideIn 0.3s ease-out' }
          }
          data-testid="streaming-structure-entry"
        >
          <dt className="font-medium text-text-primary text-sm">{key}</dt>
          <dd className="text-text-secondary text-sm ml-0 mb-3">
            {renderValue(value, reducedMotion)}
          </dd>
        </div>
      ))}
      {isStreaming && (
        <div data-testid="streaming-structure-loading">
          <TextGlimmer lines={1} />
        </div>
      )}
    </dl>
  )
}

export { StreamingStructure }
export type { StreamingStructureProps }
