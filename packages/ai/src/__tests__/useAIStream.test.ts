import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useAIStream } from '../hooks/useAIStream'

// Mock @ai-sdk/react
const mockComplete = vi.fn()
const mockStop = vi.fn()
const mockSetInput = vi.fn()
const mockHandleSubmit = vi.fn()

let mockIsLoading = false
let mockCompletion = ''
let mockInput = ''
let mockError: Error | undefined

vi.mock('@ai-sdk/react', () => ({
  useCompletion: vi.fn(() => ({
    completion: mockCompletion,
    isLoading: mockIsLoading,
    error: mockError,
    input: mockInput,
    complete: mockComplete,
    stop: mockStop,
    setInput: mockSetInput,
    handleSubmit: mockHandleSubmit,
  })),
}))

describe('useAIStream', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockIsLoading = false
    mockCompletion = ''
    mockInput = ''
    mockError = undefined
  })

  it('returns idle stream state initially', () => {
    const { result } = renderHook(() => useAIStream({ api: '/api/complete' }))

    expect(result.current.streamState).toEqual({
      active: false,
      phase: 'idle',
      content: '',
      sources: [],
      agent: null,
      agentLabel: null,
    })
    expect(result.current.isLoading).toBe(false)
    expect(result.current.completion).toBe('')
  })

  it('maps loading status to active stream state', () => {
    mockIsLoading = true
    mockCompletion = 'Partial text...'

    const { result } = renderHook(() => useAIStream())

    expect(result.current.streamState).toEqual({
      active: true,
      phase: 'generating',
      content: 'Partial text...',
      sources: [],
      agent: null,
      agentLabel: null,
    })
    expect(result.current.isLoading).toBe(true)
  })

  it('delegates complete to completion.complete', () => {
    const { result } = renderHook(() => useAIStream())

    act(() => {
      result.current.complete('Write a poem')
    })

    expect(mockComplete).toHaveBeenCalledWith('Write a poem')
  })

  it('delegates stop to completion.stop', () => {
    const { result } = renderHook(() => useAIStream())

    act(() => {
      result.current.stop()
    })

    expect(mockStop).toHaveBeenCalled()
  })

  it('exposes error from AI SDK', () => {
    mockError = new Error('Stream failed')

    const { result } = renderHook(() => useAIStream())

    expect(result.current.error).toEqual(new Error('Stream failed'))
  })

  it('exposes input and setInput', () => {
    mockInput = 'current prompt'

    const { result } = renderHook(() => useAIStream())

    expect(result.current.input).toBe('current prompt')
    expect(result.current.setInput).toBe(mockSetInput)
  })

  it('exposes handleSubmit', () => {
    const { result } = renderHook(() => useAIStream())

    expect(result.current.handleSubmit).toBe(mockHandleSubmit)
  })
})
