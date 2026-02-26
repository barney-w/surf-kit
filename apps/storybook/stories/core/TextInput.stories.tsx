import type { Meta, StoryObj } from '@storybook/react'
import { TextInput } from '@surf-kit/core'

const meta: Meta<typeof TextInput> = {
  title: 'Core/TextInput',
  component: TextInput,
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    errorMessage: { control: 'text' },
    placeholder: { control: 'text' },
    isDisabled: { control: 'boolean' },
    isRequired: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof TextInput>

export const Default: Story = {
  args: { label: 'Email', placeholder: 'you@example.com' },
}

export const WithDescription: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    description: 'We will never share your email.',
  },
}

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    errorMessage: 'Please enter a valid email address.',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    isDisabled: true,
  },
}

export const Required: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    isRequired: true,
  },
}
