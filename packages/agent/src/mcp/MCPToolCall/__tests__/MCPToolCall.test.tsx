import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeAll } from 'vitest'
import * as vitestAxe from 'vitest-axe/matchers'
import { axe } from 'vitest-axe'

import { MCPToolCall } from '../MCPToolCall'
import type { MCPToolCallData } from '../../../types/mcp'

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

const baseTool: MCPToolCallData = {
  id: 'call-1',
  name: 'read_file',
  arguments: { path: '/src/index.ts' },
  status: 'pending',
}

describe('MCPToolCall', () => {
  it('renders tool name', () => {
    render(<MCPToolCall call={baseTool} />)
    expect(screen.getByTestId('mcp-tool-name').textContent).toBe('read_file')
  })

  it('renders pending status badge', () => {
    render(<MCPToolCall call={{ ...baseTool, status: 'pending' }} />)
    const badge = screen.getByTestId('mcp-tool-status')
    expect(badge.textContent).toBe('Pending')
    expect(badge.getAttribute('aria-label')).toBe('Status: Pending')
  })

  it('renders running status with spinner', () => {
    render(<MCPToolCall call={{ ...baseTool, status: 'running' }} />)
    const badge = screen.getByTestId('mcp-tool-status')
    expect(badge.textContent).toBe('Running')
  })

  it('renders success status badge', () => {
    render(
      <MCPToolCall
        call={{
          ...baseTool,
          status: 'success',
          result: { content: 'file data' },
          startedAt: new Date('2026-01-01T00:00:00Z'),
          completedAt: new Date('2026-01-01T00:00:01.5Z'),
        }}
      />,
    )
    const badge = screen.getByTestId('mcp-tool-status')
    expect(badge.textContent).toBe('Success')
  })

  it('renders error status badge', () => {
    render(
      <MCPToolCall
        call={{ ...baseTool, status: 'error', error: 'File not found' }}
      />,
    )
    const badge = screen.getByTestId('mcp-tool-status')
    expect(badge.textContent).toBe('Error')
  })

  it('shows expanded body with arguments when isExpanded is true', () => {
    render(<MCPToolCall call={baseTool} isExpanded />)
    expect(screen.getByTestId('mcp-tool-call-body')).toBeDefined()
    expect(screen.getByTestId('mcp-tool-arguments')).toBeDefined()
    expect(screen.getByText('/src/index.ts')).toBeDefined()
  })

  it('hides body when isExpanded is false', () => {
    render(<MCPToolCall call={baseTool} isExpanded={false} />)
    expect(screen.queryByTestId('mcp-tool-call-body')).toBeNull()
  })

  it('calls onToggleExpand when header is clicked', async () => {
    const user = userEvent.setup()
    const onToggle = vi.fn()
    render(<MCPToolCall call={baseTool} onToggleExpand={onToggle} />)
    await user.click(screen.getByTestId('mcp-tool-call-header'))
    expect(onToggle).toHaveBeenCalledTimes(1)
  })

  it('displays duration when start and completion times are provided', () => {
    render(
      <MCPToolCall
        call={{
          ...baseTool,
          status: 'success',
          startedAt: new Date('2026-01-01T00:00:00Z'),
          completedAt: new Date('2026-01-01T00:00:01.5Z'),
        }}
      />,
    )
    expect(screen.getByTestId('mcp-tool-duration').textContent).toBe('1.5s')
  })

  it('displays result when expanded and result is present', () => {
    render(
      <MCPToolCall
        call={{
          ...baseTool,
          status: 'success',
          result: { data: 'hello' },
        }}
        isExpanded
      />,
    )
    expect(screen.getByTestId('mcp-tool-result')).toBeDefined()
  })

  it('displays error message when expanded and error is present', () => {
    render(
      <MCPToolCall
        call={{ ...baseTool, status: 'error', error: 'Connection timeout' }}
        isExpanded
      />,
    )
    expect(screen.getByTestId('mcp-tool-error').textContent).toBe('Connection timeout')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<MCPToolCall call={baseTool} isExpanded />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
