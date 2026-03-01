import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Collapsible } from '../Collapsible'

describe('Collapsible', () => {
  it('renders trigger and content children', () => {
    render(
      <Collapsible>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>
          <p>Content text</p>
        </Collapsible.Content>
      </Collapsible>,
    )
    expect(screen.getByText('Toggle')).toBeDefined()
    expect(screen.getByText('Content text')).toBeDefined()
  })

  it('toggles content visibility on trigger click', async () => {
    const user = userEvent.setup()
    render(
      <Collapsible>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>
          <p>Hidden content</p>
        </Collapsible.Content>
      </Collapsible>,
    )

    const trigger = screen.getByRole('button', { name: 'Toggle' })
    const content = screen.getByRole('region', { hidden: true })

    expect(content).toHaveAttribute('hidden', '')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')

    await user.click(trigger)

    expect(content).not.toHaveAttribute('hidden')
    expect(trigger).toHaveAttribute('aria-expanded', 'true')

    await user.click(trigger)

    expect(content).toHaveAttribute('hidden', '')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('supports controlled mode with isOpen and onOpenChange', async () => {
    const onOpenChange = vi.fn()
    const user = userEvent.setup()

    const { rerender } = render(
      <Collapsible isOpen={false} onOpenChange={onOpenChange}>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>
          <p>Controlled content</p>
        </Collapsible.Content>
      </Collapsible>,
    )

    const trigger = screen.getByRole('button', { name: 'Toggle' })
    const content = screen.getByRole('region', { hidden: true })

    expect(content).toHaveAttribute('hidden', '')

    await user.click(trigger)
    expect(onOpenChange).toHaveBeenCalledWith(true)
    // Still closed because controlled — parent hasn't updated isOpen
    expect(content).toHaveAttribute('hidden', '')

    // Parent updates isOpen to true
    rerender(
      <Collapsible isOpen={true} onOpenChange={onOpenChange}>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>
          <p>Controlled content</p>
        </Collapsible.Content>
      </Collapsible>,
    )

    expect(content).not.toHaveAttribute('hidden')
  })

  it('supports uncontrolled mode with defaultOpen', () => {
    render(
      <Collapsible defaultOpen>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>
          <p>Initially visible</p>
        </Collapsible.Content>
      </Collapsible>,
    )

    const trigger = screen.getByRole('button', { name: 'Toggle' })
    const content = screen.getByRole('region')

    expect(content).not.toHaveAttribute('hidden')
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
  })

  it('merges classNames on all sub-components', () => {
    render(
      <Collapsible className="root-class" defaultOpen>
        <Collapsible.Trigger className="trigger-class">Toggle</Collapsible.Trigger>
        <Collapsible.Content className="content-class">
          <p>Content</p>
        </Collapsible.Content>
      </Collapsible>,
    )

    const trigger = screen.getByRole('button', { name: 'Toggle' })
    const content = screen.getByRole('region')

    expect(trigger.className).toContain('trigger-class')
    expect(content.className).toContain('content-class')
    // Root wrapper
    expect(trigger.parentElement?.className).toContain('root-class')
  })

  it('has aria-expanded and aria-controls attributes linking trigger to content', () => {
    render(
      <Collapsible>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>
          <p>Content</p>
        </Collapsible.Content>
      </Collapsible>,
    )

    const trigger = screen.getByRole('button', { name: 'Toggle' })
    const content = screen.getByRole('region', { hidden: true })

    expect(trigger).toHaveAttribute('aria-controls')
    expect(content).toHaveAttribute('id')
    expect(trigger.getAttribute('aria-controls')).toBe(content.getAttribute('id'))
  })
})
