import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'
import * as vitestAxe from 'vitest-axe/matchers'

import { TextGlimmer } from '../TextGlimmer'

expect.extend(vitestAxe)

// Mock useReducedMotion
vi.mock('@surf-kit/hooks', () => ({
  useReducedMotion: vi.fn(() => false),
}))

import { useReducedMotion } from '@surf-kit/hooks'

const mockUseReducedMotion = vi.mocked(useReducedMotion)

describe('TextGlimmer', () => {
  it('renders correct number of lines (default 3)', () => {
    render(<TextGlimmer />)
    const lines = screen.getAllByTestId('glimmer-line')
    expect(lines).toHaveLength(3)
  })

  it('renders custom line count', () => {
    render(<TextGlimmer lines={5} />)
    const lines = screen.getAllByTestId('glimmer-line')
    expect(lines).toHaveLength(5)
  })

  it('has role="status"', () => {
    render(<TextGlimmer />)
    expect(screen.getByRole('status')).toBeDefined()
  })

  it('has aria-label="Loading"', () => {
    render(<TextGlimmer />)
    const el = screen.getByRole('status')
    expect(el.getAttribute('aria-label')).toBe('Loading')
  })

  it('merges className', () => {
    render(<TextGlimmer className="my-custom-class" />)
    const el = screen.getByTestId('text-glimmer')
    expect(el.className).toContain('my-custom-class')
  })

  it('does not animate when reduced motion is preferred', () => {
    mockUseReducedMotion.mockReturnValue(true)
    render(<TextGlimmer />)
    const lines = screen.getAllByTestId('glimmer-line')
    expect((lines[0] as HTMLElement).style.animation).toBe('')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<TextGlimmer />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
