import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { AgentChatConfig } from '../../types/config'
import { useAgentChat } from '../useAgentChat'

function createMockSSEResponse(events: Array<{ type: string; [key: string]: unknown }>) {
  const lines = `${events.map((e) => `data: ${JSON.stringify(e)}`).join('\n')}\n`
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(lines))
      controller.close()
    },
  })
  return new Response(stream, {
    status: 200,
    headers: { 'Content-Type': 'text/event-stream' },
  })
}

const defaultConfig: AgentChatConfig = {
  apiUrl: 'https://api.test.com',
}

describe('useAgentChat', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('returns initial state', () => {
    const { result } = renderHook(() => useAgentChat(defaultConfig))

    expect(result.current.state.messages).toEqual([])
    expect(result.current.state.conversationId).toBeNull()
    expect(result.current.state.isLoading).toBe(false)
    expect(result.current.state.error).toBeNull()
    expect(result.current.state.inputValue).toBe('')
    expect(result.current.state.streamPhase).toBe('idle')
  })

  it('exposes all required actions', () => {
    const { result } = renderHook(() => useAgentChat(defaultConfig))

    expect(typeof result.current.actions.sendMessage).toBe('function')
    expect(typeof result.current.actions.loadConversation).toBe('function')
    expect(typeof result.current.actions.submitFeedback).toBe('function')
    expect(typeof result.current.actions.retry).toBe('function')
    expect(typeof result.current.actions.reset).toBe('function')
  })

  it('sets input value', () => {
    const { result } = renderHook(() => useAgentChat(defaultConfig))

    act(() => {
      result.current.actions.setInputValue('hello')
    })

    expect(result.current.state.inputValue).toBe('hello')
  })

  it('sends a message and processes SSE response', async () => {
    const mockResponse = createMockSSEResponse([
      { type: 'phase', phase: 'generating' },
      { type: 'delta', content: 'Hello ' },
      { type: 'delta', content: 'world' },
      {
        type: 'done',
        response: {
          message: 'Hello world',
          sources: [],
          confidence: {
            overall: 'high',
            retrieval_quality: 0.9,
            source_authority: 0.9,
            answer_groundedness: 0.9,
            recency: 0.9,
            reasoning: 'test',
          },
          verification: { status: 'passed', flags: [], claims_checked: 1, claims_verified: 1 },
          ui_hint: 'text',
          structured_data: null,
          follow_up_suggestions: [],
        },
      },
    ])

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(mockResponse)

    const { result } = renderHook(() => useAgentChat(defaultConfig))

    await act(async () => {
      await result.current.actions.sendMessage('Hi')
    })

    expect(result.current.state.messages).toHaveLength(2)
    expect(result.current.state.messages[0].role).toBe('user')
    expect(result.current.state.messages[0].content).toBe('Hi')
    expect(result.current.state.messages[1].role).toBe('assistant')
    expect(result.current.state.messages[1].content).toBe('Hello world')
    expect(result.current.state.isLoading).toBe(false)
    expect(result.current.state.streamPhase).toBe('idle')
  })

  it('handles API errors', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response('Internal Server Error', { status: 500, statusText: 'Internal Server Error' }),
    )

    const { result } = renderHook(() => useAgentChat(defaultConfig))

    await act(async () => {
      await result.current.actions.sendMessage('Hi')
    })

    expect(result.current.state.error).not.toBeNull()
    expect(result.current.state.error?.code).toBe('API_ERROR')
    expect(result.current.state.error?.retryable).toBe(true)
    expect(result.current.state.isLoading).toBe(false)
  })

  it('handles network errors', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Network failure'))

    const { result } = renderHook(() => useAgentChat(defaultConfig))

    await act(async () => {
      await result.current.actions.sendMessage('Hi')
    })

    expect(result.current.state.error).not.toBeNull()
    expect(result.current.state.error?.code).toBe('NETWORK_ERROR')
  })

  it('loads a conversation', () => {
    const { result } = renderHook(() => useAgentChat(defaultConfig))

    const messages = [
      { id: 'msg-1', role: 'user' as const, content: 'Hi', timestamp: new Date() },
      { id: 'msg-2', role: 'assistant' as const, content: 'Hello', timestamp: new Date() },
    ]

    act(() => {
      result.current.actions.loadConversation('conv-1', messages)
    })

    expect(result.current.state.conversationId).toBe('conv-1')
    expect(result.current.state.messages).toHaveLength(2)
  })

  it('resets state', async () => {
    const mockResponse = createMockSSEResponse([
      {
        type: 'done',
        response: {
          message: 'Hi',
          sources: [],
          confidence: {
            overall: 'high',
            retrieval_quality: 0.9,
            source_authority: 0.9,
            answer_groundedness: 0.9,
            recency: 0.9,
            reasoning: '',
          },
          verification: { status: 'passed', flags: [], claims_checked: 0, claims_verified: 0 },
          ui_hint: 'text',
          structured_data: null,
          follow_up_suggestions: [],
        },
      },
    ])

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(mockResponse)

    const { result } = renderHook(() => useAgentChat(defaultConfig))

    await act(async () => {
      await result.current.actions.sendMessage('Hi')
    })

    expect(result.current.state.messages.length).toBeGreaterThan(0)

    act(() => {
      result.current.actions.reset()
    })

    expect(result.current.state.messages).toEqual([])
    expect(result.current.state.conversationId).toBeNull()
    expect(result.current.state.isLoading).toBe(false)
  })

  it('retries the last message', async () => {
    const mockResponse1 = createMockSSEResponse([
      {
        type: 'done',
        response: {
          message: 'First',
          sources: [],
          confidence: {
            overall: 'high',
            retrieval_quality: 0.9,
            source_authority: 0.9,
            answer_groundedness: 0.9,
            recency: 0.9,
            reasoning: '',
          },
          verification: { status: 'passed', flags: [], claims_checked: 0, claims_verified: 0 },
          ui_hint: 'text',
          structured_data: null,
          follow_up_suggestions: [],
        },
      },
    ])
    const mockResponse2 = createMockSSEResponse([
      {
        type: 'done',
        response: {
          message: 'Retry',
          sources: [],
          confidence: {
            overall: 'high',
            retrieval_quality: 0.9,
            source_authority: 0.9,
            answer_groundedness: 0.9,
            recency: 0.9,
            reasoning: '',
          },
          verification: { status: 'passed', flags: [], claims_checked: 0, claims_verified: 0 },
          ui_hint: 'text',
          structured_data: null,
          follow_up_suggestions: [],
        },
      },
    ])

    vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(mockResponse1)
      .mockResolvedValueOnce(mockResponse2)

    const { result } = renderHook(() => useAgentChat(defaultConfig))

    await act(async () => {
      await result.current.actions.sendMessage('Hello')
    })

    await act(async () => {
      await result.current.actions.retry()
    })

    // Should have 4 messages: user, assistant, user (retry), assistant (retry)
    expect(result.current.state.messages).toHaveLength(4)
  })
})
