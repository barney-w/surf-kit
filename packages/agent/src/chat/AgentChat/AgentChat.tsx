import { twMerge } from 'tailwind-merge'
import React from 'react'
import { useAgentChat } from '../../hooks/useAgentChat'
import { MessageThread } from '../MessageThread'
import { MessageComposer } from '../MessageComposer'
import { WelcomeScreen } from '../WelcomeScreen'
import { StreamingMessage } from '../../streaming/StreamingMessage'
import type { ChatMessage } from '../../types/chat'

export type AgentChatProps = {
  endpoint: string
  title?: string
  welcomeTitle?: string
  welcomeMessage?: string
  suggestedQuestions?: string[]
  showHeader?: boolean
  showWelcomeTitle?: boolean
  showSources?: boolean
  showConfidence?: boolean
  showVerification?: boolean
  enableFeedback?: boolean
  onMessage?: (message: ChatMessage) => void
  className?: string
}

function AgentChat({
  endpoint,
  title = 'Chat',
  welcomeTitle,
  welcomeMessage = 'How can I help you today?',
  suggestedQuestions = [],
  showHeader = true,
  showWelcomeTitle = true,
  showSources,
  showConfidence,
  showVerification,
  className,
}: AgentChatProps) {
  const { state, actions } = useAgentChat({ apiUrl: endpoint })

  const hasMessages = state.messages.length > 0

  const handleSend = (content: string) => {
    void actions.sendMessage(content)
  }

  const handleQuestionSelect = (question: string) => {
    void actions.sendMessage(question)
  }

  return (
    <div
      className={twMerge(
        'flex flex-col h-full bg-canvas border border-border rounded-xl overflow-hidden',
        className,
      )}
    >
      {showHeader && (
        <div className="flex items-center justify-between border-b border-border px-4 py-3 bg-surface-raised shrink-0">
          <h1 className="text-base font-semibold text-text-primary">{title}</h1>
        </div>
      )}

      {hasMessages ? (
        <MessageThread
          messages={state.messages}
          streamingSlot={
            state.isLoading ? (
              <StreamingMessage
                stream={{
                  active: state.isLoading,
                  phase: state.streamPhase,
                  content: state.streamingContent,
                  sources: [],
                  agent: null,
                  agentLabel: null,
                }}
              />
            ) : undefined
          }
          showSources={showSources}
          showConfidence={showConfidence}
          showVerification={showVerification}
        />
      ) : (
        <WelcomeScreen
          title={showWelcomeTitle ? (welcomeTitle ?? title) : ''}
          message={welcomeMessage}
          suggestedQuestions={suggestedQuestions}
          onQuestionSelect={handleQuestionSelect}
        />
      )}

      <MessageComposer onSend={handleSend} isLoading={state.isLoading} />
    </div>
  )
}

export { AgentChat }
