import type { Meta, StoryObj } from '@storybook/react'
import { AgentHandoff } from '@surf-kit/agent'

const meta: Meta<typeof AgentHandoff> = {
  title: 'Agent/AgentHandoff',
  component: AgentHandoff,
}
export default meta
type Story = StoryObj<typeof AgentHandoff>

export const Default: Story = {
  args: {
    from: { id: 'coordinator', label: 'Coordinator', accent: '#6366f1' },
    to: { id: 'hr-agent', label: 'HR Agent', accent: '#10b981' },
  },
}

export const FinanceHandoff: Story = {
  args: {
    from: { id: 'coordinator', label: 'Coordinator', accent: '#6366f1' },
    to: { id: 'finance', label: 'Finance Bot', accent: '#f59e0b' },
  },
}
