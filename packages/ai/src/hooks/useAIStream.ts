import { useCompletion } from '@ai-sdk/react'
import type { StreamState } from '@surf-kit/agent'
import type { UseAIStreamOptions, UseAIStreamReturn } from '../types'

/**
 * Adapter hook that wraps Vercel AI SDK v6's `useCompletion` for simple
 * text streaming (no chat history). Maps state to surf-kit `StreamState`.
 */
export function useAIStream(options: UseAIStreamOptions = {}): UseAIStreamReturn {
  const completion = useCompletion({
    api: options.api,
    onFinish: options.onFinish,
    onError: options.onError,
    headers: options.headers,
    body: options.body,
  })

  const streamState: StreamState = {
    active: completion.isLoading,
    phase: completion.isLoading ? 'generating' : 'idle',
    content: completion.completion,
    sources: [],
    agent: null,
    agentLabel: null,
  }

  return {
    streamState,
    completion: completion.completion,
    complete: (prompt: string) => {
      void completion.complete(prompt)
    },
    isLoading: completion.isLoading,
    error: completion.error,
    stop: completion.stop,
    input: completion.input,
    setInput: completion.setInput,
    handleSubmit: completion.handleSubmit,
  }
}
