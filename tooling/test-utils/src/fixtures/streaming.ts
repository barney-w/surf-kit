export const streamingInProgressFixture = {
  active: true,
  phase: 'generating' as const,
  content: 'Based on the Enterprise Agreement 2024, all full-time employees are entitled to',
  sources: [
    {
      title: 'Enterprise Agreement 2024',
      section: 'Section 12 — Leave Entitlements',
      document_id: 'ea-2024-001',
      url: 'https://internal.example.com/docs/ea-2024',
      confidence: 0.95,
      snippet:
        'All full-time employees are entitled to four weeks (20 days) of paid annual leave per year of service.',
    },
  ],
  agent: 'hr_agent',
  agentLabel: 'HR Specialist',
}
