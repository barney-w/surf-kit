import type { Meta, StoryObj } from '@storybook/react'
import { Tabs } from '@surf-kit/core'
import React from 'react'

const meta: Meta<typeof Tabs> = {
  title: 'Core/Tabs',
  component: Tabs,
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
  },
}
export default meta
type Story = StoryObj<typeof Tabs>

const items = [
  { key: 'overview', title: 'Overview', content: 'Overview content goes here.' },
  { key: 'details', title: 'Details', content: 'Details content goes here.' },
  { key: 'settings', title: 'Settings', content: 'Settings content goes here.' },
]

export const Default: Story = {
  render: () => <Tabs items={items} />,
}

export const Vertical: Story = {
  render: () => <Tabs items={items} orientation="vertical" />,
}

export const Controlled: Story = {
  render: () => {
    const [selected, setSelected] = React.useState('details')
    return (
      <Tabs items={items} selectedKey={selected} onSelectionChange={setSelected} />
    )
  },
}
