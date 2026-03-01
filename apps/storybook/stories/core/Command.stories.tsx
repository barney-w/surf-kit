import type { Meta, StoryObj } from '@storybook/react'
import { Command } from '@surf-kit/core'
import { useState } from 'react'

const meta: Meta<typeof Command> = {
  title: 'Core/Overlay/Command',
  component: Command,
}
export default meta
type Story = StoryObj<typeof Command>

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true)
    return (
      <div>
        <button type="button" onClick={() => setIsOpen(true)}>
          Open Command Palette
        </button>
        <Command
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSelect={(v) => {
            console.log('Selected:', v)
            setIsOpen(false)
          }}
        >
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
            <Command.Item value="redo" shortcut="⌘⇧Z">
              Redo
            </Command.Item>
          </Command.Group>
        </Command>
      </div>
    )
  },
}

export const WithIcons: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true)
    const Icon = () => (
      <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0Z" />
      </svg>
    )
    return (
      <div>
        <button type="button" onClick={() => setIsOpen(true)}>
          Open Command Palette
        </button>
        <Command
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSelect={(v) => {
            console.log('Selected:', v)
            setIsOpen(false)
          }}
        >
          <Command.Group heading="Actions">
            <Command.Item value="search" icon={<Icon />} shortcut="⌘K">
              Search
            </Command.Item>
            <Command.Item value="settings" icon={<Icon />} shortcut="⌘,">
              Settings
            </Command.Item>
            <Command.Item value="disabled-item" icon={<Icon />} isDisabled>
              Disabled Action
            </Command.Item>
          </Command.Group>
        </Command>
      </div>
    )
  },
}
