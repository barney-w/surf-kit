import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import * as vitestAxe from 'vitest-axe/matchers'
import type { VerificationResult } from '../../../types/agent'
import { VerificationBadge } from '../VerificationBadge'

expect.extend(vitestAxe)

const makeVerification = (status: VerificationResult['status']): VerificationResult => ({
  status,
  flags: [],
  claims_checked: 5,
  claims_verified: status === 'passed' ? 5 : 3,
})

describe('VerificationBadge', () => {
  it('renders Verified for passed status', () => {
    render(<VerificationBadge verification={makeVerification('passed')} />)
    expect(screen.getByText('Verified')).toBeDefined()
  })

  it('renders Flagged for flagged status', () => {
    render(<VerificationBadge verification={makeVerification('flagged')} />)
    expect(screen.getByText('Flagged')).toBeDefined()
  })

  it('renders Failed for failed status', () => {
    render(<VerificationBadge verification={makeVerification('failed')} />)
    expect(screen.getByText('Failed')).toBeDefined()
  })

  it('has role="status"', () => {
    render(<VerificationBadge verification={makeVerification('passed')} />)
    expect(screen.getByRole('status')).toBeDefined()
  })

  it('has correct aria-label for passed', () => {
    render(<VerificationBadge verification={makeVerification('passed')} />)
    expect(screen.getByRole('status').getAttribute('aria-label')).toBe('Verification passed')
  })

  it('has correct aria-label for flagged', () => {
    render(<VerificationBadge verification={makeVerification('flagged')} />)
    expect(screen.getByRole('status').getAttribute('aria-label')).toBe('Verification flagged')
  })

  it('has correct aria-label for failed', () => {
    render(<VerificationBadge verification={makeVerification('failed')} />)
    expect(screen.getByRole('status').getAttribute('aria-label')).toBe('Verification failed')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<VerificationBadge verification={makeVerification('passed')} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
