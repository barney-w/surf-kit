import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  useAgentChat,
  type ChatMessage,
  type AgentResponse,
  type ConfidenceBreakdown,
  type VerificationResult,
  type Source,
} from '@surf-kit/agent'

const CHAT_CONFIG = {
  apiUrl: '/api/v1',
  streamPath: '/chat',
  feedbackPath: '/feedback',
  conversationsPath: '/conversations',
  timeout: 60000,
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function ConfidenceBadge({ confidence }: { confidence: ConfidenceBreakdown }) {
  const colors: Record<string, string> = {
    high: '#16a34a',
    medium: '#ca8a04',
    low: '#dc2626',
  }
  const color = colors[confidence.overall] ?? '#6b7280'
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '2px 8px',
        borderRadius: 12,
        fontSize: 12,
        fontWeight: 600,
        backgroundColor: `${color}18`,
        color,
        border: `1px solid ${color}40`,
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: color,
        }}
      />
      {confidence.overall} confidence
    </span>
  )
}

function VerificationBadge({ verification }: { verification: VerificationResult }) {
  const config: Record<string, { color: string; icon: string; label: string }> = {
    passed: { color: '#16a34a', icon: '\u2713', label: 'Verified' },
    flagged: { color: '#ca8a04', icon: '\u26a0', label: 'Flagged' },
    failed: { color: '#dc2626', icon: '\u2717', label: 'Failed' },
  }
  const { color, icon, label } = config[verification.status] ?? config.failed
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '2px 8px',
        borderRadius: 12,
        fontSize: 12,
        fontWeight: 600,
        backgroundColor: `${color}18`,
        color,
        border: `1px solid ${color}40`,
      }}
    >
      {icon} {label} ({verification.claims_verified}/{verification.claims_checked} claims)
    </span>
  )
}

function SourceCard({ source }: { source: Source }) {
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'block',
        padding: '8px 12px',
        borderRadius: 8,
        border: '1px solid var(--border-color, #e5e7eb)',
        textDecoration: 'none',
        color: 'inherit',
        fontSize: 13,
        lineHeight: 1.4,
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 2 }}>{source.title}</div>
      {source.section && (
        <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 4 }}>{source.section}</div>
      )}
      <div style={{ opacity: 0.8, fontSize: 12 }}>{source.snippet}</div>
    </a>
  )
}

function ThumbsFeedback({
  messageId,
  onFeedback,
}: {
  messageId: string
  onFeedback: (messageId: string, rating: 'positive' | 'negative') => void
}) {
  const [selected, setSelected] = useState<'positive' | 'negative' | null>(null)

  const handleClick = (rating: 'positive' | 'negative') => {
    setSelected(rating)
    onFeedback(messageId, rating)
  }

  return (
    <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
      <button
        onClick={() => handleClick('positive')}
        disabled={selected !== null}
        style={{
          padding: '4px 8px',
          borderRadius: 6,
          border: '1px solid var(--border-color, #e5e7eb)',
          background: selected === 'positive' ? '#16a34a22' : 'transparent',
          cursor: selected !== null ? 'default' : 'pointer',
          fontSize: 16,
          opacity: selected !== null && selected !== 'positive' ? 0.3 : 1,
        }}
        aria-label="Thumbs up"
      >
        👍
      </button>
      <button
        onClick={() => handleClick('negative')}
        disabled={selected !== null}
        style={{
          padding: '4px 8px',
          borderRadius: 6,
          border: '1px solid var(--border-color, #e5e7eb)',
          background: selected === 'negative' ? '#dc262622' : 'transparent',
          cursor: selected !== null ? 'default' : 'pointer',
          fontSize: 16,
          opacity: selected !== null && selected !== 'negative' ? 0.3 : 1,
        }}
        aria-label="Thumbs down"
      >
        👎
      </button>
      {selected && (
        <span style={{ fontSize: 12, opacity: 0.6, alignSelf: 'center', marginLeft: 4 }}>
          Thanks for your feedback!
        </span>
      )}
    </div>
  )
}

function PhaseIndicator({ phase }: { phase: string }) {
  if (phase === 'idle') return null

  const labels: Record<string, string> = {
    thinking: 'Thinking...',
    retrieving: 'Searching knowledge base...',
    generating: 'Writing response...',
    verifying: 'Verifying claims...',
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '12px 16px',
        fontSize: 14,
        opacity: 0.7,
      }}
    >
      <span className="phase-spinner" />
      {labels[phase] ?? phase}
    </div>
  )
}

function FollowUpChips({
  suggestions,
  onSelect,
}: {
  suggestions: string[]
  onSelect: (text: string) => void
}) {
  if (!suggestions.length) return null
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
      {suggestions.map((s) => (
        <button
          key={s}
          onClick={() => onSelect(s)}
          style={{
            padding: '6px 12px',
            borderRadius: 16,
            border: '1px solid var(--border-color, #e5e7eb)',
            background: 'transparent',
            cursor: 'pointer',
            fontSize: 13,
            color: 'var(--text-color, inherit)',
          }}
        >
          {s}
        </button>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Message rendering                                                  */
/* ------------------------------------------------------------------ */

function MessageBubble({
  msg,
  onFeedback,
  onFollowUp,
}: {
  msg: ChatMessage
  onFeedback: (messageId: string, rating: 'positive' | 'negative') => void
  onFollowUp: (text: string) => void
}) {
  const isUser = msg.role === 'user'

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isUser ? 'flex-end' : 'flex-start',
        marginBottom: 16,
        maxWidth: '100%',
      }}
    >
      {/* Agent label */}
      {!isUser && msg.agent && (
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: 4,
            opacity: 0.5,
          }}
        >
          {msg.agent}
        </div>
      )}

      {/* Bubble */}
      <div
        style={{
          maxWidth: isUser ? '70%' : '85%',
          padding: '12px 16px',
          borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
          backgroundColor: isUser
            ? 'var(--user-bubble, #2563eb)'
            : 'var(--assistant-bubble, #f3f4f6)',
          color: isUser ? '#fff' : 'var(--text-color, #111827)',
          fontSize: 14,
          lineHeight: 1.6,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        {msg.content}
      </div>

      {/* Response metadata */}
      {!isUser && msg.response && (
        <div style={{ maxWidth: '85%', marginTop: 8 }}>
          {/* Badges */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
            <ConfidenceBadge confidence={msg.response.confidence} />
            <VerificationBadge verification={msg.response.verification} />
          </div>

          {/* Flagged warnings */}
          {msg.response.verification.flags.length > 0 && (
            <div
              style={{
                padding: '8px 12px',
                borderRadius: 8,
                backgroundColor: '#fef3c7',
                border: '1px solid #fcd34d',
                fontSize: 12,
                marginBottom: 8,
                color: '#92400e',
              }}
            >
              <strong>Flags:</strong>
              <ul style={{ margin: '4px 0 0 16px', padding: 0 }}>
                {msg.response.verification.flags.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Sources */}
          {msg.response.sources.length > 0 && (
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4, opacity: 0.6 }}>
                Sources
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {msg.response.sources.map((src) => (
                  <SourceCard key={src.document_id} source={src} />
                ))}
              </div>
            </div>
          )}

          {/* Follow-up suggestions */}
          <FollowUpChips
            suggestions={msg.response.follow_up_suggestions}
            onSelect={onFollowUp}
          />

          {/* Feedback */}
          <ThumbsFeedback messageId={msg.id} onFeedback={onFeedback} />
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  FullPageDemo                                                       */
/* ------------------------------------------------------------------ */

export function FullPageDemo() {
  const { state, actions } = useAgentChat(CHAT_CONFIG)
  const threadRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Auto-scroll on new messages or streaming
  useEffect(() => {
    const el = threadRef.current
    if (el) {
      el.scrollTop = el.scrollHeight
    }
  }, [state.messages, state.streamPhase])

  const handleSend = useCallback(() => {
    const text = state.inputValue.trim()
    if (!text || state.isLoading) return
    actions.sendMessage(text)
  }, [state.inputValue, state.isLoading, actions])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSend()
      }
    },
    [handleSend],
  )

  const handleFeedback = useCallback(
    (messageId: string, rating: 'positive' | 'negative') => {
      actions.submitFeedback(messageId, rating)
    },
    [actions],
  )

  const handleFollowUp = useCallback(
    (text: string) => {
      actions.setInputValue(text)
      // Focus the input so the user can review before sending
      inputRef.current?.focus()
    },
    [actions],
  )

  const isEmpty = state.messages.length === 0 && !state.isLoading

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        maxWidth: 800,
        margin: '0 auto',
        padding: '0 16px',
      }}
    >
      {/* Message thread */}
      <div
        ref={threadRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px 0',
        }}
      >
        {isEmpty && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              textAlign: 'center',
              opacity: 0.5,
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 16 }}>🏄</div>
            <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>
              Surf Kit Agent Playground
            </h2>
            <p style={{ fontSize: 14, maxWidth: 400 }}>
              Ask about leave policy, password resets, or upcoming meetings to see different agent
              responses with sources, confidence, and verification.
            </p>
          </div>
        )}

        {state.messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            msg={msg}
            onFeedback={handleFeedback}
            onFollowUp={handleFollowUp}
          />
        ))}

        {state.isLoading && <PhaseIndicator phase={state.streamPhase} />}

        {state.error && (
          <div
            style={{
              padding: '12px 16px',
              borderRadius: 8,
              backgroundColor: '#fef2f2',
              border: '1px solid #fca5a5',
              color: '#dc2626',
              fontSize: 14,
              marginBottom: 16,
            }}
          >
            <strong>Error:</strong> {state.error.message}
            {state.error.retryable && (
              <button
                onClick={() => actions.retry()}
                style={{
                  marginLeft: 8,
                  padding: '4px 12px',
                  borderRadius: 6,
                  border: '1px solid #dc2626',
                  background: 'transparent',
                  color: '#dc2626',
                  cursor: 'pointer',
                  fontSize: 13,
                }}
              >
                Retry
              </button>
            )}
          </div>
        )}
      </div>

      {/* Composer */}
      <div
        style={{
          borderTop: '1px solid var(--border-color, #e5e7eb)',
          padding: '12px 0',
          display: 'flex',
          gap: 8,
          alignItems: 'flex-end',
        }}
      >
        <textarea
          ref={inputRef}
          value={state.inputValue}
          onChange={(e) => actions.setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question... (try: leave policy, password reset, board meetings)"
          rows={1}
          style={{
            flex: 1,
            padding: '10px 14px',
            borderRadius: 12,
            border: '1px solid var(--border-color, #e5e7eb)',
            fontSize: 14,
            resize: 'none',
            outline: 'none',
            fontFamily: 'inherit',
            backgroundColor: 'var(--input-bg, #fff)',
            color: 'var(--text-color, #111827)',
          }}
        />
        <button
          onClick={handleSend}
          disabled={!state.inputValue.trim() || state.isLoading}
          style={{
            padding: '10px 20px',
            borderRadius: 12,
            border: 'none',
            backgroundColor: state.inputValue.trim() && !state.isLoading ? '#2563eb' : '#93c5fd',
            color: '#fff',
            fontWeight: 600,
            fontSize: 14,
            cursor: state.inputValue.trim() && !state.isLoading ? 'pointer' : 'not-allowed',
          }}
        >
          Send
        </button>
      </div>
    </div>
  )
}
