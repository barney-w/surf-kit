import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from '@surf-kit/core'

const meta: Meta<typeof Checkbox> = {
  title: 'Core/Checkbox',
  component: Checkbox,
  argTypes: {
    label: { control: 'text' },
    isSelected: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
    isIndeterminate: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: { label: 'Accept terms and conditions' },
}

export const Checked: Story = {
  args: { label: 'Accept terms and conditions', isSelected: true },
}

export const Disabled: Story = {
  args: { label: 'Accept terms and conditions', isDisabled: true },
}

export const Indeterminate: Story = {
  args: { label: 'Select all', isIndeterminate: true },
}
