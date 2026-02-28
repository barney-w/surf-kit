import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import * as vitestAxe from 'vitest-axe/matchers'
import { axe } from 'vitest-axe'

import { TypingIndicator } from '../TypingIndicator'

expect.extend(vitestAxe)

// Mock useReducedMotion
vi.mock('@surf-kit/hooks', () => ({
  useReducedMotion: vi.fn(() => false),
}))

import { useReducedMotion } from '@surf-kit/hooks'
const mockUseReducedMotion = vi.mocked(useReducedMotion)

describe('TypingIndicator', () => {
  it('renders correct number of dots (default 3)', () => {
    render(<TypingIndicator />)
    const dots = screen.getByTestId('typing-dots')
    expect(dots.children).toHaveLength(3)
  })

  it('renders custom dotCount', () => {
    render(<TypingIndicator dotCount={5} />)
    const dots = screen.getByTestId('typing-dots')
    expect(dots.children).toHaveLength(5)
  })

  it('renders with label text', () => {
    render(<TypingIndicator label="Agent is typing" />)
    expect(screen.getByText('Agent is typing')).toBeDefined()
  })

  it('has aria-label attribute', () => {
    render(<TypingIndicator />)
    const el = screen.getByRole('status')
    expect(el.getAttribute('aria-label')).toBe('typing')
  })

  it('uses custom label as aria-label', () => {
    render(<TypingIndicator label="Agent is typing" />)
    const el = screen.getByRole('status')
    expect(el.getAttribute('aria-label')).toBe('Agent is typing')
  })

  it('merges className', () => {
    render(<TypingIndicator className="my-custom-class" />)
    const el = screen.getByTestId('typing-indicator')
    expect(el.className).toContain('my-custom-class')
  })

  it('does not animate when reduced motion is preferred', () => {
    mockUseReducedMotion.mockReturnValue(true)
    render(<TypingIndicator />)
    const dots = screen.getByTestId('typing-dots')
    const firstDot = dots.children[0] as HTMLElement
    expect(firstDot.style.animation).toBe('')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<TypingIndicator />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
