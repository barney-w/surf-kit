import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useCharacterDrain } from '../useCharacterDrain'

// jsdom's requestAnimationFrame fires immediately but without realistic timestamps.
// We fake timers so we can control RAF timing precisely.

describe('useCharacterDrain', () => {
  let rafCallbacks: Array<(now: number) => void>
  let now: number

  beforeEach(() => {
    rafCallbacks = []
    now = 1000 // start at 1 second to avoid 0-timestamp edge cases

    vi.spyOn(globalThis, 'requestAnimationFrame').mockImplementation((cb) => {
      rafCallbacks.push(cb)
      return rafCallbacks.length // fake handle
    })
    vi.spyOn(globalThis, 'cancelAnimationFrame').mockImplementation(() => {
      // In tests we don't need real cancellation — just let callbacks run naturally
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  function flush(deltaMs = 16) {
    // Run all currently-queued RAF callbacks with a realistic timestamp,
    // then advance the clock by deltaMs for the next batch.
    const batch = rafCallbacks.splice(0)
    now += deltaMs
    batch.forEach((cb) => {
      cb(now)
    })
  }

  it('starts empty and drains one character per msPerChar', () => {
    const { result, rerender } = renderHook(({ target }) => useCharacterDrain(target, 16), {
      initialProps: { target: 'ABC' },
    })

    expect(result.current.displayed).toBe('')
    expect(result.current.isDraining).toBe(true)

    // First frame: lastTimeRef initialised to now, elapsed = 0, no chars
    act(() => {
      flush(0)
    })
    expect(result.current.displayed).toBe('')

    // Second frame: elapsed = 16ms → 1 char
    act(() => {
      flush(16)
    })
    expect(result.current.displayed).toBe('A')

    act(() => {
      flush(16)
    })
    expect(result.current.displayed).toBe('AB')

    act(() => {
      flush(16)
    })
    expect(result.current.displayed).toBe('ABC')
    expect(result.current.isDraining).toBe(false)

    // No more callbacks scheduled
    expect(rafCallbacks.length).toBe(0)

    rerender({ target: 'ABC' }) // same target, no change
    expect(result.current.displayed).toBe('ABC')
  })

  it('advances multiple chars when elapsed > msPerChar', () => {
    const { result } = renderHook(() => useCharacterDrain('HELLO', 10))

    act(() => {
      flush(0)
    }) // init
    act(() => {
      flush(30)
    }) // 30ms / 10ms = 3 chars

    expect(result.current.displayed).toBe('HEL')
  })

  it('does not advance more chars than the target length', () => {
    const { result } = renderHook(() => useCharacterDrain('Hi', 10))

    act(() => {
      flush(0)
    })
    act(() => {
      flush(9999)
    }) // enormous elapsed — should clamp to 'Hi'

    expect(result.current.displayed).toBe('Hi')
    expect(result.current.isDraining).toBe(false)
  })

  it('continues draining when target grows mid-stream (no stutter)', () => {
    const { result, rerender } = renderHook(({ target }) => useCharacterDrain(target, 16), {
      initialProps: { target: 'AB' },
    })

    act(() => {
      flush(0)
    })
    act(() => {
      flush(16)
    }) // 'A'
    expect(result.current.displayed).toBe('A')

    // New delta — target grows without the loop being cancelled/restarted
    rerender({ target: 'ABCD' })

    act(() => {
      flush(16)
    }) // 'AB'
    expect(result.current.displayed).toBe('AB')
    act(() => {
      flush(16)
    }) // 'ABC'
    expect(result.current.displayed).toBe('ABC')
    act(() => {
      flush(16)
    }) // 'ABCD'
    expect(result.current.displayed).toBe('ABCD')
    expect(result.current.isDraining).toBe(false)
  })

  it('keeps draining when target resets to empty (post-stream drain)', () => {
    const { result, rerender } = renderHook(({ target }) => useCharacterDrain(target, 16), {
      initialProps: { target: 'ABC' },
    })

    act(() => {
      flush(0)
    })
    act(() => {
      flush(16)
    }) // 'A'

    // Stream finishes — target resets to ''
    rerender({ target: '' })

    // drainTargetRef still holds 'ABC', so drain continues
    expect(result.current.isDraining).toBe(true)
    expect(result.current.displayed).toBe('A')

    act(() => {
      flush(16)
    }) // 'AB'
    expect(result.current.displayed).toBe('AB')
    expect(result.current.isDraining).toBe(true)

    // Final frame: drain reaches 'ABC', but since target is already '' the reset
    // effect fires in the same React batch — displayed immediately clears to ''
    act(() => {
      flush(16)
    })
    expect(result.current.isDraining).toBe(false)
    expect(result.current.displayed).toBe('') // reset fired synchronously
  })

  it('resets displayed to empty when drain completes after target cleared', () => {
    const { result, rerender } = renderHook(({ target }) => useCharacterDrain(target, 16), {
      initialProps: { target: 'AB' },
    })

    act(() => {
      flush(0)
    })
    act(() => {
      flush(9999)
    }) // drain fully in one big frame

    // target is still 'AB', so reset effect hasn't fired yet
    expect(result.current.displayed).toBe('AB')
    expect(result.current.isDraining).toBe(false)

    // Simulate stream finishing — target clears
    rerender({ target: '' })

    // target === '' && !isDraining && displayed !== '' → reset fires
    act(() => {})
    expect(result.current.displayed).toBe('')
  })

  it('isDraining is true while displayed < drainTarget, false when caught up', () => {
    const { result } = renderHook(() => useCharacterDrain('XY', 16))

    expect(result.current.isDraining).toBe(true)

    act(() => {
      flush(0)
    })
    act(() => {
      flush(16)
    }) // 'X'
    expect(result.current.isDraining).toBe(true)

    act(() => {
      flush(16)
    }) // 'XY'
    expect(result.current.isDraining).toBe(false)
  })
})
