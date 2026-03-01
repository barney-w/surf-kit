import { render, screen } from '@testing-library/react'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'
import * as vitestAxe from 'vitest-axe/matchers'
import type { StreamState } from '../../../types/streaming'
import { StreamingMessage } from '../StreamingMessage'

// Mock useCharacterDrain to pass through the target string directly in tests,
// since requestAnimationFrame doesn't behave the same in jsdom.
vi.mock('../../../hooks/useCharacterDrain', () => ({
  useCharacterDrain: (target: string) => ({ displayed: target, isDraining: false }),
}))

expect.extend(vitestAxe)

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
})

const _idleStream: StreamState = {
  active: false,
  phase: 'idle',
  content: '',
  sources: [],
  agent: null,
  agentLabel: null,
}

const thinkingStream: StreamState = {
  active: true,
  phase: 'thinking',
  content: '',
  sources: [],
  agent: null,
  agentLabel: null,
}

const generatingStream: StreamState = {
  active: true,
  phase: 'generating',
  content: 'Here is the answer so far...',
  sources: [],
  agent: null,
  agentLabel: null,
}

const completedStream: StreamState = {
  active: false,
  phase: 'idle',
  content: 'Here is the complete answer.',
  sources: [],
  agent: null,
  agentLabel: null,
}

describe('StreamingMessage', () => {
  it('renders content from stream', () => {
    render(<StreamingMessage stream={generatingStream} />)
    expect(screen.getByText('Here is the answer so far...')).toBeDefined()
  })

  it('shows pulsing cursor when active', () => {
    render(<StreamingMessage stream={generatingStream} />)
    expect(screen.getByTestId('streaming-cursor')).toBeDefined()
  })

  it('hides cursor when not active', () => {
    render(<StreamingMessage stream={completedStream} />)
    expect(screen.queryByTestId('streaming-cursor')).toBeNull()
  })

  it('shows phase indicator when showPhases is true', () => {
    render(<StreamingMessage stream={thinkingStream} showPhases />)
    expect(screen.getByTestId('phase-indicator')).toBeDefined()
    expect(screen.getByText('Thinking...')).toBeDefined()
  })

  it('shows Writing phase label during generating', () => {
    render(<StreamingMessage stream={generatingStream} showPhases />)
    expect(screen.getByText('Writing...')).toBeDefined()
  })

  it('hides phase indicator when showPhases is false', () => {
    render(<StreamingMessage stream={thinkingStream} showPhases={false} />)
    expect(screen.queryByTestId('phase-indicator')).toBeNull()
  })

  it('calls onComplete when stream transitions from active to inactive', () => {
    const onComplete = vi.fn()
    const { rerender } = render(
      <StreamingMessage stream={generatingStream} onComplete={onComplete} />,
    )
    expect(onComplete).not.toHaveBeenCalled()

    rerender(<StreamingMessage stream={completedStream} onComplete={onComplete} />)
    expect(onComplete).toHaveBeenCalledOnce()
  })

  it('announces streaming start to screen readers', () => {
    render(<StreamingMessage stream={thinkingStream} />)
    const liveRegion = screen.getByText('Response started')
    expect(liveRegion).toBeDefined()
    // The text is inside the aria-live div, so check closest ancestor with aria-live
    const ariaLiveEl = liveRegion.closest('[aria-live]')
    expect(ariaLiveEl?.getAttribute('aria-live')).toBe('assertive')
  })

  it('announces streaming complete to screen readers', () => {
    render(<StreamingMessage stream={completedStream} />)
    const liveRegion = screen.getByText('Response complete')
    expect(liveRegion).toBeDefined()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<StreamingMessage stream={generatingStream} showPhases />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
