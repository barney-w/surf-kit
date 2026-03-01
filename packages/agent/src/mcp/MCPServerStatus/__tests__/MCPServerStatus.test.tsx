import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'
import * as vitestAxe from 'vitest-axe/matchers'
import type { MCPServerInfo } from '../../../types/mcp'
import { MCPServerStatus } from '../MCPServerStatus'

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

const connectedServer: MCPServerInfo = {
  name: 'filesystem',
  version: '1.2.0',
  status: 'connected',
  tools: [
    { name: 'read_file', description: 'Read a file from disk' },
    { name: 'write_file', description: 'Write content to a file' },
  ],
  resources: [{ uri: 'file:///src', name: 'Source directory' }],
  lastPing: new Date('2026-01-15T10:30:00Z'),
}

describe('MCPServerStatus', () => {
  it('renders server name and version', () => {
    render(<MCPServerStatus server={connectedServer} />)
    expect(screen.getByTestId('mcp-server-name').textContent).toBe('filesystem')
    expect(screen.getByTestId('mcp-server-version').textContent).toBe('v1.2.0')
  })

  it('renders connected status dot with correct aria-label', () => {
    render(<MCPServerStatus server={connectedServer} />)
    const dot = screen.getByTestId('mcp-server-status-dot')
    expect(dot.getAttribute('aria-label')).toBe('Connected')
  })

  it('renders disconnected status dot', () => {
    render(<MCPServerStatus server={{ ...connectedServer, status: 'disconnected' }} />)
    const dot = screen.getByTestId('mcp-server-status-dot')
    expect(dot.getAttribute('aria-label')).toBe('Disconnected')
  })

  it('renders error status dot', () => {
    render(<MCPServerStatus server={{ ...connectedServer, status: 'error' }} />)
    const dot = screen.getByTestId('mcp-server-status-dot')
    expect(dot.getAttribute('aria-label')).toBe('Error')
  })

  it('displays last ping time', () => {
    render(<MCPServerStatus server={connectedServer} />)
    expect(screen.getByTestId('mcp-server-last-ping')).toBeDefined()
  })

  it('expands tools list on click', async () => {
    const user = userEvent.setup()
    render(<MCPServerStatus server={connectedServer} />)
    expect(screen.queryByTestId('mcp-server-tools-list')).toBeNull()
    await user.click(screen.getByTestId('mcp-server-tools-toggle'))
    expect(screen.getByTestId('mcp-server-tools-list')).toBeDefined()
    expect(screen.getByText('read_file')).toBeDefined()
    expect(screen.getByText('write_file')).toBeDefined()
  })

  it('expands resources list on click', async () => {
    const user = userEvent.setup()
    render(<MCPServerStatus server={connectedServer} />)
    expect(screen.queryByTestId('mcp-server-resources-list')).toBeNull()
    await user.click(screen.getByTestId('mcp-server-resources-toggle'))
    expect(screen.getByTestId('mcp-server-resources-list')).toBeDefined()
    expect(screen.getByText('Source directory')).toBeDefined()
  })

  it('hides version when not provided', () => {
    render(<MCPServerStatus server={{ ...connectedServer, version: undefined }} />)
    expect(screen.queryByTestId('mcp-server-version')).toBeNull()
  })

  it('applies custom className', () => {
    render(<MCPServerStatus server={connectedServer} className="my-class" />)
    const root = screen.getByTestId('mcp-server-status')
    expect(root.className).toContain('my-class')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<MCPServerStatus server={connectedServer} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
