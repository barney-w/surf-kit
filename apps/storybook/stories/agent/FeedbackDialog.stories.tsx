import type { Meta, StoryObj } from '@storybook/react'
import { FeedbackDialog } from '@surf-kit/agent'
import { fn } from '@storybook/test'

const meta: Meta<typeof FeedbackDialog> = {
  title: 'Agent/FeedbackDialog',
  component: FeedbackDialog,
}
export default meta
type Story = StoryObj<typeof FeedbackDialog>

export const Open: Story = {
  args: { isOpen: true, onClose: fn(), onSubmit: fn() },
}

export const Closed: Story = {
  args: { isOpen: false, onClose: fn(), onSubmit: fn() },
}
