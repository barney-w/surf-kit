import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'
import * as vitestAxe from 'vitest-axe/matchers'
import type { MCPToolCallData } from '../../../types/mcp'
import { MCPApprovalDialog } from '../MCPApprovalDialog'

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

const baseCall: MCPToolCallData = {
  id: 'call-1',
  name: 'write_file',
  serverName: 'filesystem',
  arguments: { path: '/etc/config', content: 'new config' },
  status: 'pending',
}

describe('MCPApprovalDialog', () => {
  it('renders nothing when isOpen is false', () => {
    render(
      <MCPApprovalDialog call={baseCall} isOpen={false} onApprove={vi.fn()} onDeny={vi.fn()} />,
    )
    expect(screen.queryByTestId('mcp-approval-dialog')).toBeNull()
  })

  it('renders dialog with tool name when isOpen is true', () => {
    render(<MCPApprovalDialog call={baseCall} isOpen onApprove={vi.fn()} onDeny={vi.fn()} />)
    expect(screen.getByTestId('mcp-approval-dialog')).toBeDefined()
    expect(screen.getByTestId('mcp-approval-tool-name').textContent).toBe('write_file')
    expect(screen.getByTestId('mcp-approval-server').textContent).toContain('filesystem')
  })

  it('displays arguments', () => {
    render(<MCPApprovalDialog call={baseCall} isOpen onApprove={vi.fn()} onDeny={vi.fn()} />)
    const args = screen.getByTestId('mcp-approval-arguments')
    expect(args).toBeDefined()
    expect(args.textContent).toContain('path')
    expect(args.textContent).toContain('/etc/config')
  })

  it('calls onApprove when Approve is clicked', async () => {
    const user = userEvent.setup()
    const onApprove = vi.fn()
    render(<MCPApprovalDialog call={baseCall} isOpen onApprove={onApprove} onDeny={vi.fn()} />)
    await user.click(screen.getByRole('button', { name: /approve/i }))
    expect(onApprove).toHaveBeenCalledTimes(1)
  })

  it('calls onDeny when Deny is clicked', async () => {
    const user = userEvent.setup()
    const onDeny = vi.fn()
    render(<MCPApprovalDialog call={baseCall} isOpen onApprove={vi.fn()} onDeny={onDeny} />)
    await user.click(screen.getByRole('button', { name: /deny/i }))
    expect(onDeny).toHaveBeenCalledTimes(1)
  })

  it('shows low risk badge by default', () => {
    render(<MCPApprovalDialog call={baseCall} isOpen onApprove={vi.fn()} onDeny={vi.fn()} />)
    const badge = screen.getByTestId('mcp-approval-risk-badge')
    expect(badge.textContent).toBe('Low Risk')
  })

  it('shows medium risk badge', () => {
    render(
      <MCPApprovalDialog
        call={baseCall}
        riskLevel="medium"
        isOpen
        onApprove={vi.fn()}
        onDeny={vi.fn()}
      />,
    )
    const badge = screen.getByTestId('mcp-approval-risk-badge')
    expect(badge.textContent).toBe('Medium Risk')
  })

  it('shows high risk badge', () => {
    render(
      <MCPApprovalDialog
        call={baseCall}
        riskLevel="high"
        isOpen
        onApprove={vi.fn()}
        onDeny={vi.fn()}
      />,
    )
    const badge = screen.getByTestId('mcp-approval-risk-badge')
    expect(badge.textContent).toBe('High Risk')
  })

  it('does not dismiss on Escape key', async () => {
    const user = userEvent.setup()
    const onApprove = vi.fn()
    const onDeny = vi.fn()
    render(<MCPApprovalDialog call={baseCall} isOpen onApprove={onApprove} onDeny={onDeny} />)
    await user.keyboard('{Escape}')
    expect(screen.getByTestId('mcp-approval-dialog')).toBeDefined()
    expect(onApprove).not.toHaveBeenCalled()
    expect(onDeny).not.toHaveBeenCalled()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <MCPApprovalDialog call={baseCall} isOpen onApprove={vi.fn()} onDeny={vi.fn()} />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
