import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import * as vitestAxe from 'vitest-axe/matchers'
import type { AgentInfo } from '../../../types/agent'
import { AgentAvatar } from '../AgentAvatar'

expect.extend(vitestAxe)

const mockAgent: AgentInfo = {
  id: 'hr-agent',
  label: 'HR Agent',
  accent: '#10b981',
}

describe('AgentAvatar', () => {
  it('renders with agent prop', () => {
    render(<AgentAvatar agent={mockAgent} />)
    expect(screen.getByTestId('agent-avatar')).toBeDefined()
  })

  it('renders circular avatar', () => {
    render(<AgentAvatar agent={mockAgent} />)
    const avatar = screen.getByTestId('agent-avatar')
    expect(avatar.className).toContain('rounded-full')
  })

  it('uses agent accent colour as background', () => {
    render(<AgentAvatar agent={mockAgent} />)
    const avatar = screen.getByTestId('agent-avatar')
    expect(avatar.style.backgroundColor).toBe('rgb(16, 185, 129)')
  })

  it('renders initial when no icon', () => {
    render(<AgentAvatar agent={mockAgent} />)
    expect(screen.getByText('H')).toBeDefined()
  })

  it('renders icon when provided', () => {
    const IconComponent = ({ size, className }: { size?: number; className?: string }) => (
      <svg data-testid="custom-icon" width={size} className={className} />
    )
    const agentWithIcon: AgentInfo = { ...mockAgent, icon: IconComponent }
    render(<AgentAvatar agent={agentWithIcon} />)
    expect(screen.getByTestId('custom-icon')).toBeDefined()
  })

  it('has role="img" with aria-label', () => {
    render(<AgentAvatar agent={mockAgent} />)
    const avatar = screen.getByRole('img')
    expect(avatar.getAttribute('aria-label')).toBe('HR Agent avatar')
  })

  it('works with agentId and agentThemes', () => {
    render(<AgentAvatar agentId="hr-agent" agentThemes={{ 'hr-agent': mockAgent }} />)
    expect(screen.getByText('H')).toBeDefined()
  })

  it('uses default accent when agent has no accent', () => {
    const agentNoAccent: AgentInfo = { id: 'test', label: 'Test' }
    render(<AgentAvatar agent={agentNoAccent} />)
    const avatar = screen.getByTestId('agent-avatar')
    expect(avatar.style.backgroundColor).toBe('rgb(99, 102, 241)')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<AgentAvatar agent={mockAgent} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
