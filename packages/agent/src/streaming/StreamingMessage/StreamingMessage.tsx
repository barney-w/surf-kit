import React, { useEffect, useRef } from 'react'
import { Spinner } from '@surf-kit/core'
import type { StreamState } from '../../types/streaming'
import { useCharacterDrain } from '../../hooks/useCharacterDrain'

type StreamingMessageProps = {
  stream: StreamState
  onComplete?: () => void
  showPhases?: boolean
  className?: string
}

const phaseLabels: Record<StreamState['phase'], string> = {
  idle: '',
  waiting: 'Waiting',
  thinking: 'Thinking',
  retrieving: 'Searching',
  generating: 'Writing',
  verifying: 'Verifying',
}

function StreamingMessage({
  stream,
  onComplete,
  showPhases = true,
  className,
}: StreamingMessageProps) {
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete
  const wasActiveRef = useRef(stream.active)

  useEffect(() => {
    if (wasActiveRef.current && !stream.active) {
      onCompleteRef.current?.()
    }
    wasActiveRef.current = stream.active
  }, [stream.active])

  const phaseLabel = phaseLabels[stream.phase]
  const { displayed: displayedContent } = useCharacterDrain(stream.content)

  return (
    <div className={className} data-testid="streaming-message">
      {/* Screen reader announcements */}
      <div aria-live="assertive" className="sr-only">
        {stream.active && stream.phase !== 'idle' && 'Response started'}
        {!stream.active && stream.content && 'Response complete'}
      </div>

      {showPhases && stream.active && stream.phase !== 'idle' && (
        <div
          className="flex items-center gap-2 mb-2 text-sm text-text-secondary"
          data-testid="phase-indicator"
        >
          <span aria-hidden="true">
            <Spinner size="sm" />
          </span>
          <span>{phaseLabel}</span>
        </div>
      )}

      <div className="text-text-primary whitespace-pre-wrap">
        {displayedContent}
        {stream.active && (
          <span
            className="inline-block w-0.5 h-4 bg-accent align-text-bottom animate-pulse ml-0.5"
            aria-hidden="true"
            data-testid="streaming-cursor"
          />
        )}
      </div>
    </div>
  )
}

export { StreamingMessage }
export type { StreamingMessageProps }
