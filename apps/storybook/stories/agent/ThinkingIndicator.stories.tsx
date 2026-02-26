import type { Meta, StoryObj } from '@storybook/react'
import { ThinkingIndicator } from '@surf-kit/agent'

const meta: Meta<typeof ThinkingIndicator> = {
  title: 'Agent/ThinkingIndicator',
  component: ThinkingIndicator,
}
export default meta
type Story = StoryObj<typeof ThinkingIndicator>

export const Default: Story = {
  args: {},
}

export const CustomLabel: Story = {
  args: { label: 'Processing your request...' },
}
