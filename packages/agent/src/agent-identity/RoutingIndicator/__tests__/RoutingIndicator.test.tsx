import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import * as vitestAxe from 'vitest-axe/matchers'
import { axe } from 'vitest-axe'

import { RoutingIndicator } from '../RoutingIndicator'

expect.extend(vitestAxe)

describe('RoutingIndicator', () => {
  it('renders from and to names', () => {
    render(<RoutingIndicator from="coordinator" to="hr_agent" />)
    expect(screen.getByText('coordinator')).toBeDefined()
    expect(screen.getByText('hr_agent')).toBeDefined()
  })

  it('renders "Routed:" prefix', () => {
    render(<RoutingIndicator from="coordinator" to="hr_agent" />)
    expect(screen.getByText('Routed:')).toBeDefined()
  })

  it('renders reason when provided', () => {
    render(
      <RoutingIndicator
        from="coordinator"
        to="hr_agent"
        reason="leave question detected"
      />,
    )
    expect(screen.getByText('(leave question detected)')).toBeDefined()
  })

  it('does not render reason when not provided', () => {
    const { container } = render(
      <RoutingIndicator from="coordinator" to="hr_agent" />,
    )
    expect(container.textContent).not.toContain('(')
  })

  it('uses monospace font', () => {
    render(<RoutingIndicator from="coordinator" to="hr_agent" />)
    const indicator = screen.getByTestId('routing-indicator')
    expect(indicator.className).toContain('font-mono')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <RoutingIndicator from="coordinator" to="hr_agent" reason="test" />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
