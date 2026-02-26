import type { Meta, StoryObj } from '@storybook/react'
import { DataList } from '@surf-kit/core'
import React from 'react'

const meta: Meta<typeof DataList> = {
  title: 'Core/DataList',
  component: DataList,
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
  },
}
export default meta
type Story = StoryObj<typeof DataList>

const items = [
  { label: 'Name', value: 'Alice Johnson' },
  { label: 'Email', value: 'alice@example.com' },
  { label: 'Role', value: 'Administrator' },
  { label: 'Status', value: 'Active' },
]

export const Horizontal: Story = {
  render: () => <DataList items={items} />,
}

export const Vertical: Story = {
  render: () => <DataList items={items} orientation="vertical" />,
}
