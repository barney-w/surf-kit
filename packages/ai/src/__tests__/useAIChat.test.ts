import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useAIChat } from '../hooks/useAIChat'

// Mock @ai-sdk/react
const mockSendMessage = vi.fn()
const mockStop = vi.fn()
const mockRegenerate = vi.fn()
const mockSetMessages = vi.fn()

let mockStatus = 'ready'
let mockMessages: Array<{
  id: string
  role: string
  parts: Array<{ type: string; text: string }>
}> = []
let mockError: Error | undefined

vi.mock('@ai-sdk/react', () => ({
  useChat: vi.fn(() => ({
    messages: mockMessages,
    status: mockStatus,
    error: mockError,
    sendMessage: mockSendMessage,
    stop: mockStop,
    regenerate: mockRegenerate,
    setMessages: mockSetMessages,
  })),
}))

vi.mock('ai', () => ({
  DefaultChatTransport: class MockTransport {
    constructor(public opts?: unknown) {}
  },
}))

describe('useAIChat', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockStatus = 'ready'
    mockMessages = []
    mockError = undefined
  })

  it('returns empty messages and idle stream state initially', () => {
    const { result } = renderHook(() => useAIChat({ api: '/api/chat' }))

    expect(result.current.messages).toEqual([])
    expect(result.current.streamState).toEqual({
      active: false,
      phase: 'idle',
      content: '',
      sources: [],
      agent: null,
      agentLabel: null,
    })
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeUndefined()
  })

  it('converts AI SDK UIMessage parts to surf-kit ChatMessage content', () => {
    mockMessages = [
      { id: 'msg-1', role: 'user', parts: [{ type: 'text', text: 'Hello' }] },
      {
        id: 'msg-2',
        role: 'assistant',
        parts: [
          { type: 'text', text: 'Hi ' },
          { type: 'text', text: 'there!' },
        ],
      },
    ]

    const { result } = renderHook(() => useAIChat())

    expect(result.current.messages).toHaveLength(2)
    expect(result.current.messages[0]).toEqual(
      expect.objectContaining({
        id: 'msg-1',
        role: 'user',
        content: 'Hello',
      }),
    )
    expect(result.current.messages[1]).toEqual(
      expect.objectContaining({
        id: 'msg-2',
        role: 'assistant',
        content: 'Hi there!',
      }),
    )
  })

  it('provides a timestamp on each message', () => {
    mockMessages = [{ id: 'msg-1', role: 'user', parts: [{ type: 'text', text: 'Test' }] }]

    const { result } = renderHook(() => useAIChat())

    expect(result.current.messages[0].timestamp).toBeInstanceOf(Date)
  })

  it('maps streaming status to active stream state', () => {
    mockStatus = 'streaming'
    mockMessages = [
      { id: 'msg-1', role: 'user', parts: [{ type: 'text', text: 'Hello' }] },
      { id: 'msg-2', role: 'assistant', parts: [{ type: 'text', text: 'Partial response...' }] },
    ]

    const { result } = renderHook(() => useAIChat())

    expect(result.current.streamState).toEqual({
      active: true,
      phase: 'generating',
      content: 'Partial response...',
      sources: [],
      agent: null,
      agentLabel: null,
    })
    expect(result.current.isLoading).toBe(true)
  })

  it('reports isLoading for submitted status', () => {
    mockStatus = 'submitted'

    const { result } = renderHook(() => useAIChat())

    expect(result.current.isLoading).toBe(true)
    // streamState.active should only be true when actively streaming
    expect(result.current.streamState.active).toBe(false)
  })

  it('delegates sendMessage to chat.sendMessage with text', () => {
    const { result } = renderHook(() => useAIChat())

    act(() => {
      result.current.sendMessage('Test message')
    })

    expect(mockSendMessage).toHaveBeenCalledWith({ text: 'Test message' })
  })

  it('delegates stop to chat.stop', () => {
    const { result } = renderHook(() => useAIChat())

    act(() => {
      result.current.stop()
    })

    expect(mockStop).toHaveBeenCalled()
  })

  it('delegates regenerate to chat.regenerate', () => {
    const { result } = renderHook(() => useAIChat())

    act(() => {
      result.current.regenerate()
    })

    expect(mockRegenerate).toHaveBeenCalled()
  })

  it('exposes error from AI SDK', () => {
    mockError = new Error('Something went wrong')

    const { result } = renderHook(() => useAIChat())

    expect(result.current.error).toEqual(new Error('Something went wrong'))
  })

  it('returns empty content when streaming with no messages', () => {
    mockStatus = 'streaming'
    mockMessages = []

    const { result } = renderHook(() => useAIChat())

    expect(result.current.streamState.content).toBe('')
    expect(result.current.streamState.active).toBe(true)
  })

  it('filters non-text parts when extracting content', () => {
    mockMessages = [
      {
        id: 'msg-1',
        role: 'assistant',
        parts: [
          { type: 'text', text: 'Here is the result: ' },
          { type: 'reasoning', text: 'thinking...' },
          { type: 'text', text: 'done.' },
        ],
      },
    ]

    const { result } = renderHook(() => useAIChat())

    // Should only extract text parts, ignoring reasoning
    expect(result.current.messages[0].content).toBe('Here is the result: done.')
  })
})
