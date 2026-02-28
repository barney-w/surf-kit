import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Command } from '../Command'

function renderCommand(props: Partial<React.ComponentProps<typeof Command>> = {}) {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onSelect: vi.fn(),
    ...props,
  }

  return {
    ...render(
      <Command {...defaultProps}>
        <Command.Group heading="File">
          <Command.Item value="new-file" shortcut="⌘N">
            New File
          </Command.Item>
          <Command.Item value="open-file" shortcut="⌘O">
            Open File
          </Command.Item>
          <Command.Item value="save" shortcut="⌘S">
            Save
          </Command.Item>
        </Command.Group>
        <Command.Group heading="Edit">
          <Command.Item value="undo" shortcut="⌘Z">
            Undo
          </Command.Item>
          <Command.Item value="redo" shortcut="⌘⇧Z" isDisabled>
            Redo
          </Command.Item>
        </Command.Group>
      </Command>,
    ),
    onClose: defaultProps.onClose,
    onSelect: defaultProps.onSelect,
  }
}

describe('Command', () => {
  it('renders when isOpen is true', () => {
    renderCommand()
    expect(screen.getByRole('combobox')).toBeDefined()
    expect(screen.getByText('New File')).toBeDefined()
    expect(screen.getByText('Open File')).toBeDefined()
    expect(screen.getByText('Save')).toBeDefined()
  })

  it('does not render when isOpen is false', () => {
    renderCommand({ isOpen: false })
    expect(screen.queryByRole('combobox')).toBeNull()
    expect(screen.queryByText('New File')).toBeNull()
  })

  it('filters items based on search query', async () => {
    const user = userEvent.setup()
    renderCommand()

    const input = screen.getByRole('combobox')
    await user.type(input, 'new')

    expect(screen.getByText('New File')).toBeDefined()
    expect(screen.queryByText('Open File')).toBeNull()
    expect(screen.queryByText('Save')).toBeNull()
    expect(screen.queryByText('Undo')).toBeNull()
  })

  it('calls onSelect and fires item onSelect when an item is clicked', async () => {
    const user = userEvent.setup()
    const itemOnSelect = vi.fn()
    const onSelect = vi.fn()

    render(
      <Command isOpen={true} onClose={vi.fn()} onSelect={onSelect}>
        <Command.Item value="test-item" onSelect={itemOnSelect}>
          Test Item
        </Command.Item>
      </Command>,
    )

    await user.click(screen.getByText('Test Item'))
    expect(itemOnSelect).toHaveBeenCalledTimes(1)
    expect(onSelect).toHaveBeenCalledWith('test-item')
  })

  it('closes on Escape key', async () => {
    const user = userEvent.setup()
    const { onClose } = renderCommand()

    await user.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('renders group headings', () => {
    renderCommand()
    expect(screen.getByText('File')).toBeDefined()
    expect(screen.getByText('Edit')).toBeDefined()
  })

  it('renders groups with correct role and aria-labelledby', () => {
    renderCommand()
    const groups = screen.getAllByRole('group')
    expect(groups).toHaveLength(2)
    groups.forEach((group) => {
      expect(group.getAttribute('aria-labelledby')).toBeTruthy()
    })
  })

  it('navigates items with keyboard arrows', async () => {
    const user = userEvent.setup()
    renderCommand()

    // Initially the first item should be focused
    const options = screen.getAllByRole('option')
    expect(options[0].getAttribute('aria-selected')).toBe('true')

    // Arrow down moves focus
    await user.keyboard('{ArrowDown}')
    const updatedOptions = screen.getAllByRole('option')
    expect(updatedOptions[0].getAttribute('aria-selected')).toBe('false')
    expect(updatedOptions[1].getAttribute('aria-selected')).toBe('true')
  })

  it('selects item on Enter key', async () => {
    const user = userEvent.setup()
    const { onSelect } = renderCommand()

    // Press Enter to select first item
    await user.keyboard('{Enter}')
    expect(onSelect).toHaveBeenCalledWith('new-file')
  })

  it('does not select disabled items on click', async () => {
    const user = userEvent.setup()
    const { onSelect } = renderCommand()

    const redo = screen.getByText('Redo')
    await user.click(redo)
    expect(onSelect).not.toHaveBeenCalled()
  })

  it('renders keyboard shortcuts', () => {
    renderCommand()
    expect(screen.getByText('⌘N')).toBeDefined()
    expect(screen.getByText('⌘O')).toBeDefined()
    expect(screen.getByText('⌘S')).toBeDefined()
  })

  it('uses custom placeholder text', () => {
    renderCommand({ placeholder: 'Search actions...' })
    const input = screen.getByRole('combobox')
    expect(input.getAttribute('placeholder')).toBe('Search actions...')
  })
})
