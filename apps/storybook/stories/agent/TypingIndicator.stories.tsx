import type { Meta, StoryObj } from '@storybook/react'
import { TypingIndicator } from '@surf-kit/agent'

const meta: Meta<typeof TypingIndicator> = {
  title: 'Agent/TypingIndicator',
  component: TypingIndicator,
}
export default meta
type Story = StoryObj<typeof TypingIndicator>

export const Default: Story = {
  args: {},
}

export const WithLabel: Story = {
  args: { label: 'Agent is typing' },
}

export const CustomDotCount: Story = {
  args: { dotCount: 5 },
}
