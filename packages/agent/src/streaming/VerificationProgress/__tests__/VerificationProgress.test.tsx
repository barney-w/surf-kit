import { render, screen } from '@testing-library/react'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'
import * as vitestAxe from 'vitest-axe/matchers'

import { VerificationProgress } from '../VerificationProgress'

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

describe('VerificationProgress', () => {
  it('renders default label when active', () => {
    render(<VerificationProgress isActive />)
    expect(screen.getByText('Checking accuracy...')).toBeDefined()
  })

  it('renders custom label', () => {
    render(<VerificationProgress isActive label="Verifying claims..." />)
    expect(screen.getByText('Verifying claims...')).toBeDefined()
  })

  it('renders nothing when inactive', () => {
    render(<VerificationProgress isActive={false} />)
    expect(screen.queryByTestId('verification-progress')).toBeNull()
  })

  it('has status role', () => {
    render(<VerificationProgress isActive />)
    expect(screen.getByTestId('verification-progress').getAttribute('role')).toBe('status')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<VerificationProgress isActive />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
