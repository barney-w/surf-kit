import { MessageComposer, MessageThread, StreamingMessage, WelcomeScreen } from '@surf-kit/agent'
import { useAIChat } from '../hooks/useAIChat'
import type { UseAIChatOptions } from '../types'

export interface AIChatProps extends UseAIChatOptions {
  /** Title shown in the header */
  title?: string
  /** Message displayed on the welcome screen */
  welcomeMessage?: string
  /** Suggested questions shown on the welcome screen */
  suggestedQuestions?: string[]
  /** Whether to show the header bar */
  showHeader?: boolean
  /** Whether to show source citations */
  showSources?: boolean
  /** Whether to show confidence indicators */
  showConfidence?: boolean
  /** Additional CSS class names */
  className?: string
}

/**
 * Drop-in chat component powered by Vercel AI SDK v6 and surf-kit agent UI.
 * Composes `MessageThread`, `MessageComposer`, `StreamingMessage`, and
 * `WelcomeScreen` from `@surf-kit/agent`.
 */
export function AIChat({
  title = 'Chat',
  welcomeMessage = 'How can I help you today?',
  suggestedQuestions = [],
  showHeader = true,
  showSources,
  showConfidence,
  className,
  ...chatOptions
}: AIChatProps) {
  const { messages, streamState, sendMessage, isLoading } = useAIChat(chatOptions)

  const hasMessages = messages.length > 0

  const handleQuestionSelect = (question: string) => {
    sendMessage(question)
  }

  return (
    <div
      className={[
        'flex flex-col h-full bg-canvas border border-border rounded-xl overflow-hidden',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {showHeader && (
        <div className="flex items-center justify-between border-b border-border px-4 py-3 bg-surface-raised shrink-0">
          <h1 className="text-base font-semibold text-text-primary">{title}</h1>
        </div>
      )}

      {hasMessages ? (
        <MessageThread
          messages={messages}
          streamingSlot={streamState.active ? <StreamingMessage stream={streamState} /> : undefined}
          showSources={showSources}
          showConfidence={showConfidence}
        />
      ) : (
        <WelcomeScreen
          title={title}
          message={welcomeMessage}
          suggestedQuestions={suggestedQuestions}
          onQuestionSelect={handleQuestionSelect}
        />
      )}

      <MessageComposer onSend={sendMessage} isLoading={isLoading} />
    </div>
  )
}
