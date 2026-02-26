import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import * as vitestAxe from 'vitest-axe/matchers'
import { axe } from 'vitest-axe'

import { VerificationDetail } from '../VerificationDetail'
import type { VerificationResult } from '../../../types/agent'

expect.extend(vitestAxe)

const mockVerification: VerificationResult = {
  status: 'flagged',
  flags: ['Claim about 5 weeks leave could not be verified', 'Source date is older than 12 months'],
  claims_checked: 8,
  claims_verified: 6,
}

describe('VerificationDetail', () => {
  it('renders VerificationBadge in collapsed state', () => {
    render(<VerificationDetail verification={mockVerification} />)
    expect(screen.getByText('Flagged')).toBeDefined()
  })

  it('does not show detail content when collapsed', () => {
    render(<VerificationDetail verification={mockVerification} />)
    expect(screen.queryByTestId('verification-detail-content')).toBeNull()
  })

  it('shows claims_checked and claims_verified when expanded', () => {
    render(<VerificationDetail verification={mockVerification} defaultExpanded />)
    expect(screen.getByText('8')).toBeDefined()
    expect(screen.getByText('6')).toBeDefined()
  })

  it('lists flags when expanded', () => {
    render(<VerificationDetail verification={mockVerification} defaultExpanded />)
    expect(screen.getByText('Claim about 5 weeks leave could not be verified')).toBeDefined()
    expect(screen.getByText('Source date is older than 12 months')).toBeDefined()
  })

  it('expands on click', async () => {
    const user = userEvent.setup()
    render(<VerificationDetail verification={mockVerification} />)

    await user.click(screen.getByRole('button'))
    expect(screen.getByTestId('verification-detail-content')).toBeDefined()
  })

  it('does not show flags list when no flags', () => {
    const noFlags: VerificationResult = {
      status: 'passed',
      flags: [],
      claims_checked: 5,
      claims_verified: 5,
    }
    render(<VerificationDetail verification={noFlags} defaultExpanded />)
    expect(screen.queryByTestId('verification-flags')).toBeNull()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <VerificationDetail verification={mockVerification} defaultExpanded />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
