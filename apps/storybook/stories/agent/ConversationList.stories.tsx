import type { Meta, StoryObj } from '@storybook/react'
import { ConversationList } from '@surf-kit/agent'

const meta: Meta<typeof ConversationList> = {
  title: 'Agent/ConversationList',
  component: ConversationList,
  decorators: [
    (Story) => (
      <div style={{ height: 500, width: 300, border: '1px solid #e5e7eb', borderRadius: 8 }}>
        <Story />
      </div>
    ),
  ],
}
export default meta
type Story = StoryObj<typeof ConversationList>

const sampleConversations = [
  {
    id: '1',
    title: 'Leave policy question',
    lastMessage: 'How many days of PTO do I have?',
    updatedAt: new Date('2025-06-15'),
    messageCount: 4,
  },
  {
    id: '2',
    title: 'Password reset help',
    lastMessage: 'I need to reset my VPN password',
    updatedAt: new Date('2025-06-14'),
    messageCount: 6,
  },
  {
    id: '3',
    title: 'Meeting notes summary',
    lastMessage: 'Can you summarize the Q3 board meeting?',
    updatedAt: new Date('2025-06-13'),
    messageCount: 2,
  },
]

export const Default: Story = {
  args: {
    conversations: sampleConversations,
    onSelect: (id) => console.log('Selected:', id),
  },
}

export const WithActiveConversation: Story = {
  args: {
    conversations: sampleConversations,
    activeId: '2',
    onSelect: (id) => console.log('Selected:', id),
  },
}

export const WithDeleteAndNew: Story = {
  args: {
    conversations: sampleConversations,
    activeId: '1',
    onSelect: (id) => console.log('Selected:', id),
    onDelete: (id) => console.log('Deleted:', id),
    onNew: () => console.log('New conversation'),
  },
}

export const Empty: Story = {
  args: {
    conversations: [],
    onSelect: (id) => console.log('Selected:', id),
    onNew: () => console.log('New conversation'),
  },
}
