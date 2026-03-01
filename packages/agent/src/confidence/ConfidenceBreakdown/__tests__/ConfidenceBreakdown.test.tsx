import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import * as vitestAxe from 'vitest-axe/matchers'
import type { ConfidenceBreakdown as ConfidenceBreakdownType } from '../../../types/agent'
import { ConfidenceBreakdown } from '../ConfidenceBreakdown'

expect.extend(vitestAxe)

const mockConfidence: ConfidenceBreakdownType = {
  overall: 'high',
  retrieval_quality: 0.9,
  source_authority: 0.8,
  answer_groundedness: 0.85,
  recency: 0.7,
  reasoning: 'Sources are authoritative and recent.',
}

describe('ConfidenceBreakdown', () => {
  it('renders ConfidenceBadge in collapsed state', () => {
    render(<ConfidenceBreakdown confidence={mockConfidence} />)
    expect(screen.getByText('High')).toBeDefined()
  })

  it('does not show dimension bars when collapsed', () => {
    render(<ConfidenceBreakdown confidence={mockConfidence} />)
    expect(screen.queryByTestId('confidence-breakdown-details')).toBeNull()
  })

  it('shows dimension bars when defaultExpanded', () => {
    render(<ConfidenceBreakdown confidence={mockConfidence} defaultExpanded />)
    expect(screen.getByTestId('confidence-breakdown-details')).toBeDefined()
    expect(screen.getByText('Retrieval Quality')).toBeDefined()
    expect(screen.getByText('Source Authority')).toBeDefined()
    expect(screen.getByText('Answer Groundedness')).toBeDefined()
    expect(screen.getByText('Recency')).toBeDefined()
  })

  it('expands on click', async () => {
    const user = userEvent.setup()
    render(<ConfidenceBreakdown confidence={mockConfidence} />)

    await user.click(screen.getByRole('button'))
    expect(screen.getByTestId('confidence-breakdown-details')).toBeDefined()
  })

  it('collapses on second click', async () => {
    const user = userEvent.setup()
    render(<ConfidenceBreakdown confidence={mockConfidence} />)

    await user.click(screen.getByRole('button'))
    expect(screen.getByTestId('confidence-breakdown-details')).toBeDefined()

    await user.click(screen.getByRole('button'))
    expect(screen.queryByTestId('confidence-breakdown-details')).toBeNull()
  })

  it('shows reasoning text when expanded', () => {
    render(<ConfidenceBreakdown confidence={mockConfidence} defaultExpanded />)
    expect(screen.getByText('Sources are authoritative and recent.')).toBeDefined()
  })

  it('renders 4 progress bars when expanded', () => {
    render(<ConfidenceBreakdown confidence={mockConfidence} defaultExpanded />)
    const bars = screen.getAllByRole('progressbar')
    expect(bars.length).toBe(4)
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <ConfidenceBreakdown confidence={mockConfidence} defaultExpanded />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
