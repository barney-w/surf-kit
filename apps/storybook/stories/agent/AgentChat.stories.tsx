import type { Meta, StoryObj } from '@storybook/react'
import { AgentChat } from '@surf-kit/agent'

const meta: Meta<typeof AgentChat> = {
  title: 'Agent/AgentChat',
  component: AgentChat,
  decorators: [
    (Story) => (
      <div style={{ height: 600, maxWidth: 700 }}>
        <Story />
      </div>
    ),
  ],
}
export default meta
type Story = StoryObj<typeof AgentChat>

export const Default: Story = {
  args: {
    endpoint: 'https://api.example.com',
    title: 'AI Assistant',
    welcomeMessage: 'Hello! I can help you with questions about our platform.',
    suggestedQuestions: [
      'How do I get started?',
      'What features are available?',
      'Show me an example',
    ],
  },
}

export const MinimalConfig: Story = {
  args: {
    endpoint: 'https://api.example.com',
  },
}

export const CustomTitle: Story = {
  args: {
    endpoint: 'https://api.example.com',
    title: 'Research Agent',
    welcomeMessage: 'I can help you research any topic. What would you like to know?',
    suggestedQuestions: [
      'Summarize recent papers on AI',
      'Compare React vs Vue',
      'Explain quantum computing',
    ],
  },
}
