import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeAll } from 'vitest'
import * as vitestAxe from 'vitest-axe/matchers'
import { axe } from 'vitest-axe'

import { RetrievalProgress } from '../RetrievalProgress'
import type { Source } from '../../../types/agent'

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

const mockSources: Source[] = [
  {
    title: 'Enterprise Agreement 2024',
    section: 'Section 12',
    document_id: 'ea-2024-001',
    url: 'https://example.com/ea-2024',
    confidence: 0.95,
    snippet: 'Leave entitlements...',
  },
  {
    title: 'HR Policy Manual',
    section: 'Chapter 3',
    document_id: 'hr-001',
    url: 'https://example.com/hr',
    confidence: 0.82,
    snippet: 'Work from home policy...',
  },
]

describe('RetrievalProgress', () => {
  it('shows spinner when active', () => {
    render(<RetrievalProgress sources={[]} isActive />)
    expect(screen.getByText('Retrieving sources...')).toBeDefined()
  })

  it('does not show spinner when inactive', () => {
    render(<RetrievalProgress sources={mockSources} isActive={false} />)
    expect(screen.queryByText('Retrieving sources...')).toBeNull()
  })

  it('renders source titles progressively', () => {
    render(<RetrievalProgress sources={mockSources} isActive />)
    expect(screen.getByText('Enterprise Agreement 2024')).toBeDefined()
    expect(screen.getByText('HR Policy Manual')).toBeDefined()
  })

  it('renders source items with stagger animation', () => {
    render(<RetrievalProgress sources={mockSources} isActive />)
    const items = screen.getAllByTestId('retrieval-source-item')
    expect(items).toHaveLength(2)
  })

  it('has status role with descriptive label when active', () => {
    render(<RetrievalProgress sources={mockSources} isActive />)
    const status = screen.getByTestId('retrieval-progress')
    expect(status.getAttribute('role')).toBe('status')
    expect(status.getAttribute('aria-label')).toBe(
      'Retrieving sources, 2 found so far',
    )
  })

  it('has status role with descriptive label when inactive', () => {
    render(<RetrievalProgress sources={mockSources} isActive={false} />)
    const status = screen.getByTestId('retrieval-progress')
    expect(status.getAttribute('role')).toBe('status')
    expect(status.getAttribute('aria-label')).toBe('2 sources found')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <RetrievalProgress sources={mockSources} isActive />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
