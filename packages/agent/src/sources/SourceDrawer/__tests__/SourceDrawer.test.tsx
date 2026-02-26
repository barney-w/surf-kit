import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import * as vitestAxe from 'vitest-axe/matchers'
import { axe } from 'vitest-axe'
import { OverlayProvider } from 'react-aria'

import { SourceDrawer } from '../SourceDrawer'
import type { Source } from '../../../types/agent'

expect.extend(vitestAxe)

const mockSource: Source = {
  title: 'Enterprise Agreement 2024',
  section: 'Section 12 — Leave Entitlements',
  document_id: 'ea-2024-001',
  url: 'https://internal.example.com/docs/ea-2024',
  confidence: 0.95,
  snippet: 'All full-time employees are entitled to four weeks of paid annual leave.',
}

function renderWithProvider(ui: React.ReactElement) {
  return render(<OverlayProvider>{ui}</OverlayProvider>)
}

describe('SourceDrawer', () => {
  it('renders nothing when source is null', () => {
    const { container } = renderWithProvider(
      <SourceDrawer source={null} isOpen onClose={() => {}} />,
    )
    // OverlayProvider wraps in a div, so check for drawer content
    expect(screen.queryByTestId('source-drawer')).toBeNull()
  })

  it('renders source details when open', () => {
    renderWithProvider(
      <SourceDrawer source={mockSource} isOpen onClose={() => {}} />,
    )
    expect(screen.getByText('Enterprise Agreement 2024')).toBeDefined()
    expect(screen.getByText('Section 12 — Leave Entitlements')).toBeDefined()
    expect(screen.getByText(mockSource.snippet)).toBeDefined()
  })

  it('renders confidence percentage', () => {
    renderWithProvider(
      <SourceDrawer source={mockSource} isOpen onClose={() => {}} />,
    )
    expect(screen.getByText('95%')).toBeDefined()
  })

  it('renders source URL', () => {
    renderWithProvider(
      <SourceDrawer source={mockSource} isOpen onClose={() => {}} />,
    )
    const link = screen.getByText(mockSource.url)
    expect(link.tagName).toBe('A')
    expect(link.getAttribute('href')).toBe(mockSource.url)
    expect(link.getAttribute('target')).toBe('_blank')
  })

  it('has data-document-id attribute', () => {
    renderWithProvider(
      <SourceDrawer source={mockSource} isOpen onClose={() => {}} />,
    )
    const drawerContent = screen.getByTestId('source-drawer')
    expect(drawerContent.getAttribute('data-document-id')).toBe('ea-2024-001')
  })

  it('has no accessibility violations', async () => {
    const { container } = renderWithProvider(
      <SourceDrawer source={mockSource} isOpen onClose={() => {}} />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
