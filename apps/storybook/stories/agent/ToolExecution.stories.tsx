import type { Meta, StoryObj } from '@storybook/react'
import { ToolExecution } from '@surf-kit/agent'

const meta: Meta<typeof ToolExecution> = {
  title: 'Agent/ToolExecution',
  component: ToolExecution,
}
export default meta
type Story = StoryObj<typeof ToolExecution>

export const Search: Story = {
  args: { tool: 'search' },
}

export const Retrieve: Story = {
  args: { tool: 'retrieve' },
}

export const CustomLabel: Story = {
  args: { tool: 'analyze', label: 'Analyzing sentiment data...' },
}

export const UnknownTool: Story = {
  args: { tool: 'custom-plugin' },
}
