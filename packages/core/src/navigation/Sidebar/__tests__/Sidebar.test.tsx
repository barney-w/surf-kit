import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'
import * as vitestAxe from 'vitest-axe/matchers'

import { Sidebar } from '../Sidebar'

expect.extend(vitestAxe)

describe('Sidebar', () => {
  it('renders as nav with aria-label', () => {
    render(<Sidebar>Content</Sidebar>)
    const nav = screen.getByRole('navigation')
    expect(nav).toBeDefined()
    expect(nav.getAttribute('aria-label')).toBe('Sidebar navigation')
  })

  it('renders children', () => {
    render(<Sidebar>Sidebar Content</Sidebar>)
    expect(screen.getByText('Sidebar Content')).toBeDefined()
  })

  it('applies custom width', () => {
    render(<Sidebar width={300}>Content</Sidebar>)
    const nav = screen.getByRole('navigation')
    expect(nav.style.width).toBe('300px')
  })

  it('renders toggle button when onToggle is provided', () => {
    render(<Sidebar onToggle={() => {}}>Content</Sidebar>)
    expect(screen.getByRole('button', { name: 'Collapse sidebar' })).toBeDefined()
  })

  it('shows expand label when collapsed', () => {
    render(
      <Sidebar collapsed onToggle={() => {}}>
        Content
      </Sidebar>,
    )
    expect(screen.getByRole('button', { name: 'Expand sidebar' })).toBeDefined()
  })

  it('calls onToggle when button is clicked', async () => {
    const onToggle = vi.fn()
    const user = userEvent.setup()
    render(<Sidebar onToggle={onToggle}>Content</Sidebar>)
    await user.click(screen.getByRole('button', { name: 'Collapse sidebar' }))
    expect(onToggle).toHaveBeenCalledOnce()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Sidebar>Content</Sidebar>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
