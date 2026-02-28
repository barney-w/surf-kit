import type { Meta, StoryObj } from '@storybook/react'
import { ContextMenu } from '@surf-kit/core'
import React from 'react'

const meta: Meta<typeof ContextMenu> = {
  title: 'Core/Overlay/ContextMenu',
  component: ContextMenu,
}
export default meta
type Story = StoryObj<typeof ContextMenu>

export const Default: Story = {
  render: () => (
    <ContextMenu
      items={[
        { key: 'copy', label: 'Copy' },
        { key: 'paste', label: 'Paste' },
        { key: 'delete', label: 'Delete', isDanger: true },
      ]}
      onAction={(key) => console.log(key)}
    >
      <div
        style={{
          padding: '4rem',
          border: '1px dashed gray',
          borderRadius: '0.5rem',
          textAlign: 'center',
        }}
      >
        Right-click in this area
      </div>
    </ContextMenu>
  ),
}

export const WithDisabledItems: Story = {
  render: () => (
    <ContextMenu
      items={[
        { key: 'cut', label: 'Cut' },
        { key: 'copy', label: 'Copy' },
        { key: 'paste', label: 'Paste', isDisabled: true },
        { key: 'delete', label: 'Delete', isDanger: true },
      ]}
      onAction={(key) => console.log(key)}
    >
      <div
        style={{
          padding: '4rem',
          border: '1px dashed gray',
          borderRadius: '0.5rem',
          textAlign: 'center',
        }}
      >
        Right-click here (Paste is disabled)
      </div>
    </ContextMenu>
  ),
}
