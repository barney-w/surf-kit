import type { Meta, StoryObj } from '@storybook/react'
import type { AgentResponse } from '@surf-kit/agent'
import { AgentResponseView } from '@surf-kit/agent'

const meta: Meta<typeof AgentResponseView> = {
  title: 'Agent/AgentResponse',
  component: AgentResponseView,
}
export default meta
type Story = StoryObj<typeof AgentResponseView>

const response: AgentResponse = {
  message: `Based on the **Enterprise Agreement 2024**, all full-time employees are entitled to:

- **Four weeks** (20 days) of paid annual leave per year
- Pro-rata entitlements for part-time employees
- Leave requests submitted at least **two weeks** in advance`,
  sources: [
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
      snippet: 'Leave requests should be submitted through the self-service portal.',
    },
  ],
  confidence: {
    overall: 'high',
    retrieval_quality: 0.94,
    source_authority: 0.96,
    answer_groundedness: 0.91,
    recency: 0.88,
    reasoning: 'High confidence due to direct match.',
  },
  verification: {
    status: 'passed',
    flags: [],
    claims_checked: 3,
    claims_verified: 3,
  },
  ui_hint: 'text',
  structured_data: null,
  follow_up_suggestions: [
    'How do I apply for annual leave?',
    'What happens to unused annual leave?',
    'Can I cash out my annual leave?',
  ],
}

export const Default: Story = {
  args: { response },
}

export const WithMetadata: Story = {
  args: {
    response,
    showConfidence: true,
    showVerification: true,
    onFollowUp: () => {},
  },
}

export const WithoutSources: Story = {
  args: {
    response,
    showSources: false,
    onFollowUp: () => {},
  },
}
