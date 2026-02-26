import type { Meta, StoryObj } from '@storybook/react'
import { MessageBubble } from '@surf-kit/agent'
import type { ChatMessage } from '@surf-kit/agent'

const meta: Meta<typeof MessageBubble> = {
  title: 'Agent/MessageBubble',
  component: MessageBubble,
}
export default meta
type Story = StoryObj<typeof MessageBubble>

const userMessage: ChatMessage = {
  id: 'msg-1',
  role: 'user',
  content: 'How do I reset my password?',
  timestamp: new Date(),
}

const assistantMessage: ChatMessage = {
  id: 'msg-2',
  role: 'assistant',
  content:
    'You can reset your password by going to Settings > Security > Change Password. You will need to enter your current password and then choose a new one.',
  agent: 'HelpBot',
  timestamp: new Date(),
}

export const User: Story = {
  args: { message: userMessage },
}

export const Assistant: Story = {
  args: { message: assistantMessage },
}

export const AssistantWithAgent: Story = {
  args: { message: assistantMessage, showAgent: true },
}

export const BothMessages: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: 600 }}>
      <MessageBubble message={userMessage} />
      <MessageBubble message={assistantMessage} showAgent />
    </div>
  ),
}
