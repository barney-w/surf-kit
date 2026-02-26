import type { Meta, StoryObj } from '@storybook/react'
import { RoutingIndicator } from '@surf-kit/agent'

const meta: Meta<typeof RoutingIndicator> = {
  title: 'Agent/RoutingIndicator',
  component: RoutingIndicator,
}
export default meta
type Story = StoryObj<typeof RoutingIndicator>

export const Default: Story = {
  args: {
    from: 'coordinator',
    to: 'hr_agent',
  },
}

export const WithReason: Story = {
  args: {
    from: 'coordinator',
    to: 'hr_agent',
    reason: 'leave question detected',
  },
}

export const LongRoute: Story = {
  args: {
    from: 'main_coordinator',
    to: 'specialized_finance_reporting_agent',
    reason: 'quarterly report request',
  },
}
