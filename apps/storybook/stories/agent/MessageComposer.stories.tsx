import type { Meta, StoryObj } from '@storybook/react'
import { MessageComposer } from '@surf-kit/agent'
import { action } from '@storybook/addon-actions'

const meta: Meta<typeof MessageComposer> = {
  title: 'Agent/MessageComposer',
  component: MessageComposer,
}
export default meta
type Story = StoryObj<typeof MessageComposer>

export const Default: Story = {
  args: {
    onSend: action('onSend'),
  },
}

export const Loading: Story = {
  args: {
    onSend: action('onSend'),
    isLoading: true,
  },
}

export const CustomPlaceholder: Story = {
  args: {
    onSend: action('onSend'),
    placeholder: 'Ask a question...',
  },
}
