import type { Meta, StoryObj } from '@storybook/react'
import { AgentAvatar } from '@surf-kit/agent'

const meta: Meta<typeof AgentAvatar> = {
  title: 'Agent/AgentAvatar',
  component: AgentAvatar,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
}
export default meta
type Story = StoryObj<typeof AgentAvatar>

const hrAgent = { id: 'hr-agent', label: 'HR Agent', accent: '#10b981' }
const financeAgent = { id: 'finance', label: 'Finance Bot', accent: '#f59e0b' }

export const Default: Story = {
  args: { agent: hrAgent },
}

export const Small: Story = {
  args: { agent: hrAgent, size: 'sm' },
}

export const Large: Story = {
  args: { agent: financeAgent, size: 'lg' },
}

export const WithAgentId: Story = {
  args: {
    agentId: 'hr-agent',
    agentThemes: { 'hr-agent': hrAgent },
    size: 'md',
  },
}
