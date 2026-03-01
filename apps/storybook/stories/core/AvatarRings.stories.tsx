import type { Meta, StoryObj } from '@storybook/react'
import { AvatarRings } from '@surf-kit/core'

const meta: Meta<typeof AvatarRings> = {
  title: 'Core/AvatarRings',
  component: AvatarRings,
  decorators: [
    (Story) => (
      <div className="bg-brand-dark flex items-center justify-center p-16">
        <Story />
      </div>
    ),
  ],
}
export default meta
type Story = StoryObj<typeof AvatarRings>

export const Default: Story = {}
