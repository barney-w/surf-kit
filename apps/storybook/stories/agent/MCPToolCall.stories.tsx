import type { Meta, StoryObj } from '@storybook/react'
import { MCPToolCall } from '@surf-kit/agent'

const meta: Meta<typeof MCPToolCall> = {
  title: 'Agent/MCPToolCall',
  component: MCPToolCall,
}
export default meta
type Story = StoryObj<typeof MCPToolCall>

export const Pending: Story = {
  args: {
    call: {
      id: 'call-1',
      name: 'read_file',
      arguments: { path: '/src/index.ts' },
      status: 'pending',
    },
  },
}

export const Running: Story = {
  args: {
    call: {
      id: 'call-2',
      name: 'search_code',
      serverName: 'filesystem',
      arguments: { query: 'export default', include: '*.tsx' },
      status: 'running',
      startedAt: new Date('2026-01-01T00:00:00Z'),
    },
  },
}

export const Success: Story = {
  args: {
    call: {
      id: 'call-3',
      name: 'read_file',
      serverName: 'filesystem',
      arguments: { path: '/src/utils.ts' },
      result: { content: 'export function add(a: number, b: number) { return a + b }' },
      status: 'success',
      startedAt: new Date('2026-01-01T00:00:00Z'),
      completedAt: new Date('2026-01-01T00:00:00.350Z'),
    },
  },
}

export const ErrorState: Story = {
  args: {
    call: {
      id: 'call-4',
      name: 'write_file',
      arguments: { path: '/etc/hosts', content: '127.0.0.1 evil.com' },
      error: 'Permission denied: cannot write to /etc/hosts',
      status: 'error',
      startedAt: new Date('2026-01-01T00:00:00Z'),
      completedAt: new Date('2026-01-01T00:00:00.120Z'),
    },
  },
}

export const SuccessExpanded: Story = {
  args: {
    call: {
      id: 'call-5',
      name: 'list_directory',
      serverName: 'filesystem',
      arguments: { path: '/src', recursive: true },
      result: ['index.ts', 'utils.ts', 'types/', 'types/mcp.ts'],
      status: 'success',
      startedAt: new Date('2026-01-01T00:00:00Z'),
      completedAt: new Date('2026-01-01T00:00:02.1Z'),
    },
    isExpanded: true,
  },
}

export const ErrorExpanded: Story = {
  args: {
    call: {
      id: 'call-6',
      name: 'execute_command',
      arguments: { command: 'rm -rf /' },
      error: 'Command rejected: destructive operation not allowed',
      status: 'error',
      startedAt: new Date('2026-01-01T00:00:00Z'),
      completedAt: new Date('2026-01-01T00:00:00.050Z'),
    },
    isExpanded: true,
  },
}
