import { useCallback, useState } from 'react'
import { View, SafeAreaView } from 'react-native'
import { useAgentChat } from '@surf-kit/agent/hooks'
import { MessageThread, MessageComposer, WelcomeScreen } from '@surf-kit/agent/chat'
import { StreamingMessage } from '@surf-kit/agent/streaming'
import { ErrorResponse } from '@surf-kit/agent/response'

const CHAT_CONFIG = {
  apiUrl: process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:8000/api/v1',
  streamPath: '/chat/stream',
  timeout: 60000,
}

const SUGGESTED_QUESTIONS = [
  'What pricing plans are available?',
  'How do I get started?',
  'What are the rate limits?',
]

export default function ChatScreen() {
  const { state, actions } = useAgentChat(CHAT_CONFIG)
  const [isDraining, setIsDraining] = useState(false)
  const hasMessages = state.messages.length > 0
  const showStreaming = state.isLoading || isDraining

  const handleSend = useCallback(
    (content: string) => {
      void actions.sendMessage(content)
    },
    [actions],
  )

  return (
    <SafeAreaView className="flex-1 bg-canvas">
      <View className="flex-1 max-w-[860px] mx-auto px-4">
        {hasMessages ? (
          <View className="flex-1">
            <MessageThread
              messages={state.messages}
              showAgent
              showSources
              showConfidence={false}
              showVerification={false}
              hideLastAssistant={isDraining}
              streamingSlot={
                showStreaming ? (
                  <StreamingMessage
                    stream={{
                      active: state.isLoading,
                      phase: state.streamPhase,
                      content: state.streamingContent,
                      sources: [],
                      agent: state.streamingAgent,
                      agentLabel: null,
                    }}
                    onDraining={setIsDraining}
                  />
                ) : undefined
              }
            />

            {state.error && (
              <ErrorResponse error={state.error} onRetry={() => actions.retry()} />
            )}

            <View className="py-3">
              <MessageComposer
                onSend={handleSend}
                isLoading={state.isLoading}
                placeholder="Ask a question..."
              />
            </View>
          </View>
        ) : (
          <View className="flex-1 items-center justify-center">
            <WelcomeScreen
              title="Hi, I'm Surf."
              message="Ask me about any of my knowledge sources."
              suggestedQuestions={SUGGESTED_QUESTIONS}
              onQuestionSelect={handleSend}
            />
            <View className="w-full max-w-[640px] pb-8">
              <MessageComposer
                onSend={handleSend}
                isLoading={state.isLoading}
                placeholder="Ask a question..."
              />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}
