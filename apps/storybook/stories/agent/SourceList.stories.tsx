import type { Meta, StoryObj } from '@storybook/react'
import { SourceList } from '@surf-kit/agent'
import { fn } from '@storybook/test'

const meta: Meta<typeof SourceList> = {
  title: 'Agent/SourceList',
  component: SourceList,
  argTypes: {
    variant: { control: 'select', options: ['compact', 'expanded'] },
  },
}
export default meta
type Story = StoryObj<typeof SourceList>

const sources = [
  {
    title: 'Enterprise Agreement 2024',
    section: 'Section 12 — Leave Entitlements',
    document_id: 'ea-2024-001',
    url: 'https://example.com/ea',
    confidence: 0.95,
    snippet: 'All full-time employees are entitled to four weeks of paid annual leave.',
  },
  {
    title: 'HR Policy Manual',
    section: 'Chapter 5 — Leave Management',
    document_id: 'hr-policy-005',
    url: 'https://example.com/hr',
    confidence: 0.88,
    snippet: 'Leave requests should be submitted at least two weeks in advance.',
  },
  {
    title: 'Leave FAQ',
    section: 'Annual Leave',
    document_id: 'faq-leave-001',
    url: 'https://example.com/faq',
    confidence: 0.79,
    snippet: 'Annual leave accrues progressively during each year of service.',
  },
]

export const Default: Story = {
  args: { sources },
}

export const Expanded: Story = {
  args: { sources, variant: 'expanded' },
}

export const Collapsible: Story = {
  args: { sources, collapsible: true, defaultExpanded: true },
}

export const CollapsedByDefault: Story = {
  args: { sources, collapsible: true, defaultExpanded: false },
}

export const WithNavigation: Story = {
  args: { sources, onNavigate: fn() },
}
