import type { Meta, StoryObj } from '@storybook/react'
import { FeedbackDialog } from '@surf-kit/agent'

const meta: Meta<typeof FeedbackDialog> = {
  title: 'Agent/FeedbackDialog',
  component: FeedbackDialog,
}
export default meta
type Story = StoryObj<typeof FeedbackDialog>

export const Open: Story = {
  args: { isOpen: true, onClose: () => {}, onSubmit: () => {} },
}

export const Closed: Story = {
  args: { isOpen: false, onClose: () => {}, onSubmit: () => {} },
}
