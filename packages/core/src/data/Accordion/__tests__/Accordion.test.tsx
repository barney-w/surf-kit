import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import * as vitestAxe from 'vitest-axe/matchers'
import { axe } from 'vitest-axe'

import { Accordion } from '../Accordion'

expect.extend(vitestAxe)

const items = [
  { key: 'item1', title: 'Section One', content: 'Content One' },
  { key: 'item2', title: 'Section Two', content: 'Content Two' },
  { key: 'item3', title: 'Section Three', content: 'Content Three' },
]

describe('Accordion', () => {
  it('renders all section headers', () => {
    render(<Accordion items={items} />)
    expect(screen.getByText('Section One')).toBeDefined()
    expect(screen.getByText('Section Two')).toBeDefined()
    expect(screen.getByText('Section Three')).toBeDefined()
  })

  it('all sections are collapsed by default', () => {
    render(<Accordion items={items} />)
    const buttons = screen.getAllByRole('button')
    buttons.forEach((button) => {
      expect(button.getAttribute('aria-expanded')).toBe('false')
    })
  })

  it('expands section on click', async () => {
    const user = userEvent.setup()
    render(<Accordion items={items} />)
    await user.click(screen.getByText('Section One'))
    expect(screen.getByText('Section One').closest('button')?.getAttribute('aria-expanded')).toBe('true')
    expect(screen.getByText('Content One')).toBeDefined()
  })

  it('only one section open at a time in single mode', async () => {
    const user = userEvent.setup()
    render(<Accordion items={items} type="single" />)
    await user.click(screen.getByText('Section One'))
    await user.click(screen.getByText('Section Two'))
    const buttons = screen.getAllByRole('button')
    expect(buttons[0].getAttribute('aria-expanded')).toBe('false')
    expect(buttons[1].getAttribute('aria-expanded')).toBe('true')
  })

  it('allows multiple sections open in multiple mode', async () => {
    const user = userEvent.setup()
    render(<Accordion items={items} type="multiple" />)
    await user.click(screen.getByText('Section One'))
    await user.click(screen.getByText('Section Two'))
    const buttons = screen.getAllByRole('button')
    expect(buttons[0].getAttribute('aria-expanded')).toBe('true')
    expect(buttons[1].getAttribute('aria-expanded')).toBe('true')
  })

  it('supports defaultExpandedKeys', () => {
    render(<Accordion items={items} defaultExpandedKeys={['item2']} />)
    const buttons = screen.getAllByRole('button')
    expect(buttons[0].getAttribute('aria-expanded')).toBe('false')
    expect(buttons[1].getAttribute('aria-expanded')).toBe('true')
  })

  it('navigates between headers with arrow keys', async () => {
    const user = userEvent.setup()
    render(<Accordion items={items} />)
    const buttons = screen.getAllByRole('button')
    buttons[0].focus()
    await user.keyboard('{ArrowDown}')
    expect(document.activeElement).toBe(buttons[1])
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Accordion items={items} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
