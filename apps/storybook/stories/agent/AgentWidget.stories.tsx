import type { Meta, StoryObj } from '@storybook/react'
import { AgentWidget } from '@surf-kit/agent'

const meta: Meta<typeof AgentWidget> = {
  title: 'Agent/Layouts/AgentWidget',
  component: AgentWidget,
  parameters: {
    layout: 'fullscreen',
  },
}
export default meta
type Story = StoryObj<typeof AgentWidget>

export const BottomRight: Story = {
  args: {
    endpoint: 'https://api.example.com',
    position: 'bottom-right',
    triggerLabel: 'Chat with AI',
    title: 'AI Assistant',
  },
}

export const BottomLeft: Story = {
  args: {
    endpoint: 'https://api.example.com',
    position: 'bottom-left',
    triggerLabel: 'Help',
    title: 'Support Bot',
  },
}
