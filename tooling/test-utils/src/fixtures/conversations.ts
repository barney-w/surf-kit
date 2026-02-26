export const multiTurnConversation = [
  {
    role: 'user' as const,
    content: 'What is the annual leave policy for full-time employees?',
    timestamp: '2024-11-15T09:30:00Z',
  },
  {
    role: 'assistant' as const,
    content:
      'Based on the Enterprise Agreement 2024, full-time employees are entitled to four weeks (20 days) of paid annual leave per year of service. Leave accrues progressively and can accumulate from year to year.',
    timestamp: '2024-11-15T09:30:05Z',
    sources: [
      {
        title: 'Enterprise Agreement 2024',
        document_id: 'ea-2024-001',
      },
    ],
  },
  {
    role: 'user' as const,
    content: 'Can I cash out some of my accumulated leave?',
    timestamp: '2024-11-15T09:31:00Z',
  },
  {
    role: 'assistant' as const,
    content:
      'Yes, under the Enterprise Agreement you may cash out annual leave provided you retain a balance of at least four weeks. Cash-out requests must be made in writing and approved by your manager. Each cash-out agreement is a separate written arrangement.',
    timestamp: '2024-11-15T09:31:04Z',
    sources: [
      {
        title: 'Enterprise Agreement 2024',
        document_id: 'ea-2024-001',
      },
      {
        title: 'HR Policy Manual',
        document_id: 'hr-policy-005',
      },
    ],
  },
]
