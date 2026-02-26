import type { Meta, StoryObj } from '@storybook/react'
import { MessageThread } from '@surf-kit/agent'
import type { ChatMessage } from '@surf-kit/agent'

const meta: Meta<typeof MessageThread> = {
  title: 'Agent/MessageThread',
  component: MessageThread,
}
export default meta
type Story = StoryObj<typeof MessageThread>

const messages: ChatMessage[] = [
  { id: '1', role: 'user', content: 'Hi there!', timestamp: new Date() },
  {
    id: '2',
    role: 'assistant',
    content: 'Hello! How can I help you today?',
    timestamp: new Date(),
  },
  { id: '3', role: 'user', content: 'What is the weather like?', timestamp: new Date() },
  {
    id: '4',
    role: 'assistant',
    content: "I'm a text-based assistant, so I can't check real-time weather. But I recommend checking a weather service.",
    timestamp: new Date(),
  },
]

export const Default: Story = {
  args: { messages },
  decorators: [
    (Story) => (
      <div style={{ height: 400, display: 'flex' }}>
        <Story />
      </div>
    ),
  ],
}

export const Empty: Story = {
  args: { messages: [] },
  decorators: [
    (Story) => (
      <div style={{ height: 400, display: 'flex' }}>
        <Story />
      </div>
    ),
  ],
}
