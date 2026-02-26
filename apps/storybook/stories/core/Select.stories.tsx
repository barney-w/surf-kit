import type { Meta, StoryObj } from '@storybook/react'
import { Select } from '@surf-kit/core'

const items = [
  { key: 'cat', label: 'Cat' },
  { key: 'dog', label: 'Dog' },
  { key: 'fish', label: 'Fish' },
  { key: 'bird', label: 'Bird' },
]

const meta: Meta<typeof Select> = {
  title: 'Core/Select',
  component: Select,
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    isDisabled: { control: 'boolean' },
    errorMessage: { control: 'text' },
  },
}
export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
  args: { label: 'Favorite pet', items },
}

export const WithPlaceholder: Story = {
  args: { label: 'Favorite pet', items, placeholder: 'Choose a pet...' },
}

export const Disabled: Story = {
  args: { label: 'Favorite pet', items, isDisabled: true },
}

export const WithError: Story = {
  args: { label: 'Favorite pet', items, errorMessage: 'Please select a pet.' },
}
