import type { Meta, StoryObj } from '@storybook/react'
import { AgentLabel } from '@surf-kit/agent'

const meta: Meta<typeof AgentLabel> = {
  title: 'Agent/AgentLabel',
  component: AgentLabel,
}
export default meta
type Story = StoryObj<typeof AgentLabel>

export const Default: Story = {
  args: {
    agent: { id: 'hr-agent', label: 'HR Agent', accent: '#10b981' },
  },
}

export const CustomAccent: Story = {
  args: {
    agent: { id: 'finance', label: 'Finance Bot', accent: '#f59e0b' },
  },
}

export const NoAccent: Story = {
  args: {
    agent: { id: 'generic', label: 'Generic Agent' },
  },
}
