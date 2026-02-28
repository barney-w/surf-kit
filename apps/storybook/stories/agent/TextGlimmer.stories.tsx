import type { Meta, StoryObj } from '@storybook/react'
import { TextGlimmer } from '@surf-kit/agent'

const meta: Meta<typeof TextGlimmer> = {
  title: 'Agent/TextGlimmer',
  component: TextGlimmer,
}
export default meta
type Story = StoryObj<typeof TextGlimmer>

export const Default: Story = {
  args: {},
}

export const SingleLine: Story = {
  args: { lines: 1 },
}

export const ManyLines: Story = {
  args: { lines: 6 },
}
