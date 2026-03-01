import type { Meta, StoryObj } from '@storybook/react'
import { AvatarGenerationLoader } from '@surf-kit/core'

const meta: Meta<typeof AvatarGenerationLoader> = {
  title: 'Core/AvatarGenerationLoader',
  component: AvatarGenerationLoader,
  argTypes: {
    primaryText: { control: 'text' },
    secondaryText: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center p-8">
        <div className="bg-brand-dark-panel rounded-2xl border border-brand-gold/15 p-8 w-full max-w-md">
          <Story />
        </div>
      </div>
    ),
  ],
}
export default meta
type Story = StoryObj<typeof AvatarGenerationLoader>

export const Default: Story = {}

export const CustomText: Story = {
  args: {
    primaryText: 'Generating your portrait...',
    secondaryText: 'This usually takes 15–30 seconds',
  },
}
