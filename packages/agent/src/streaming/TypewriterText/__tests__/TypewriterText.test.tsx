import { render } from '@testing-library/react'
import { act } from 'react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import * as vitestAxe from 'vitest-axe/matchers'
import { axe } from 'vitest-axe'

expect.extend(vitestAxe)

import { TypewriterText } from '../TypewriterText'

afterEach(() => {
  vi.useRealTimers()
})

describe('TypewriterText', () => {
  it('renders text progressively over time', () => {
    vi.useFakeTimers()

    const { container } = render(<TypewriterText text="Hey" speed={50} />)

    const root = container.firstElementChild as HTMLElement
    expect(root.textContent).toBe('')

    act(() => {
      vi.advanceTimersByTime(50)
    })
    expect(root.textContent).toContain('H')

    act(() => {
      vi.advanceTimersByTime(50)
    })
    expect(root.textContent).toContain('He')

    act(() => {
      vi.advanceTimersByTime(50)
    })
    expect(root.textContent).toContain('Hey')
  })

  it('calls onComplete when animation finishes', () => {
    vi.useFakeTimers()
    const onComplete = vi.fn()

    render(<TypewriterText text="OK" speed={30} onComplete={onComplete} />)

    act(() => {
      vi.advanceTimersByTime(90)
    })

    expect(onComplete).toHaveBeenCalledTimes(1)
  })

  it('hides cursor when showCursor is false', () => {
    render(<TypewriterText text="Hello" showCursor={false} />)

    const cursor = document.querySelector('.typewriter-cursor')
    expect(cursor).toBeNull()
  })

  it('hides cursor after completion', () => {
    vi.useFakeTimers()

    render(<TypewriterText text="Hi" speed={20} />)

    expect(document.querySelector('.typewriter-cursor')).not.toBeNull()

    act(() => {
      vi.advanceTimersByTime(80)
    })

    expect(document.querySelector('.typewriter-cursor')).toBeNull()
  })

  it('passes vitest-axe accessibility audit', async () => {
    const { container } = render(<TypewriterText text="Accessible" showCursor={false} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
