import type { Meta, StoryObj } from '@storybook/react'
import { SourceBadge } from '@surf-kit/agent'

const meta: Meta<typeof SourceBadge> = {
  title: 'Agent/SourceBadge',
  component: SourceBadge,
}
export default meta
type Story = StoryObj<typeof SourceBadge>

export const SingleSource: Story = {
  args: { count: 1 },
}

export const MultipleSources: Story = {
  args: { count: 5 },
}

export const ZeroSources: Story = {
  args: { count: 0 },
}
