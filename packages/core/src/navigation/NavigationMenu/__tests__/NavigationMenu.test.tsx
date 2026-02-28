import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'

import { NavigationMenu } from '../NavigationMenu'

describe('NavigationMenu', () => {
  it('renders nav with menubar role', () => {
    render(
      <NavigationMenu>
        <NavigationMenu.Item label="Home" href="#" />
      </NavigationMenu>,
    )
    expect(screen.getByRole('navigation')).toBeDefined()
    expect(screen.getByRole('menubar')).toBeDefined()
  })

  it('renders items as links when href provided', () => {
    render(
      <NavigationMenu>
        <NavigationMenu.Item label="Home" href="/home" />
      </NavigationMenu>,
    )
    const link = screen.getByRole('menuitem', { name: 'Home' })
    expect(link.tagName).toBe('A')
    expect(link.getAttribute('href')).toBe('/home')
  })

  it('shows dropdown on click for items with children', async () => {
    const user = userEvent.setup()
    render(
      <NavigationMenu>
        <NavigationMenu.Item label="Products">
          <div>Dropdown content</div>
        </NavigationMenu.Item>
      </NavigationMenu>,
    )
    const trigger = screen.getByRole('menuitem', { name: /Products/ })
    expect(trigger.getAttribute('aria-haspopup')).toBe('true')
    expect(trigger.getAttribute('aria-expanded')).toBe('false')

    await user.click(trigger)
    expect(trigger.getAttribute('aria-expanded')).toBe('true')
    expect(screen.getByText('Dropdown content')).toBeDefined()
  })

  it('closes dropdown on Escape', async () => {
    const user = userEvent.setup()
    render(
      <NavigationMenu>
        <NavigationMenu.Item label="Products">
          <div>Dropdown content</div>
        </NavigationMenu.Item>
      </NavigationMenu>,
    )
    const trigger = screen.getByRole('menuitem', { name: /Products/ })
    await user.click(trigger)
    expect(screen.getByText('Dropdown content')).toBeDefined()

    await user.keyboard('{Escape}')
    expect(screen.queryByText('Dropdown content')).toBeNull()
  })

  it('merges className on root', () => {
    render(
      <NavigationMenu className="custom-class">
        <NavigationMenu.Item label="Home" href="#" />
      </NavigationMenu>,
    )
    const nav = screen.getByRole('navigation')
    expect(nav.className).toContain('custom-class')
  })

  it('toggles dropdown with keyboard Enter', async () => {
    const user = userEvent.setup()
    render(
      <NavigationMenu>
        <NavigationMenu.Item label="Products">
          <div>Dropdown content</div>
        </NavigationMenu.Item>
      </NavigationMenu>,
    )
    const trigger = screen.getByRole('menuitem', { name: /Products/ })
    trigger.focus()
    await user.keyboard('{Enter}')
    expect(trigger.getAttribute('aria-expanded')).toBe('true')
    expect(screen.getByText('Dropdown content')).toBeDefined()
  })
})
