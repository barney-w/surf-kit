import type { Meta, StoryObj } from '@storybook/react'
import { DropdownMenu } from '@surf-kit/core'

const meta: Meta = {
  title: 'Core/DropdownMenu',
}
export default meta

const items = [
  { key: 'edit', label: 'Edit' },
  { key: 'duplicate', label: 'Duplicate' },
  { key: 'delete', label: 'Delete' },
  { key: 'disabled', label: 'Disabled Item', isDisabled: true },
]

export const Default: StoryObj = {
  render: () => (
    <DropdownMenu
      trigger={<button type="button">Actions</button>}
      items={items}
      onAction={(key) => console.log('Selected:', key)}
      aria-label="Actions menu"
    />
  ),
}
