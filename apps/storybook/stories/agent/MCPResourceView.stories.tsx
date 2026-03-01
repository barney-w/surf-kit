import type { Meta, StoryObj } from '@storybook/react'
import { MCPResourceView } from '@surf-kit/agent'

const meta: Meta<typeof MCPResourceView> = {
  title: 'Agent/MCPResourceView',
  component: MCPResourceView,
}
export default meta
type Story = StoryObj<typeof MCPResourceView>

export const TextContent: Story = {
  args: {
    resource: {
      uri: 'file:///src/index.ts',
      name: 'index.ts',
      mimeType: 'text/typescript',
      content:
        'export const hello = "world"\nexport function add(a: number, b: number) {\n  return a + b\n}',
    },
  },
}

export const JsonContent: Story = {
  args: {
    resource: {
      uri: 'file:///config.json',
      name: 'config.json',
      mimeType: 'application/json',
      content: JSON.stringify({ name: 'my-app', version: '1.0.0', dependencies: {} }, null, 2),
    },
  },
}

export const ImageContent: Story = {
  args: {
    resource: {
      uri: 'file:///assets/logo.png',
      name: 'logo.png',
      mimeType: 'image/png',
      content: 'https://via.placeholder.com/300x200?text=MCP+Resource',
    },
  },
}

export const UrlContent: Story = {
  args: {
    resource: {
      uri: 'web://documentation',
      name: 'API Documentation',
      mimeType: 'text/plain',
      description: 'Link to the public API docs',
      content: 'https://docs.example.com/api/v2',
    },
  },
}

export const WithDescription: Story = {
  args: {
    resource: {
      uri: 'file:///README.md',
      name: 'README.md',
      mimeType: 'text/markdown',
      description: 'Project readme file with setup instructions',
      content: '# My Project\n\nA sample project for testing.',
    },
  },
}

export const NoContent: Story = {
  args: {
    resource: {
      uri: 'file:///empty.txt',
      name: 'empty.txt',
    },
  },
}
