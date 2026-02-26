import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from '@surf-kit/core'

const meta: Meta<typeof Switch> = {
  title: 'Core/Switch',
  component: Switch,
  argTypes: {
    label: { control: 'text' },
    isSelected: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {
  args: { label: 'Dark mode' },
}

export const On: Story = {
  args: { label: 'Dark mode', isSelected: true },
}

export const Disabled: Story = {
  args: { label: 'Dark mode', isDisabled: true },
}
