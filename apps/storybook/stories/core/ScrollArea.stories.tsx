import type { Meta, StoryObj } from '@storybook/react'
import { ScrollArea } from '@surf-kit/core'

const meta: Meta<typeof ScrollArea> = {
  title: 'Core/Layout/ScrollArea',
  component: ScrollArea,
}
export default meta
type Story = StoryObj<typeof ScrollArea>

export const Default: Story = {
  render: () => (
    <ScrollArea maxHeight="200px">
      {Array.from({ length: 20 }, (_, i) => (
        <p key={i} style={{ padding: '8px 0' }}>
          Item {i + 1}
        </p>
      ))}
    </ScrollArea>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <ScrollArea orientation="horizontal">
      <div style={{ display: 'flex', gap: 16, width: 'max-content' }}>
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            style={{
              minWidth: 120,
              height: 80,
              background: '#e0e0e0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
            }}
          >
            Item {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}

export const MaxHeight: Story = {
  render: () => (
    <ScrollArea maxHeight={150}>
      {Array.from({ length: 30 }, (_, i) => (
        <p key={i} style={{ padding: '4px 0' }}>
          Line {i + 1}
        </p>
      ))}
    </ScrollArea>
  ),
}
