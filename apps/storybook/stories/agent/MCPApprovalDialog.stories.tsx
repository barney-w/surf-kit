import type { Meta, StoryObj } from '@storybook/react'
import { MCPApprovalDialog } from '@surf-kit/agent'

const meta: Meta<typeof MCPApprovalDialog> = {
  title: 'Agent/MCPApprovalDialog',
  component: MCPApprovalDialog,
  args: {
    isOpen: true,
    onApprove: () => alert('Approved'),
    onDeny: () => alert('Denied'),
  },
}
export default meta
type Story = StoryObj<typeof MCPApprovalDialog>

export const LowRisk: Story = {
  args: {
    call: {
      id: 'call-1',
      name: 'read_file',
      serverName: 'filesystem',
      arguments: { path: '/src/index.ts' },
      status: 'pending',
    },
    riskLevel: 'low',
  },
}

export const MediumRisk: Story = {
  args: {
    call: {
      id: 'call-2',
      name: 'write_file',
      serverName: 'filesystem',
      arguments: { path: '/src/config.ts', content: 'export default {}' },
      status: 'pending',
    },
    riskLevel: 'medium',
  },
}

export const HighRisk: Story = {
  args: {
    call: {
      id: 'call-3',
      name: 'execute_command',
      serverName: 'shell',
      arguments: { command: 'rm -rf /tmp/cache' },
      status: 'pending',
    },
    riskLevel: 'high',
  },
}

export const NoArguments: Story = {
  args: {
    call: {
      id: 'call-4',
      name: 'get_status',
      arguments: {},
      status: 'pending',
    },
    riskLevel: 'low',
  },
}
