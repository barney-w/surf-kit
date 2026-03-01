import type { Meta, StoryObj } from '@storybook/react'
import { AspectRatio } from '@surf-kit/core'

const meta: Meta<typeof AspectRatio> = {
  title: 'Core/Layout/AspectRatio',
  component: AspectRatio,
}
export default meta
type Story = StoryObj<typeof AspectRatio>

export const Default: Story = {
  render: () => (
    <AspectRatio ratio={1}>
      <div
        style={{
          background: '#e0e0e0',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        1:1
      </div>
    </AspectRatio>
  ),
}

export const Widescreen: Story = {
  render: () => (
    <AspectRatio ratio={16 / 9}>
      <div
        style={{
          background: '#e0e0e0',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        16:9
      </div>
    </AspectRatio>
  ),
}
