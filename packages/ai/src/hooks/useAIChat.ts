import { useChat } from '@ai-sdk/react'
import type { ChatMessage, StreamState } from '@surf-kit/agent'
import type { UIMessage } from 'ai'
import { DefaultChatTransport } from 'ai'
import type { UseAIChatOptions, UseAIChatReturn } from '../types'

/**
 * Extract the text content from a UIMessage by concatenating all text parts.
 */
function getTextContent(message: UIMessage): string {
  return message.parts
    .filter((part): part is { type: 'text'; text: string } => part.type === 'text')
    .map((part) => part.text)
    .join('')
}

/**
 * Adapter hook that wraps Vercel AI SDK v6's `useChat` and maps
 * its state to surf-kit `ChatMessage` and `StreamState` types.
 */
export function useAIChat(options: UseAIChatOptions = {}): UseAIChatReturn {
  const chat = useChat({
    transport: new DefaultChatTransport({
      api: options.api,
      headers: options.headers,
      body: options.body,
    }),
    onError: options.onError,
    onFinish: options.onFinish,
  })

  // Convert AI SDK v6 UIMessage (parts-based) to surf-kit ChatMessage format
  const messages: ChatMessage[] = chat.messages.map((m) => ({
    id: m.id,
    role: m.role as 'user' | 'assistant',
    content: getTextContent(m),
    timestamp: new Date(),
  }))

  const isStreaming = chat.status === 'streaming'
  const lastMessageContent =
    chat.messages.length > 0 ? getTextContent(chat.messages[chat.messages.length - 1]) : ''

  const streamState: StreamState = {
    active: isStreaming,
    phase: isStreaming ? 'generating' : 'idle',
    content: isStreaming ? lastMessageContent : '',
    sources: [],
    agent: null,
    agentLabel: null,
  }

  return {
    messages,
    streamState,
    sendMessage: (content: string) => {
      void chat.sendMessage({ text: content })
    },
    isLoading: isStreaming || chat.status === 'submitted',
    error: chat.error,
    stop: chat.stop,
    regenerate: () => {
      void chat.regenerate()
    },
  }
}
