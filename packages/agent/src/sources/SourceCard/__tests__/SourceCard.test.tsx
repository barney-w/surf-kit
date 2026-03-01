import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'
import * as vitestAxe from 'vitest-axe/matchers'
import type { Source } from '../../../types/agent'
import { SourceCard } from '../SourceCard'

expect.extend(vitestAxe)

const mockSource: Source = {
  title: 'Enterprise Agreement 2024',
  section: 'Section 12 — Leave Entitlements',
  document_id: 'ea-2024-001',
  url: 'https://internal.example.com/docs/ea-2024',
  confidence: 0.95,
  snippet: 'All full-time employees are entitled to four weeks of paid annual leave.',
}

describe('SourceCard', () => {
  it('renders title', () => {
    render(<SourceCard source={mockSource} />)
    expect(screen.getByText('Enterprise Agreement 2024')).toBeDefined()
  })

  it('renders section', () => {
    render(<SourceCard source={mockSource} />)
    expect(screen.getByText('Section 12 — Leave Entitlements')).toBeDefined()
  })

  it('renders confidence badge', () => {
    render(<SourceCard source={mockSource} />)
    expect(screen.getByText('High')).toBeDefined()
  })

  it('has data-document-id attribute', () => {
    const { container } = render(<SourceCard source={mockSource} />)
    const card = container.querySelector('[data-document-id="ea-2024-001"]')
    expect(card).not.toBeNull()
  })

  it('renders compact variant without snippet', () => {
    render(<SourceCard source={mockSource} variant="compact" />)
    expect(screen.queryByText(mockSource.snippet)).toBeNull()
  })

  it('renders expanded variant with snippet', () => {
    render(<SourceCard source={mockSource} variant="expanded" />)
    expect(screen.getByText(mockSource.snippet)).toBeDefined()
  })

  it('calls onNavigate when clicked', async () => {
    const user = userEvent.setup()
    const onNavigate = vi.fn()
    render(<SourceCard source={mockSource} onNavigate={onNavigate} />)

    await user.click(screen.getByText('Enterprise Agreement 2024'))
    expect(onNavigate).toHaveBeenCalledWith(mockSource)
  })

  it('renders medium confidence badge for medium scores', () => {
    render(<SourceCard source={{ ...mockSource, confidence: 0.6 }} />)
    expect(screen.getByText('Medium')).toBeDefined()
  })

  it('renders low confidence badge for low scores', () => {
    render(<SourceCard source={{ ...mockSource, confidence: 0.3 }} />)
    expect(screen.getByText('Low')).toBeDefined()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<SourceCard source={mockSource} variant="expanded" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
