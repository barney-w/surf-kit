import type { Meta, StoryObj } from '@storybook/react'
import { ConfidenceMeter } from '@surf-kit/agent'

const meta: Meta<typeof ConfidenceMeter> = {
  title: 'Agent/ConfidenceMeter',
  component: ConfidenceMeter,
}
export default meta
type Story = StoryObj<typeof ConfidenceMeter>

export const High: Story = {
  args: { value: 0.92, label: 'Retrieval Quality' },
}

export const Medium: Story = {
  args: { value: 0.6, label: 'Source Authority' },
}

export const Low: Story = {
  args: { value: 0.25, label: 'Recency' },
}

export const Zero: Story = {
  args: { value: 0, label: 'No data' },
}

export const Full: Story = {
  args: { value: 1, label: 'Perfect score' },
}
