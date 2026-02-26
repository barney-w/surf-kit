import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import * as vitestAxe from 'vitest-axe/matchers'
import { axe } from 'vitest-axe'

import { ConfidenceBadge } from '../ConfidenceBadge'
import type { ConfidenceBreakdown } from '../../../types/agent'

expect.extend(vitestAxe)

const makeConfidence = (overall: ConfidenceBreakdown['overall']): ConfidenceBreakdown => ({
  overall,
  retrieval_quality: 0.9,
  source_authority: 0.8,
  answer_groundedness: 0.85,
  recency: 0.7,
  reasoning: 'Test reasoning',
})

describe('ConfidenceBadge', () => {
  it('renders High for high confidence', () => {
    render(<ConfidenceBadge confidence={makeConfidence('high')} />)
    expect(screen.getByText('High')).toBeDefined()
  })

  it('renders Medium for medium confidence', () => {
    render(<ConfidenceBadge confidence={makeConfidence('medium')} />)
    expect(screen.getByText('Medium')).toBeDefined()
  })

  it('renders Low for low confidence', () => {
    render(<ConfidenceBadge confidence={makeConfidence('low')} />)
    expect(screen.getByText('Low')).toBeDefined()
  })

  it('has role="status"', () => {
    render(<ConfidenceBadge confidence={makeConfidence('high')} />)
    expect(screen.getByRole('status')).toBeDefined()
  })

  it('has descriptive aria-label for high', () => {
    render(<ConfidenceBadge confidence={makeConfidence('high')} />)
    expect(screen.getByRole('status').getAttribute('aria-label')).toBe('High confidence')
  })

  it('has descriptive aria-label for medium', () => {
    render(<ConfidenceBadge confidence={makeConfidence('medium')} />)
    expect(screen.getByRole('status').getAttribute('aria-label')).toBe('Medium confidence')
  })

  it('has descriptive aria-label for low', () => {
    render(<ConfidenceBadge confidence={makeConfidence('low')} />)
    expect(screen.getByRole('status').getAttribute('aria-label')).toBe('Low confidence')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <ConfidenceBadge confidence={makeConfidence('high')} />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
