import type { Meta, StoryObj } from '@storybook/react'
import { AgentPanel } from '@surf-kit/agent'
import type React from 'react'
import { useState } from 'react'

const meta: Meta<typeof AgentPanel> = {
  title: 'Agent/Layouts/AgentPanel',
  component: AgentPanel,
  parameters: {
    layout: 'fullscreen',
  },
}
export default meta
type Story = StoryObj<typeof AgentPanel>

const PanelWrapper = (args: React.ComponentProps<typeof AgentPanel>) => {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <div style={{ padding: 24 }}>
      <button type="button" onClick={() => setIsOpen(true)}>
        Open Panel
      </button>
      <AgentPanel {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  )
}

export const RightSide: Story = {
  render: (args) => <PanelWrapper {...args} />,
  args: {
    endpoint: 'https://api.example.com',
    isOpen: true,
    onClose: () => {},
    title: 'Agent Panel',
    side: 'right',
  },
}

export const LeftSide: Story = {
  render: (args) => <PanelWrapper {...args} />,
  args: {
    endpoint: 'https://api.example.com',
    isOpen: true,
    onClose: () => {},
    title: 'Agent Panel',
    side: 'left',
  },
}

export const CustomWidth: Story = {
  render: (args) => <PanelWrapper {...args} />,
  args: {
    endpoint: 'https://api.example.com',
    isOpen: true,
    onClose: () => {},
    title: 'Wide Panel',
    width: 600,
  },
}
