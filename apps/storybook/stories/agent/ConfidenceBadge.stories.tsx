import type { Meta, StoryObj } from '@storybook/react'
import { ConfidenceBadge } from '@surf-kit/agent'

const meta: Meta<typeof ConfidenceBadge> = {
  title: 'Agent/ConfidenceBadge',
  component: ConfidenceBadge,
}
export default meta
type Story = StoryObj<typeof ConfidenceBadge>

const base = {
  retrieval_quality: 0.9,
  source_authority: 0.8,
  answer_groundedness: 0.85,
  recency: 0.7,
  reasoning: 'Sources are authoritative and recent.',
}

export const High: Story = {
  args: { confidence: { ...base, overall: 'high' } },
}

export const Medium: Story = {
  args: { confidence: { ...base, overall: 'medium' } },
}

export const Low: Story = {
  args: { confidence: { ...base, overall: 'low' } },
}
