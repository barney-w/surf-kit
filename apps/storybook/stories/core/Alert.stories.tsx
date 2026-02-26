import type { Meta, StoryObj } from '@storybook/react'
import { Alert } from '@surf-kit/core'
import { fn } from '@storybook/test'

const meta: Meta<typeof Alert> = {
  title: 'Core/Alert',
  component: Alert,
  argTypes: {
    intent: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
  },
}
export default meta
type Story = StoryObj<typeof Alert>

export const Info: Story = {
  args: { intent: 'info', title: 'Information', children: 'This is an informational alert.' },
}

export const Success: Story = {
  args: { intent: 'success', title: 'Success', children: 'Operation completed successfully.' },
}

export const Warning: Story = {
  args: { intent: 'warning', title: 'Warning', children: 'Please review before continuing.' },
}

export const Error: Story = {
  args: { intent: 'error', title: 'Error', children: 'Something went wrong.' },
}

export const Dismissible: Story = {
  args: {
    intent: 'info',
    title: 'Dismissible',
    children: 'Click the X to dismiss this alert.',
    onDismiss: fn(),
  },
}
