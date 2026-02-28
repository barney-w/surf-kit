import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { ContextMenu } from '../ContextMenu'

const items = [
  { key: 'copy', label: 'Copy' },
  { key: 'paste', label: 'Paste' },
  { key: 'delete', label: 'Delete', isDanger: true },
  { key: 'disabled', label: 'Disabled', isDisabled: true },
]

describe('ContextMenu', () => {
  it('renders children', () => {
    render(
      <ContextMenu items={items}>
        <div>Right click me</div>
      </ContextMenu>,
    )
    expect(screen.getByText('Right click me')).toBeDefined()
  })

  it('opens menu on right-click (contextmenu)', () => {
    render(
      <ContextMenu items={items}>
        <div>Right click me</div>
      </ContextMenu>,
    )
    fireEvent.contextMenu(screen.getByText('Right click me'))
    expect(screen.getByRole('menu')).toBeDefined()
    expect(screen.getByText('Copy')).toBeDefined()
    expect(screen.getByText('Paste')).toBeDefined()
    expect(screen.getByText('Delete')).toBeDefined()
  })

  it('calls onAction when item is clicked', () => {
    const onAction = vi.fn()
    render(
      <ContextMenu items={items} onAction={onAction}>
        <div>Right click me</div>
      </ContextMenu>,
    )
    fireEvent.contextMenu(screen.getByText('Right click me'))
    fireEvent.click(screen.getByText('Copy'))
    expect(onAction).toHaveBeenCalledWith('copy')
  })

  it('closes on Escape', () => {
    render(
      <ContextMenu items={items}>
        <div>Right click me</div>
      </ContextMenu>,
    )
    fireEvent.contextMenu(screen.getByText('Right click me'))
    expect(screen.getByRole('menu')).toBeDefined()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('menu')).toBeNull()
  })

  it('disabled items are not clickable', () => {
    const onAction = vi.fn()
    render(
      <ContextMenu items={items} onAction={onAction}>
        <div>Right click me</div>
      </ContextMenu>,
    )
    fireEvent.contextMenu(screen.getByText('Right click me'))
    fireEvent.click(screen.getByText('Disabled'))
    expect(onAction).not.toHaveBeenCalled()
  })

  it('renders items with correct ARIA roles', () => {
    render(
      <ContextMenu items={items}>
        <div>Right click me</div>
      </ContextMenu>,
    )
    fireEvent.contextMenu(screen.getByText('Right click me'))
    const menuItems = screen.getAllByRole('menuitem')
    expect(menuItems).toHaveLength(4)
    expect(menuItems[3].getAttribute('aria-disabled')).toBe('true')
  })

  it('navigates with arrow keys and selects with Enter', () => {
    const onAction = vi.fn()
    render(
      <ContextMenu items={items} onAction={onAction}>
        <div>Right click me</div>
      </ContextMenu>,
    )
    fireEvent.contextMenu(screen.getByText('Right click me'))
    // First enabled item (index 0 = Copy) is focused by default
    // ArrowDown moves to Paste (index 1)
    fireEvent.keyDown(document, { key: 'ArrowDown' })
    // Enter selects Paste
    fireEvent.keyDown(document, { key: 'Enter' })
    expect(onAction).toHaveBeenCalledWith('paste')
  })

  it('renders icon when provided', () => {
    const itemsWithIcon = [
      {
        key: 'star',
        label: 'Star',
        icon: <svg data-testid="star-icon" />,
      },
    ]
    render(
      <ContextMenu items={itemsWithIcon}>
        <div>Right click me</div>
      </ContextMenu>,
    )
    fireEvent.contextMenu(screen.getByText('Right click me'))
    expect(screen.getByTestId('star-icon')).toBeDefined()
  })
})
