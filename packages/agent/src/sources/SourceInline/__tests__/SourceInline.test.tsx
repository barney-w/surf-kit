import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import * as vitestAxe from 'vitest-axe/matchers'
import { axe } from 'vitest-axe'

import { SourceInline } from '../SourceInline'
import type { Source } from '../../../types/agent'

expect.extend(vitestAxe)

const mockSource: Source = {
  title: 'Enterprise Agreement 2024',
  section: 'Section 12',
  document_id: 'ea-2024-001',
  url: 'https://example.com/ea',
  confidence: 0.95,
  snippet: 'All full-time employees are entitled to four weeks of paid annual leave.',
}

describe('SourceInline', () => {
  it('renders [N] marker', () => {
    render(<SourceInline source={mockSource} index={1} />)
    expect(screen.getByText('[1]')).toBeDefined()
  })

  it('has data-document-id attribute', () => {
    render(<SourceInline source={mockSource} index={1} />)
    const el = screen.getByTestId('source-inline')
    expect(el.getAttribute('data-document-id')).toBe('ea-2024-001')
  })

  it('has an aria-label with source info', () => {
    render(<SourceInline source={mockSource} index={1} />)
    const el = screen.getByTestId('source-inline')
    expect(el.getAttribute('aria-label')).toContain('Source 1')
    expect(el.getAttribute('aria-label')).toContain('Enterprise Agreement 2024')
  })

  it('renders different indices', () => {
    render(<SourceInline source={mockSource} index={3} />)
    expect(screen.getByText('[3]')).toBeDefined()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <SourceInline source={mockSource} index={1} />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
