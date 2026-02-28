import type { Meta, StoryObj } from '@storybook/react'
import { Collapsible } from '@surf-kit/core'
import React from 'react'

const meta: Meta<typeof Collapsible> = {
  title: 'Core/Data/Collapsible',
  component: Collapsible,
}
export default meta
type Story = StoryObj<typeof Collapsible>

export const Default: Story = {
  render: () => (
    <Collapsible>
      <Collapsible.Trigger>Toggle Content</Collapsible.Trigger>
      <Collapsible.Content>
        <p>This is the collapsible content.</p>
      </Collapsible.Content>
    </Collapsible>
  ),
}

export const DefaultOpen: Story = {
  render: () => (
    <Collapsible defaultOpen>
      <Collapsible.Trigger>Toggle Content</Collapsible.Trigger>
      <Collapsible.Content>
        <p>This content starts visible.</p>
      </Collapsible.Content>
    </Collapsible>
  ),
}
