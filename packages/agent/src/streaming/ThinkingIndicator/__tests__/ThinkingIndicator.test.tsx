import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import * as vitestAxe from 'vitest-axe/matchers'
import { axe } from 'vitest-axe'

import { ThinkingIndicator } from '../ThinkingIndicator'

expect.extend(vitestAxe)

// Mock useReducedMotion
vi.mock('@surf-kit/hooks', () => ({
  useReducedMotion: vi.fn(() => false),
}))

import { useReducedMotion } from '@surf-kit/hooks'
const mockUseReducedMotion = vi.mocked(useReducedMotion)

describe('ThinkingIndicator', () => {
  it('renders default label', () => {
    render(<ThinkingIndicator />)
    expect(screen.getByText('Thinking...')).toBeDefined()
  })

  it('renders custom label', () => {
    render(<ThinkingIndicator label="Processing..." />)
    expect(screen.getByText('Processing...')).toBeDefined()
  })

  it('has status role', () => {
    render(<ThinkingIndicator />)
    expect(screen.getByRole('status')).toBeDefined()
  })

  it('shows animated dots when motion is allowed', () => {
    mockUseReducedMotion.mockReturnValue(false)
    render(<ThinkingIndicator />)
    expect(screen.getByTestId('animated-dots')).toBeDefined()
  })

  it('hides animated dots when reduced motion is preferred', () => {
    mockUseReducedMotion.mockReturnValue(true)
    render(<ThinkingIndicator />)
    expect(screen.queryByTestId('animated-dots')).toBeNull()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<ThinkingIndicator />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
