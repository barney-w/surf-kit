import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import * as vitestAxe from 'vitest-axe/matchers'
import { axe } from 'vitest-axe'

import { AgentLabel } from '../AgentLabel'
import type { AgentInfo } from '../../../types/agent'

expect.extend(vitestAxe)

const mockAgent: AgentInfo = {
  id: 'hr-agent',
  label: 'HR Agent',
  accent: '#10b981',
}

describe('AgentLabel', () => {
  it('renders "Answered by" text', () => {
    render(<AgentLabel agent={mockAgent} />)
    expect(screen.getByText(/Answered by/)).toBeDefined()
  })

  it('renders agent label', () => {
    render(<AgentLabel agent={mockAgent} />)
    expect(screen.getByText('HR Agent')).toBeDefined()
  })

  it('uses accent colour for agent name', () => {
    render(<AgentLabel agent={mockAgent} />)
    const name = screen.getByText('HR Agent')
    expect(name.style.color).toBe('rgb(16, 185, 129)')
  })

  it('uses default accent when none provided', () => {
    const agentNoAccent: AgentInfo = { id: 'test', label: 'Test Agent' }
    render(<AgentLabel agent={agentNoAccent} />)
    const name = screen.getByText('Test Agent')
    expect(name.style.color).toBe('rgb(99, 102, 241)')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<AgentLabel agent={mockAgent} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
