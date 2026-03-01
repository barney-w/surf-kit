import type { Meta, StoryObj } from '@storybook/react'
import { SourceInline } from '@surf-kit/agent'

const meta: Meta<typeof SourceInline> = {
  title: 'Agent/SourceInline',
  component: SourceInline,
}
export default meta
type Story = StoryObj<typeof SourceInline>

export const Default: Story = {
  args: {
    source: {
      title: 'Enterprise Agreement 2024',
      section: 'Section 12 — Leave Entitlements',
      document_id: 'ea-2024-001',
      url: 'https://example.com/ea',
      confidence: 0.95,
      snippet:
        'All full-time employees are entitled to four weeks (20 days) of paid annual leave per year of service.',
    },
    index: 1,
  },
}

export const InContext: Story = {
  render: () => (
    <p>
      Employees are entitled to four weeks of paid annual leave
      <SourceInline
        source={{
          title: 'Enterprise Agreement 2024',
          section: 'Section 12',
          document_id: 'ea-2024-001',
          url: 'https://example.com/ea',
          confidence: 0.95,
          snippet: 'All full-time employees are entitled to four weeks of paid annual leave.',
        }}
        index={1}
      />{' '}
      and ten days of personal leave
      <SourceInline
        source={{
          title: 'HR Policy Manual',
          section: 'Chapter 5',
          document_id: 'hr-policy-005',
          url: 'https://example.com/hr',
          confidence: 0.88,
          snippet: "Personal leave entitlements include sick leave and carer's leave.",
        }}
        index={2}
      />
      .
    </p>
  ),
}
