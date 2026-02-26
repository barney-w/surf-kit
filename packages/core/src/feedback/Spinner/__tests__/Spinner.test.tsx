import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('@surf-kit/hooks', () => ({
  useReducedMotion: () => false,
}))

import { Spinner } from '../Spinner'

describe('Spinner', () => {
  it('renders without crashing', () => {
    render(<Spinner />)
    expect(screen.getByRole('status')).toBeDefined()
  })

  it('has accessible label', () => {
    render(<Spinner label="Loading data" />)
    expect(screen.getByText('Loading data')).toBeDefined()
  })

  it('renders default label', () => {
    render(<Spinner />)
    expect(screen.getByText('Loading')).toBeDefined()
  })

  it('applies className prop', () => {
    render(<Spinner className="custom" />)
    expect(screen.getByRole('status').className).toContain('custom')
  })

  it('renders all size variants', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const size of sizes) {
      const { unmount } = render(<Spinner size={size} />)
      expect(screen.getByRole('status')).toBeDefined()
      unmount()
    }
  })
})
