import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useStreaming } from '../useStreaming'

function createMockSSEResponse(events: Array<{ type: string; [key: string]: unknown }>) {
  const lines = events.map((e) => `data: ${JSON.stringify(e)}`).join('\n') + '\n'
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

describe('useStreaming', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('returns initial idle state', () => {
    const { result } = renderHook(() =>
      useStreaming({ url: 'https://api.test.com/stream' }),
    )

    expect(result.current.state.active).toBe(false)
    expect(result.current.state.phase).toBe('idle')
    expect(result.current.state.content).toBe('')
    expect(result.current.state.sources).toEqual([])
    expect(result.current.state.agent).toBeNull()
  })

  it('accumulates content from delta events', async () => {
    const mockResponse = createMockSSEResponse([
      { type: 'phase', phase: 'generating' },
      { type: 'delta', content: 'Hello ' },
      { type: 'delta', content: 'world!' },
      {
        type: 'done',
        response: {
          message: 'Hello world!',
          sources: [],
          confidence: { overall: 'high', retrieval_quality: 0.9, source_authority: 0.9, answer_groundedness: 0.9, recency: 0.9, reasoning: '' },
          verification: { status: 'passed', flags: [], claims_checked: 0, claims_verified: 0 },
          ui_hint: 'text',
          structured_data: null,
          follow_up_suggestions: [],
        },
      },
    ])

    const onDone = vi.fn()
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(mockResponse)

    const { result } = renderHook(() =>
      useStreaming({ url: 'https://api.test.com/stream', onDone }),
    )

    await act(async () => {
      await result.current.start({ message: 'hi' })
    })

    expect(result.current.state.content).toBe('Hello world!')
    expect(onDone).toHaveBeenCalledTimes(1)
    expect(result.current.state.active).toBe(false)
    expect(result.current.state.phase).toBe('idle')
  })

  it('tracks sources', async () => {
    const mockSource = {
      title: 'Test Doc',
      document_id: 'doc-1',
      url: 'https://example.com',
      confidence: 0.95,
      snippet: 'test snippet',
    }

    const mockResponse = createMockSSEResponse([
      { type: 'source', source: mockSource },
      {
        type: 'done',
        response: {
          message: 'done',
          sources: [mockSource],
          confidence: { overall: 'high', retrieval_quality: 0.9, source_authority: 0.9, answer_groundedness: 0.9, recency: 0.9, reasoning: '' },
          verification: { status: 'passed', flags: [], claims_checked: 0, claims_verified: 0 },
          ui_hint: 'text',
          structured_data: null,
          follow_up_suggestions: [],
        },
      },
    ])

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(mockResponse)

    const { result } = renderHook(() =>
      useStreaming({ url: 'https://api.test.com/stream' }),
    )

    await act(async () => {
      await result.current.start({ message: 'hi' })
    })

    expect(result.current.state.sources).toHaveLength(1)
    expect(result.current.state.sources[0].title).toBe('Test Doc')
  })

  it('handles HTTP errors', async () => {
    const onError = vi.fn()
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response('Server Error', { status: 500, statusText: 'Internal Server Error' }),
    )

    const { result } = renderHook(() =>
      useStreaming({ url: 'https://api.test.com/stream', onError }),
    )

    await act(async () => {
      await result.current.start({ message: 'hi' })
    })

    expect(onError).toHaveBeenCalledTimes(1)
    expect(result.current.state.active).toBe(false)
  })

  it('handles network errors', async () => {
    const onError = vi.fn()
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Network down'))

    const { result } = renderHook(() =>
      useStreaming({ url: 'https://api.test.com/stream', onError }),
    )

    await act(async () => {
      await result.current.start({ message: 'hi' })
    })

    expect(onError).toHaveBeenCalledTimes(1)
    expect(result.current.state.active).toBe(false)
  })

  it('tracks agent from agent events', async () => {
    const mockResponse = createMockSSEResponse([
      { type: 'agent', agent: 'research-agent' },
      {
        type: 'done',
        response: {
          message: 'done',
          sources: [],
          confidence: { overall: 'high', retrieval_quality: 0.9, source_authority: 0.9, answer_groundedness: 0.9, recency: 0.9, reasoning: '' },
          verification: { status: 'passed', flags: [], claims_checked: 0, claims_verified: 0 },
          ui_hint: 'text',
          structured_data: null,
          follow_up_suggestions: [],
        },
      },
    ])

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(mockResponse)

    const { result } = renderHook(() =>
      useStreaming({ url: 'https://api.test.com/stream' }),
    )

    await act(async () => {
      await result.current.start({ message: 'hi' })
    })

    expect(result.current.state.agent).toBe('research-agent')
  })
})
