import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import * as vitestAxe from 'vitest-axe/matchers'
import { axe } from 'vitest-axe'

import { SourceList } from '../SourceList'
import type { Source } from '../../../types/agent'

expect.extend(vitestAxe)

const mockSources: Source[] = [
  {
    title: 'Enterprise Agreement 2024',
    section: 'Section 12',
    document_id: 'ea-2024-001',
    url: 'https://example.com/ea',
    confidence: 0.95,
    snippet: 'Leave entitlements.',
  },
  {
    title: 'HR Policy Manual',
    section: 'Chapter 5',
    document_id: 'hr-policy-005',
    url: 'https://example.com/hr',
    confidence: 0.88,
    snippet: 'Leave management.',
  },
]

describe('SourceList', () => {
  it('renders a list of source cards', () => {
    render(<SourceList sources={mockSources} />)
    expect(screen.getByText('Enterprise Agreement 2024')).toBeDefined()
    expect(screen.getByText('HR Policy Manual')).toBeDefined()
  })

  it('renders nothing for empty sources', () => {
    const { container } = render(<SourceList sources={[]} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders collapsible list', async () => {
    const user = userEvent.setup()
    render(
      <SourceList
        sources={mockSources}
        collapsible
        defaultExpanded={false}
      />,
    )

    // Collapsed: items should not be visible
    expect(screen.queryByText('Enterprise Agreement 2024')).toBeNull()

    // Click to expand
    await user.click(screen.getByText('Sources (2)'))
    expect(screen.getByText('Enterprise Agreement 2024')).toBeDefined()
  })

  it('renders collapsible list that is expanded by default', () => {
    render(
      <SourceList
        sources={mockSources}
        collapsible
        defaultExpanded
      />,
    )
    expect(screen.getByText('Enterprise Agreement 2024')).toBeDefined()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <SourceList sources={mockSources} />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
