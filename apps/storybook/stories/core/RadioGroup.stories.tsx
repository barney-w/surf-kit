import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup } from '@surf-kit/core'

const items = [
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
]

const meta: Meta<typeof RadioGroup> = {
  title: 'Core/RadioGroup',
  component: RadioGroup,
  argTypes: {
    label: { control: 'text' },
    orientation: { control: 'radio', options: ['vertical', 'horizontal'] },
  },
}
export default meta
type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  args: { label: 'Size', items },
}

export const Horizontal: Story = {
  args: { label: 'Size', items, orientation: 'horizontal' },
}

export const WithSelection: Story = {
  args: { label: 'Size', items, value: 'md' },
}
