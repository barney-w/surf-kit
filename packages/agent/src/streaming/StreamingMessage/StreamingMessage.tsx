'use client'

import React, { useEffect, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { WaveLoader } from '@surf-kit/core'
import type { StreamState } from '../../types/streaming'
import { useCharacterDrain } from '../../hooks/useCharacterDrain'
import { ResponseMessage } from '../../response/ResponseMessage'

type StreamingMessageProps = {
  stream: StreamState
  onComplete?: () => void
  onDraining?: (isDraining: boolean) => void
  showPhases?: boolean
  className?: string
}

const phaseLabels: Record<StreamState['phase'], string> = {
  idle: '',
  waiting: 'Waiting...',
  thinking: 'Thinking...',
  retrieving: 'Searching...',
  generating: 'Writing...',
  verifying: 'Verifying...',
}

// Cursor styles that handle block-level last elements (ul, ol, blockquote)
// by targeting the last text-containing child within them, so the cursor
// always appears inline with the final text rather than on a new line.
const CURSOR_STYLES = `
.sk-streaming-cursor > :is(p,h1,h2,h3,h4,pre):last-child::after,
.sk-streaming-cursor > :is(ul,ol):last-child > li:last-child::after,
.sk-streaming-cursor > blockquote:last-child > p:last-child::after {
  content: "";
  display: inline-block;
  width: 2px;
  height: 1em;
  background: var(--color-accent, #38bdf8);
  animation: sk-cursor-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  margin-left: 2px;
  vertical-align: text-bottom;
}
@keyframes sk-cursor-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
`

function StreamingMessage({
  stream,
  onComplete,
  onDraining,
  showPhases = true,
  className,
}: StreamingMessageProps) {
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete
  const onDrainingRef = useRef(onDraining)
  onDrainingRef.current = onDraining
  const wasActiveRef = useRef(stream.active)

  useEffect(() => {
    if (wasActiveRef.current && !stream.active) {
      onCompleteRef.current?.()
    }
    wasActiveRef.current = stream.active
  }, [stream.active])

  const phaseLabel = phaseLabels[stream.phase]
  const { displayed: rawDisplayed, isDraining } = useCharacterDrain(stream.content)
  // Trim trailing whitespace so ReactMarkdown doesn't create empty trailing
  // block elements that the cursor would land inside.
  const displayedContent = (stream.active || isDraining) ? rawDisplayed.trimEnd() : rawDisplayed

  // Notify parent of draining state changes
  useEffect(() => {
    onDrainingRef.current?.(isDraining)
  }, [isDraining])

  // Format agent label from stream.agent (e.g. "coordinator_agent" → "coordinator")
  const agentLabel = stream.agent
    ? stream.agent.replace('_agent', '').replace('_', ' ')
    : null

  // Show phase indicator only when there's no displayed content yet
  const showPhaseIndicator = showPhases && stream.active && stream.phase !== 'idle' && !displayedContent
  const showCursor = (stream.active || isDraining) && !!displayedContent

  return (
    <div className={twMerge('flex w-full flex-col items-start', className)} data-testid="streaming-message">
      {/* Screen reader announcements */}
      <div aria-live="assertive" className="sr-only">
        {stream.active && stream.phase !== 'idle' && 'Response started'}
        {!stream.active && stream.content && 'Response complete'}
      </div>

      {showCursor && <style>{CURSOR_STYLES}</style>}

      {/* Agent label */}
      {agentLabel && (
        <div className="text-[11px] font-display font-semibold uppercase tracking-[0.08em] text-text-muted px-1 mb-1.5">
          {agentLabel}
        </div>
      )}

      <div className="max-w-[88%] px-4 py-3 rounded-[18px] rounded-tl-[4px] bg-surface border border-border motion-safe:animate-springFromLeft">
        {showPhaseIndicator && (
          <div
            className="flex items-center gap-2 text-sm text-text-secondary"
            data-testid="phase-indicator"
          >
            <span aria-hidden="true">
              <WaveLoader size="sm" color="#38bdf8" />
            </span>
            <span>{phaseLabel}</span>
          </div>
        )}

        {displayedContent && (
          <ResponseMessage
            content={displayedContent}
            className={showCursor ? 'sk-streaming-cursor' : undefined}
          />
        )}
      </div>
    </div>
  )
}

export { StreamingMessage }
export type { StreamingMessageProps }
