import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import * as vitestAxe from 'vitest-axe/matchers'
import { axe } from 'vitest-axe'

import { AgentHandoff } from '../AgentHandoff'
import type { AgentInfo } from '../../../types/agent'

expect.extend(vitestAxe)

const fromAgent: AgentInfo = {
  id: 'coordinator',
  label: 'Coordinator',
  accent: '#6366f1',
}

const toAgent: AgentInfo = {
  id: 'hr-agent',
  label: 'HR Agent',
  accent: '#10b981',
}

describe('AgentHandoff', () => {
  it('renders from agent label', () => {
    render(<AgentHandoff from={fromAgent} to={toAgent} />)
    expect(screen.getByText('Coordinator')).toBeDefined()
  })

  it('renders to agent label', () => {
    render(<AgentHandoff from={fromAgent} to={toAgent} />)
    expect(screen.getByText('HR Agent')).toBeDefined()
  })

  it('renders both agent avatars', () => {
    render(<AgentHandoff from={fromAgent} to={toAgent} />)
    const avatars = screen.getAllByTestId('agent-avatar')
    expect(avatars.length).toBe(2)
  })

  it('announces handoff to screen readers via live region', () => {
    render(<AgentHandoff from={fromAgent} to={toAgent} />)
    const liveRegion = screen.getByRole('status')
    expect(liveRegion.textContent).toContain('Handing off from Coordinator to HR Agent')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <AgentHandoff from={fromAgent} to={toAgent} />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
