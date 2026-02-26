import type { Meta, StoryObj } from '@storybook/react'
import { SourceCard } from '@surf-kit/agent'

const meta: Meta<typeof SourceCard> = {
  title: 'Agent/SourceCard',
  component: SourceCard,
  argTypes: {
    variant: { control: 'select', options: ['compact', 'expanded'] },
  },
}
export default meta
type Story = StoryObj<typeof SourceCard>

const source = {
  title: 'Enterprise Agreement 2024',
  section: 'Section 12 — Leave Entitlements',
  document_id: 'ea-2024-001',
  url: 'https://internal.example.com/docs/ea-2024',
  confidence: 0.95,
  snippet: 'All full-time employees are entitled to four weeks (20 days) of paid annual leave per year of service. Part-time employees receive a pro-rata entitlement.',
}

export const Compact: Story = {
  args: { source, variant: 'compact' },
}

export const Expanded: Story = {
  args: { source, variant: 'expanded' },
}

export const LowConfidence: Story = {
  args: {
    source: { ...source, confidence: 0.3 },
    variant: 'expanded',
  },
}

export const Clickable: Story = {
  args: {
    source,
    variant: 'expanded',
    onNavigate: () => {},
  },
}
