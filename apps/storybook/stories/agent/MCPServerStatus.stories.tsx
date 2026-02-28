import type { Meta, StoryObj } from '@storybook/react'
import { MCPServerStatus } from '@surf-kit/agent'

const meta: Meta<typeof MCPServerStatus> = {
  title: 'Agent/MCPServerStatus',
  component: MCPServerStatus,
}
export default meta
type Story = StoryObj<typeof MCPServerStatus>

export const Connected: Story = {
  args: {
    server: {
      name: 'filesystem',
      version: '1.2.0',
      status: 'connected',
      tools: [
        { name: 'read_file', description: 'Read a file from disk' },
        { name: 'write_file', description: 'Write content to a file' },
        { name: 'list_directory', description: 'List directory contents' },
      ],
      resources: [
        { uri: 'file:///src', name: 'Source directory' },
        { uri: 'file:///docs', name: 'Documentation' },
      ],
      lastPing: new Date(),
    },
  },
}

export const Disconnected: Story = {
  args: {
    server: {
      name: 'database',
      version: '0.8.3',
      status: 'disconnected',
      tools: [
        { name: 'query', description: 'Execute a SQL query' },
      ],
      resources: [],
    },
  },
}

export const Error: Story = {
  args: {
    server: {
      name: 'web-scraper',
      status: 'error',
      tools: [],
      resources: [],
    },
  },
}

export const NoVersion: Story = {
  args: {
    server: {
      name: 'custom-server',
      status: 'connected',
      tools: [
        { name: 'process' },
      ],
      resources: [
        { uri: 'custom://data', name: 'Data feed' },
      ],
      lastPing: new Date(),
    },
  },
}
