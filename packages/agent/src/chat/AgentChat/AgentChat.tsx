import { twMerge } from 'tailwind-merge'
import React from 'react'
import { useAgentChat } from '../../hooks/useAgentChat'
import { MessageThread } from '../MessageThread'
import { MessageComposer } from '../MessageComposer'
import { WelcomeScreen } from '../WelcomeScreen'
import type { ChatMessage } from '../../types/chat'

export type AgentChatProps = {
  endpoint: string
  title?: string
  welcomeMessage?: string
  suggestedQuestions?: string[]
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
  welcomeMessage = 'How can I help you today?',
  suggestedQuestions = [],
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
        'flex flex-col h-full bg-surface border border-border rounded-xl overflow-hidden',
        className,
      )}
    >
      <div className="flex items-center border-b border-border px-4 py-3">
        <h1 className="text-lg font-semibold text-text-primary">{title}</h1>
      </div>

      {hasMessages ? (
        <MessageThread messages={state.messages} />
      ) : (
        <WelcomeScreen
          title={title}
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
