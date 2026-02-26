import type { Meta, StoryObj } from '@storybook/react'
import { ThumbsFeedback } from '@surf-kit/agent'
import { fn } from '@storybook/test'

const meta: Meta<typeof ThumbsFeedback> = {
  title: 'Agent/ThumbsFeedback',
  component: ThumbsFeedback,
}
export default meta
type Story = StoryObj<typeof ThumbsFeedback>

export const Default: Story = {
  args: { messageId: 'msg-1', onFeedback: fn() },
}

export const WithNegativeCallback: Story = {
  args: { messageId: 'msg-1', onFeedback: fn(), onNegative: fn() },
}
