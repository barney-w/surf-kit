import type { Meta, StoryObj } from '@storybook/react'
import { FeedbackConfirmation } from '@surf-kit/agent'

const meta: Meta<typeof FeedbackConfirmation> = {
  title: 'Agent/FeedbackConfirmation',
  component: FeedbackConfirmation,
}
export default meta
type Story = StoryObj<typeof FeedbackConfirmation>

export const Inline: Story = {
  args: { variant: 'inline' },
}

export const Toast: Story = {
  args: { variant: 'toast' },
}
