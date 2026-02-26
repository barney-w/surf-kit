import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import * as vitestAxe from 'vitest-axe/matchers'
import { axe } from 'vitest-axe'

import { Tabs } from '../Tabs'

expect.extend(vitestAxe)

const items = [
  { key: 'tab1', title: 'Tab One', content: 'Content One' },
  { key: 'tab2', title: 'Tab Two', content: 'Content Two' },
  { key: 'tab3', title: 'Tab Three', content: 'Content Three' },
]

describe('Tabs', () => {
  it('renders all tab titles', () => {
    render(<Tabs items={items} />)
    expect(screen.getByText('Tab One')).toBeDefined()
    expect(screen.getByText('Tab Two')).toBeDefined()
    expect(screen.getByText('Tab Three')).toBeDefined()
  })

  it('renders a tablist role', () => {
    render(<Tabs items={items} />)
    expect(screen.getByRole('tablist')).toBeDefined()
  })

  it('renders tab roles', () => {
    render(<Tabs items={items} />)
    expect(screen.getAllByRole('tab')).toHaveLength(3)
  })

  it('renders a tabpanel', () => {
    render(<Tabs items={items} />)
    expect(screen.getByRole('tabpanel')).toBeDefined()
  })

  it('shows the first tab content by default', () => {
    render(<Tabs items={items} />)
    expect(screen.getByText('Content One')).toBeDefined()
  })

  it('switches content when clicking a tab', async () => {
    const user = userEvent.setup()
    render(<Tabs items={items} />)
    await user.click(screen.getByText('Tab Two'))
    expect(screen.getByText('Content Two')).toBeDefined()
  })

  it('calls onSelectionChange', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<Tabs items={items} onSelectionChange={onChange} />)
    await user.click(screen.getByText('Tab Two'))
    expect(onChange).toHaveBeenCalledWith('tab2')
  })

  it('navigates tabs with arrow keys', async () => {
    const user = userEvent.setup()
    render(<Tabs items={items} />)
    const firstTab = screen.getByText('Tab One')
    await user.click(firstTab)
    await user.keyboard('{ArrowRight}')
    expect(screen.getByText('Content Two')).toBeDefined()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Tabs items={items} />)
    const results = await axe(container, {
      rules: {
        // react-aria generates IDs with colons that axe flags as invalid aria-controls values
        'aria-valid-attr-value': { enabled: false },
      },
    })
    expect(results).toHaveNoViolations()
  })
})
