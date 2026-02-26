import React, { useCallback, useEffect, useRef } from 'react'
import {
  useAgentChat,
  AgentResponseView,
  TypewriterText,
  type ChatMessage,
} from '@surf-kit/agent'

export const LIVE_API_URL = import.meta.env.VITE_SURF_API_URL as string | undefined

const CHAT_CONFIG = {
  apiUrl: LIVE_API_URL ?? '/api/v1',
  streamPath: '/chat/stream',
  feedbackPath: '/feedback',
  conversationsPath: '/conversations',
  timeout: 60000,
}

/* ------------------------------------------------------------------ */
/*  Phase indicator                                                      */
/* ------------------------------------------------------------------ */

function PhaseIndicator({ phase }: { phase: string }) {
  if (phase === 'idle') return null

  const labels: Record<string, string> = {
    thinking: 'Thinking...',
    retrieving: 'Searching knowledge base...',
    generating: 'Writing response...',
  }

  return (
    <div className="flex items-center gap-3 py-3 px-1 step-enter">
      {phase === 'verifying' ? (
        <>
          <div className="brand-spinner brand-spinner-sm" aria-hidden="true" />
          <span className="text-sm text-brand-cyan/70 font-body animate-pulse">
            Checking accuracy...
          </span>
        </>
      ) : (
        <>
          <div className="brand-spinner brand-spinner-sm" aria-hidden="true" />
          <span className="text-sm text-brand-cream/50 font-body animate-pulse">
            {labels[phase] ?? phase}
          </span>
        </>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Message bubble                                                      */
/* ------------------------------------------------------------------ */

function MessageBubble({
  msg,
  isStreamingThisMsg,
  onFollowUp,
}: {
  msg: ChatMessage
  isStreamingThisMsg: boolean
  onFollowUp: (text: string) => void
}) {
  const isUser = msg.role === 'user'
  const suggestions = msg.response?.follow_up_suggestions ?? []

  if (isUser) {
    return (
      <div className="flex justify-end mb-1">
        <div className="max-w-[70%] px-4 py-2.5 rounded-[18px] rounded-br-[4px] bg-brand-blue text-brand-cream text-sm leading-relaxed whitespace-pre-wrap break-words">
          {msg.content}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-start gap-1.5 mb-1">
      {msg.agent && (
        <div className="text-[11px] font-display font-semibold uppercase tracking-[0.08em] text-brand-gold/55 px-1">
          {msg.agent.replace('_agent', '').replace('_', ' ')}
        </div>
      )}

      <div className="w-full max-w-[88%] px-4 py-3 rounded-[18px] rounded-tl-[4px] bg-brand-dark-panel/70 border border-brand-gold/15 backdrop-blur-[8px]">
        {isStreamingThisMsg ? (
          <p className="text-sm text-brand-cream leading-relaxed m-0">
            {msg.content}
            <span className="typewriter-cursor" aria-hidden="true" />
          </p>
        ) : msg.response ? (
          <AgentResponseView
            response={msg.response}
            showSources
            showConfidence
            showVerification
          />
        ) : (
          <p className="text-sm text-brand-cream leading-relaxed m-0">{msg.content}</p>
        )}
      </div>

      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {suggestions.map(s => (
            <button
              key={s}
              onClick={() => onFollowUp(s)}
              className="px-4 py-1.5 rounded-full text-sm border border-brand-gold/20 bg-transparent text-brand-cream/65 hover:bg-brand-gold/10 hover:border-brand-gold/40 hover:text-brand-cream transition-colors duration-200 cursor-pointer"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  FullPageDemo                                                        */
/* ------------------------------------------------------------------ */

export function FullPageDemo() {
  const { state, actions } = useAgentChat(CHAT_CONFIG)
  const threadRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const el = threadRef.current
    if (el) el.scrollTop = el.scrollHeight
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

  const isEmpty = state.messages.length === 0 && !state.isLoading

  const lastAssistantMsg = [...state.messages].reverse().find(m => m.role === 'assistant')

  return (
    <div className="flex flex-col h-full max-w-[860px] mx-auto px-4">
      {/* Message thread */}
      <div ref={threadRef} className="flex-1 overflow-y-auto py-6">
        {isEmpty && (
          <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center h-full step-enter">
            {/* Pulsing icon */}
            <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center pulse-glow">
              <span className="text-brand-gold text-2xl">🌊</span>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="font-display text-3xl font-bold text-brand-cream">
                Surf Kit Agent
              </h2>
              <p className="text-brand-cream/60 text-base max-w-md leading-relaxed">
                <TypewriterText
                  text="Ask about council tax reduction, missed bin collections, or planning permission — and see agent responses with sources, confidence scores, and live verification."
                  speed={18}
                  showCursor={false}
                />
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {['Council tax reduction', 'Missed bin collection', 'Planning permission'].map(chip => (
                <button
                  key={chip}
                  onClick={() => { actions.setInputValue(chip); inputRef.current?.focus() }}
                  className="px-4 py-2 rounded-full text-sm border border-brand-gold/20 bg-transparent text-brand-cream/70 hover:bg-brand-gold/10 hover:border-brand-gold/40 hover:text-brand-cream focus-visible:outline-2 focus-visible:outline-brand-cyan transition-colors duration-200 cursor-pointer"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        )}

        {state.messages.map(msg => (
          <MessageBubble
            key={msg.id}
            msg={msg}
            isStreamingThisMsg={
              state.isLoading &&
              state.streamPhase === 'generating' &&
              msg.id === lastAssistantMsg?.id
            }
            onFollowUp={text => {
              actions.setInputValue(text)
              inputRef.current?.focus()
            }}
          />
        ))}

        {state.isLoading && state.streamPhase !== 'generating' && (
          <PhaseIndicator phase={state.streamPhase} />
        )}

        {state.error && (
          <div className="px-4 py-3 rounded-xl bg-brand-watermelon/10 border border-brand-watermelon/30 text-sm mb-4">
            <span className="font-display font-semibold text-brand-watermelon">Error: </span>
            <span className="text-brand-watermelon/80">{state.error.message}</span>
            {state.error.retryable && (
              <button
                onClick={() => actions.retry()}
                className="ml-3 px-3 py-1 rounded-lg text-sm border border-brand-watermelon/40 text-brand-watermelon hover:bg-brand-watermelon/10 transition-colors duration-200"
              >
                Retry
              </button>
            )}
          </div>
        )}
      </div>

      {/* Composer */}
      <div className="flex items-end gap-3 border-t border-brand-gold/12 py-3 shrink-0">
        <textarea
          ref={inputRef}
          value={state.inputValue}
          onChange={e => actions.setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question..."
          rows={1}
          className="flex-1 px-4 py-2.5 rounded-xl resize-none text-sm font-body bg-brand-dark-panel/80 border border-brand-gold/15 text-brand-cream placeholder:text-brand-charcoal outline-none focus:border-transparent focus:ring-2 focus:ring-brand-gold/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          style={{ colorScheme: 'dark' }}
          disabled={state.isLoading}
        />
        <button
          onClick={handleSend}
          disabled={!state.inputValue.trim() || state.isLoading}
          className={`px-5 py-2.5 rounded-xl text-sm font-display font-semibold text-brand-cream transition-all duration-200 shrink-0 focus-visible:outline-2 focus-visible:outline-brand-cyan ${
            state.inputValue.trim() && !state.isLoading
              ? 'bg-brand-blue hover:bg-brand-cyan hover:shadow-glow-cyan hover:scale-[1.02] active:scale-[0.98]'
              : 'bg-brand-blue/30 text-brand-cream/40 cursor-not-allowed'
          }`}
        >
          Send
        </button>
      </div>
    </div>
  )
}
