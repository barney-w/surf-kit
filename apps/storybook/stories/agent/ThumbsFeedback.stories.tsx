import type { Meta, StoryObj } from '@storybook/react'
import { ThumbsFeedback } from '@surf-kit/agent'

const meta: Meta<typeof ThumbsFeedback> = {
  title: 'Agent/ThumbsFeedback',
  component: ThumbsFeedback,
}
export default meta
type Story = StoryObj<typeof ThumbsFeedback>

export const Default: Story = {
  args: { messageId: 'msg-1', onFeedback: () => {} },
}

export const WithNegativeCallback: Story = {
  args: { messageId: 'msg-1', onFeedback: () => {}, onNegative: () => {} },
}
