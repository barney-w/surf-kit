import type { Meta, StoryObj } from '@storybook/react'
import { AgentEmbed } from '@surf-kit/agent'

const meta: Meta<typeof AgentEmbed> = {
  title: 'Agent/Layouts/AgentEmbed',
  component: AgentEmbed,
  decorators: [
    (Story) => (
      <div style={{ height: 500, width: '100%', border: '1px solid #e5e7eb' }}>
        <Story />
      </div>
    ),
  ],
}
export default meta
type Story = StoryObj<typeof AgentEmbed>

export const Default: Story = {
  args: {
    endpoint: 'https://api.example.com',
    title: 'Embedded Chat',
  },
}

export const CustomClass: Story = {
  args: {
    endpoint: 'https://api.example.com',
    title: 'Styled Embed',
    className: 'bg-gray-50',
  },
}
