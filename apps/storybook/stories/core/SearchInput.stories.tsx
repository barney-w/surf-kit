import type { Meta, StoryObj } from '@storybook/react'
import { SearchInput } from '@surf-kit/core'

const meta: Meta<typeof SearchInput> = {
  title: 'Core/SearchInput',
  component: SearchInput,
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    isDisabled: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof SearchInput>

export const Default: Story = {
  args: { label: 'Search', placeholder: 'Search...' },
}

export const WithValue: Story = {
  args: { label: 'Search', placeholder: 'Search...', value: 'React' },
}

export const Disabled: Story = {
  args: { label: 'Search', placeholder: 'Search...', isDisabled: true },
}
