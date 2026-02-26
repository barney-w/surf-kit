import type { Meta, StoryObj } from '@storybook/react'
import { Breadcrumb } from '@surf-kit/core'
import React from 'react'

const meta: Meta<typeof Breadcrumb> = {
  title: 'Core/Breadcrumb',
  component: Breadcrumb,
}
export default meta
type Story = StoryObj<typeof Breadcrumb>

export const Default: Story = {
  render: () => (
    <Breadcrumb
      items={[
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Widget' },
      ]}
    />
  ),
}

export const TwoLevels: Story = {
  render: () => (
    <Breadcrumb
      items={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Settings' },
      ]}
    />
  ),
}
