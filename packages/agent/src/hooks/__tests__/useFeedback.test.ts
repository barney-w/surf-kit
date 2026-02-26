import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useFeedback } from '../useFeedback'

describe('useFeedback', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('starts in idle state', () => {
    const { result } = renderHook(() =>
      useFeedback({ url: 'https://api.test.com/feedback' }),
    )

    expect(result.current.state).toBe('idle')
    expect(result.current.error).toBeNull()
  })

  it('submits feedback successfully', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response('OK', { status: 200 }),
    )

    const { result } = renderHook(() =>
      useFeedback({ url: 'https://api.test.com/feedback' }),
    )

    await act(async () => {
      await result.current.submit('msg-1', 'positive', 'Great answer!')
    })

    expect(result.current.state).toBe('submitted')
    expect(globalThis.fetch).toHaveBeenCalledWith(
      'https://api.test.com/feedback',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          messageId: 'msg-1',
          rating: 'positive',
          comment: 'Great answer!',
        }),
      }),
    )
  })

  it('handles submission errors', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response('Error', { status: 500, statusText: 'Internal Server Error' }),
    )

    const { result } = renderHook(() =>
      useFeedback({ url: 'https://api.test.com/feedback' }),
    )

    await act(async () => {
      await result.current.submit('msg-1', 'negative')
    })

    expect(result.current.state).toBe('error')
    expect(result.current.error).not.toBeNull()
  })

  it('handles network errors', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Network error'))

    const { result } = renderHook(() =>
      useFeedback({ url: 'https://api.test.com/feedback' }),
    )

    await act(async () => {
      await result.current.submit('msg-1', 'positive')
    })

    expect(result.current.state).toBe('error')
    expect(result.current.error).toBe('Network error')
  })

  it('resets to idle state', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Network error'))

    const { result } = renderHook(() =>
      useFeedback({ url: 'https://api.test.com/feedback' }),
    )

    await act(async () => {
      await result.current.submit('msg-1', 'positive')
    })

    expect(result.current.state).toBe('error')

    act(() => {
      result.current.reset()
    })

    expect(result.current.state).toBe('idle')
    expect(result.current.error).toBeNull()
  })

  it('submits with optional comment omitted', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response('OK', { status: 200 }),
    )

    const { result } = renderHook(() =>
      useFeedback({ url: 'https://api.test.com/feedback' }),
    )

    await act(async () => {
      await result.current.submit('msg-1', 'negative')
    })

    expect(result.current.state).toBe('submitted')
  })
})
