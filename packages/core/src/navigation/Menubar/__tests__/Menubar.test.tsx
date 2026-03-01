import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Menubar } from '../Menubar'

describe('Menubar', () => {
  it('renders with role="menubar"', () => {
    render(
      <Menubar>
        <Menubar.Menu label="File">
          <Menubar.Item label="New" />
        </Menubar.Menu>
      </Menubar>,
    )
    expect(screen.getByRole('menubar')).toBeDefined()
  })

  it('opens menu dropdown on trigger click', async () => {
    const user = userEvent.setup()
    render(
      <Menubar>
        <Menubar.Menu label="File">
          <Menubar.Item label="New File" />
        </Menubar.Menu>
      </Menubar>,
    )
    const trigger = screen.getByRole('menuitem', { name: 'File' })
    expect(trigger.getAttribute('aria-haspopup')).toBe('menu')
    expect(trigger.getAttribute('aria-expanded')).toBe('false')

    await user.click(trigger)
    expect(trigger.getAttribute('aria-expanded')).toBe('true')
    expect(screen.getByRole('menu')).toBeDefined()
    expect(screen.getByRole('menuitem', { name: 'New File' })).toBeDefined()
  })

  it('calls onSelect on item click', async () => {
    const onSelect = vi.fn()
    const user = userEvent.setup()
    render(
      <Menubar>
        <Menubar.Menu label="File">
          <Menubar.Item label="Save" onSelect={onSelect} />
        </Menubar.Menu>
      </Menubar>,
    )
    await user.click(screen.getByRole('menuitem', { name: 'File' }))
    await user.click(screen.getByRole('menuitem', { name: 'Save' }))
    expect(onSelect).toHaveBeenCalledOnce()
  })

  it('closes on Escape', async () => {
    const user = userEvent.setup()
    render(
      <Menubar>
        <Menubar.Menu label="File">
          <Menubar.Item label="New" />
        </Menubar.Menu>
      </Menubar>,
    )
    await user.click(screen.getByRole('menuitem', { name: 'File' }))
    expect(screen.getByRole('menu')).toBeDefined()

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('menu')).toBeNull()
  })

  it('renders separator', async () => {
    const user = userEvent.setup()
    render(
      <Menubar>
        <Menubar.Menu label="File">
          <Menubar.Item label="New" />
          <Menubar.Separator />
          <Menubar.Item label="Save" />
        </Menubar.Menu>
      </Menubar>,
    )
    await user.click(screen.getByRole('menuitem', { name: 'File' }))
    expect(screen.getByRole('separator')).toBeDefined()
  })

  it('does not call onSelect when item is disabled', async () => {
    const onSelect = vi.fn()
    const user = userEvent.setup()
    render(
      <Menubar>
        <Menubar.Menu label="File">
          <Menubar.Item label="Save" onSelect={onSelect} isDisabled />
        </Menubar.Menu>
      </Menubar>,
    )
    await user.click(screen.getByRole('menuitem', { name: 'File' }))
    await user.click(screen.getByRole('menuitem', { name: 'Save' }))
    expect(onSelect).not.toHaveBeenCalled()
  })
})
