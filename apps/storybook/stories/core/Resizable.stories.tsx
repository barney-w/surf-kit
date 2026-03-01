import type { Meta, StoryObj } from '@storybook/react'
import { Resizable } from '@surf-kit/core'

const meta: Meta<typeof Resizable> = {
  title: 'Core/Layout/Resizable',
  component: Resizable,
  argTypes: {
    direction: { control: 'select', options: ['horizontal', 'vertical'] },
    defaultSize: { control: { type: 'range', min: 0, max: 100 } },
    minSize: { control: 'number' },
    maxSize: { control: 'number' },
  },
  decorators: [
    (Story) => (
      <div style={{ height: 300, border: '1px solid var(--color-border)' }}>
        <Story />
      </div>
    ),
  ],
}
export default meta
type Story = StoryObj<typeof Resizable>

export const Default: Story = {
  args: {
    direction: 'horizontal',
    defaultSize: 50,
    children: [
      <div key="left" style={{ padding: 16 }}>
        Left Panel
      </div>,
      <div key="right" style={{ padding: 16 }}>
        Right Panel
      </div>,
    ],
  },
}

export const Vertical: Story = {
  args: {
    direction: 'vertical',
    defaultSize: 40,
    children: [
      <div key="top" style={{ padding: 16 }}>
        Top Panel
      </div>,
      <div key="bottom" style={{ padding: 16 }}>
        Bottom Panel
      </div>,
    ],
  },
}
