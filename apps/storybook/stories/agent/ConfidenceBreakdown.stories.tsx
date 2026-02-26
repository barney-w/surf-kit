import type { Meta, StoryObj } from '@storybook/react'
import { ConfidenceBreakdownView } from '@surf-kit/agent'

const meta: Meta<typeof ConfidenceBreakdownView> = {
  title: 'Agent/ConfidenceBreakdown',
  component: ConfidenceBreakdownView,
}
export default meta
type Story = StoryObj<typeof ConfidenceBreakdownView>

const confidence = {
  overall: 'high' as const,
  retrieval_quality: 0.92,
  source_authority: 0.85,
  answer_groundedness: 0.88,
  recency: 0.7,
  reasoning: 'Answer is well-grounded in authoritative enterprise documentation.',
}

export const Collapsed: Story = {
  args: { confidence },
}

export const Expanded: Story = {
  args: { confidence, defaultExpanded: true },
}

export const MediumConfidence: Story = {
  args: {
    confidence: {
      ...confidence,
      overall: 'medium' as const,
      retrieval_quality: 0.6,
      source_authority: 0.55,
    },
    defaultExpanded: true,
  },
}

export const NotExpandable: Story = {
  args: { confidence, expandable: false },
}
