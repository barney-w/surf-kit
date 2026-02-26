import type { Meta, StoryObj } from '@storybook/react'
import { AgentFullPage } from '@surf-kit/agent'

const meta: Meta<typeof AgentFullPage> = {
  title: 'Agent/Layouts/AgentFullPage',
  component: AgentFullPage,
  parameters: {
    layout: 'fullscreen',
  },
}
export default meta
type Story = StoryObj<typeof AgentFullPage>

export const Default: Story = {
  args: {
    endpoint: 'https://api.example.com',
    title: 'AI Assistant',
  },
}

export const WithSidebar: Story = {
  args: {
    endpoint: 'https://api.example.com',
    title: 'AI Assistant',
    showConversationList: true,
    conversations: [
      {
        id: '1',
        title: 'Leave policy',
        lastMessage: 'How many days of PTO?',
        updatedAt: new Date(),
        messageCount: 4,
      },
      {
        id: '2',
        title: 'Password reset',
        lastMessage: 'I need to reset my password',
        updatedAt: new Date(),
        messageCount: 2,
      },
    ],
    activeConversationId: '1',
  },
}
