import type { Meta, StoryObj } from '@storybook/react'
import { SourceDrawer } from '@surf-kit/agent'
import { fn } from '@storybook/test'

const meta: Meta<typeof SourceDrawer> = {
  title: 'Agent/SourceDrawer',
  component: SourceDrawer,
}
export default meta
type Story = StoryObj<typeof SourceDrawer>

export const Open: Story = {
  args: {
    source: {
      title: 'Enterprise Agreement 2024',
      section: 'Section 12 — Leave Entitlements',
      document_id: 'ea-2024-001',
      url: 'https://internal.example.com/docs/ea-2024',
      confidence: 0.95,
      snippet: 'All full-time employees are entitled to four weeks (20 days) of paid annual leave per year of service. Part-time employees receive a pro-rata entitlement. Leave requests should be submitted through the self-service portal at least two weeks in advance.',
    },
    isOpen: true,
    onClose: fn(),
  },
}

export const LowConfidence: Story = {
  args: {
    source: {
      title: 'IT Security Guidelines',
      section: 'Section 3 — Password Policy',
      document_id: 'it-sec-003',
      url: 'https://internal.example.com/docs/it-security',
      confidence: 0.42,
      snippet: 'Passwords must be at least 12 characters long and include a mix of uppercase, lowercase, numbers, and symbols.',
    },
    isOpen: true,
    onClose: fn(),
  },
}
