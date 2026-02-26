import type { Meta, StoryObj } from '@storybook/react'
import { Sidebar } from '@surf-kit/core'
import React, { useState } from 'react'

const meta: Meta<typeof Sidebar> = {
  title: 'Core/Sidebar',
  component: Sidebar,
}
export default meta
type Story = StoryObj<typeof Sidebar>

function SidebarDemo() {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <div style={{ height: 400, display: 'flex' }}>
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)}>
        <div style={{ padding: 16 }}>
          {!collapsed && (
            <ul>
              <li>Dashboard</li>
              <li>Messages</li>
              <li>Settings</li>
            </ul>
          )}
        </div>
      </Sidebar>
      <div style={{ flex: 1, padding: 16 }}>Main content area</div>
    </div>
  )
}

export const Default: Story = {
  render: () => <SidebarDemo />,
}

export const Collapsed: Story = {
  render: () => (
    <div style={{ height: 400, display: 'flex' }}>
      <Sidebar collapsed>
        <div style={{ padding: 8 }}>Icons</div>
      </Sidebar>
      <div style={{ flex: 1, padding: 16 }}>Main content</div>
    </div>
  ),
}
