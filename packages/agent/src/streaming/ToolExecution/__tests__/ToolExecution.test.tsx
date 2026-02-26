import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeAll } from 'vitest'
import * as vitestAxe from 'vitest-axe/matchers'
import { axe } from 'vitest-axe'

import { ToolExecution } from '../ToolExecution'

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

describe('ToolExecution', () => {
  it('renders default label for search tool', () => {
    render(<ToolExecution tool="search" />)
    expect(screen.getByText('Searching knowledge base...')).toBeDefined()
  })

  it('renders custom label', () => {
    render(<ToolExecution tool="custom" label="Analyzing data..." />)
    expect(screen.getByText('Analyzing data...')).toBeDefined()
  })

  it('renders fallback label for unknown tool', () => {
    render(<ToolExecution tool="mytool" />)
    expect(screen.getByText('Running mytool...')).toBeDefined()
  })

  it('has status role', () => {
    render(<ToolExecution tool="search" />)
    expect(screen.getByTestId('tool-execution').getAttribute('role')).toBe('status')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<ToolExecution tool="search" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
