import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'
import * as vitestAxe from 'vitest-axe/matchers'
import type { AgentResponse as AgentResponseType } from '../../../types/agent'
import { AgentResponse } from '../AgentResponse'

expect.extend(vitestAxe)

const mockResponse: AgentResponseType = {
  message: 'All full-time employees are entitled to **four weeks** of paid annual leave.',
  sources: [
    {
      title: 'Enterprise Agreement 2024',
      section: 'Section 12',
      document_id: 'ea-2024-001',
      url: 'https://example.com/ea',
      confidence: 0.95,
      snippet: 'Leave entitlements.',
    },
  ],
  confidence: {
    overall: 'high',
    retrieval_quality: 0.94,
    source_authority: 0.96,
    answer_groundedness: 0.91,
    recency: 0.88,
    reasoning: 'High confidence.',
  },
  verification: {
    status: 'passed',
    flags: [],
    claims_checked: 3,
    claims_verified: 3,
  },
  ui_hint: 'text',
  structured_data: null,
  follow_up_suggestions: ['How do I apply?', 'What about part-time?'],
}

describe('AgentResponse', () => {
  it('renders the response message', () => {
    render(<AgentResponse response={mockResponse} />)
    expect(screen.getByText(/four weeks/)).toBeDefined()
  })

  it('renders sources when showSources is true', () => {
    render(<AgentResponse response={mockResponse} showSources />)
    // Sources are collapsible and collapsed by default, but the toggle should show
    expect(screen.getByText('Sources (1)')).toBeDefined()
  })

  it('hides sources when showSources is false', () => {
    render(<AgentResponse response={mockResponse} showSources={false} />)
    expect(screen.queryByText('Sources (1)')).toBeNull()
  })

  it('renders confidence badge when showConfidence is true', () => {
    render(<AgentResponse response={mockResponse} showConfidence />)
    expect(screen.getByText('high confidence')).toBeDefined()
  })

  it('renders verification badge when showVerification is true', () => {
    render(<AgentResponse response={mockResponse} showVerification />)
    expect(screen.getByText('Verified (3/3)')).toBeDefined()
  })

  it('renders follow-up chips when onFollowUp is provided', () => {
    const onFollowUp = vi.fn()
    render(<AgentResponse response={mockResponse} onFollowUp={onFollowUp} />)
    expect(screen.getByText('How do I apply?')).toBeDefined()
    expect(screen.getByText('What about part-time?')).toBeDefined()
  })

  it('calls onFollowUp when chip is clicked', async () => {
    const user = userEvent.setup()
    const onFollowUp = vi.fn()
    render(<AgentResponse response={mockResponse} onFollowUp={onFollowUp} />)

    await user.click(screen.getByText('How do I apply?'))
    expect(onFollowUp).toHaveBeenCalledWith('How do I apply?')
  })

  it('does not render follow-up chips when onFollowUp is not provided', () => {
    render(<AgentResponse response={mockResponse} />)
    expect(screen.queryByTestId('follow-up-chips')).toBeNull()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <AgentResponse
        response={mockResponse}
        showConfidence
        showVerification
        onFollowUp={() => {}}
      />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
