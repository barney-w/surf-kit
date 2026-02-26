import type { AgentResponse } from '@surf-kit/agent'

export const hrLeavePolicy: AgentResponse = {
  message:
    'According to the company leave policy (updated January 2026), full-time employees are entitled to **20 days** of paid annual leave per calendar year. Leave accrues at a rate of 1.67 days per month and can be carried over up to 5 unused days into the following year.\n\nKey points:\n- **Probation period**: Leave accrues but cannot be taken during the first 3 months.\n- **Requesting leave**: Submit requests via the HR portal at least 5 business days in advance.\n- **Manager approval**: Required for any leave exceeding 3 consecutive days.\n- **Sick leave**: Separate from annual leave; 10 days per year with a doctor\'s note required after 2 consecutive days.',
  sources: [
    {
      title: 'Employee Handbook 2026',
      section: 'Section 4.2 - Annual Leave',
      document_id: 'doc-handbook-2026',
      url: 'https://intranet.example.com/hr/handbook#4.2',
      confidence: 0.95,
      snippet:
        'Full-time employees are entitled to 20 days of paid annual leave per calendar year, accruing at 1.67 days per month.',
    },
    {
      title: 'Leave Policy Addendum',
      section: 'Carryover Rules',
      document_id: 'doc-leave-addendum',
      url: 'https://intranet.example.com/hr/leave-addendum',
      confidence: 0.88,
      snippet:
        'Up to 5 unused leave days may be carried over to the next calendar year. Any excess will be forfeited unless approved by HR.',
    },
  ],
  confidence: {
    overall: 'high',
    retrieval_quality: 0.95,
    source_authority: 0.92,
    answer_groundedness: 0.97,
    recency: 0.9,
    reasoning:
      'Response is directly grounded in the 2026 Employee Handbook and the Leave Policy Addendum, both authoritative internal documents updated within the last 2 months.',
  },
  verification: {
    status: 'passed',
    flags: [],
    claims_checked: 6,
    claims_verified: 6,
  },
  ui_hint: 'text',
  structured_data: null,
  follow_up_suggestions: [
    'How do I request leave through the HR portal?',
    'What is the policy for unpaid leave?',
    'Can I take leave during probation in exceptional circumstances?',
  ],
}

export const itPasswordReset: AgentResponse = {
  message:
    'To reset your password, follow these steps:\n\n1. Go to the **Self-Service Portal** at [password.example.com](https://password.example.com)\n2. Click "Forgot Password" and enter your company email\n3. You\'ll receive a reset link valid for **15 minutes**\n4. Create a new password meeting the security requirements\n\n**Password requirements:**\n- Minimum 12 characters\n- At least one uppercase letter, one number, and one special character\n- Cannot reuse any of your last 5 passwords\n\n> **Note:** If your account is locked after 5 failed attempts, you\'ll need to contact IT Support directly at ext. 4357.',
  sources: [
    {
      title: 'IT Security Policy',
      section: 'Section 2.1 - Password Management',
      document_id: 'doc-it-security',
      url: 'https://intranet.example.com/it/security-policy#2.1',
      confidence: 0.85,
      snippet:
        'Passwords must be a minimum of 12 characters and include uppercase, numeric, and special characters.',
    },
    {
      title: 'Self-Service Portal Guide',
      section: 'Password Reset',
      document_id: 'doc-portal-guide',
      url: 'https://intranet.example.com/it/portal-guide',
      confidence: 0.78,
      snippet:
        'Reset links are valid for 15 minutes. After expiry, users must request a new link.',
    },
  ],
  confidence: {
    overall: 'medium',
    retrieval_quality: 0.82,
    source_authority: 0.85,
    answer_groundedness: 0.8,
    recency: 0.7,
    reasoning:
      'The IT Security Policy was last updated 6 months ago. The portal interface may have changed since the guide was written. Recommend verifying the exact UI steps.',
  },
  verification: {
    status: 'flagged',
    flags: [
      'Portal guide may be outdated (last updated August 2025)',
      'Account lockout threshold could not be independently verified',
    ],
    claims_checked: 5,
    claims_verified: 3,
  },
  ui_hint: 'steps',
  structured_data: null,
  follow_up_suggestions: [
    'What are the password security requirements in detail?',
    'How do I unlock my account after too many failed attempts?',
    'Can I set up multi-factor authentication?',
  ],
}

export const governanceMeetingDates: AgentResponse = {
  message:
    'The upcoming board and governance meetings for Q1 2026 are:\n\n| Meeting | Date | Time | Location |\n|---|---|---|---|\n| Board of Directors | March 15, 2026 | 10:00 AM EST | Main Boardroom (Floor 22) |\n| Audit Committee | March 22, 2026 | 2:00 PM EST | Conference Room A |\n| Risk Committee | April 5, 2026 | 11:00 AM EST | Virtual (Teams) |\n| Annual General Meeting | April 20, 2026 | 9:00 AM EST | Grand Hall |\n\nAll materials must be submitted **10 business days** before each meeting. Contact the Corporate Secretary for agenda items.',
  sources: [
    {
      title: 'Corporate Governance Calendar 2026',
      section: 'Q1 Schedule',
      document_id: 'doc-gov-calendar',
      url: 'https://intranet.example.com/governance/calendar',
      confidence: 0.98,
      snippet:
        'Q1 2026 governance meetings are scheduled for March and April. Board meeting: March 15, Audit: March 22, Risk: April 5, AGM: April 20.',
    },
    {
      title: 'Board Meeting Procedures',
      section: 'Submission Deadlines',
      document_id: 'doc-board-procedures',
      url: 'https://intranet.example.com/governance/procedures',
      confidence: 0.93,
      snippet:
        'All meeting materials must be submitted to the Corporate Secretary no later than 10 business days prior to the scheduled meeting date.',
    },
    {
      title: 'Annual General Meeting Notice',
      section: 'Venue and Logistics',
      document_id: 'doc-agm-notice',
      url: 'https://intranet.example.com/governance/agm-2026',
      confidence: 0.96,
      snippet:
        'The 2026 AGM will be held on April 20 at the Grand Hall. Registration opens at 8:30 AM.',
    },
  ],
  confidence: {
    overall: 'high',
    retrieval_quality: 0.97,
    source_authority: 0.95,
    answer_groundedness: 0.98,
    recency: 0.99,
    reasoning:
      'Meeting dates are sourced directly from the official 2026 Corporate Governance Calendar, published by the Corporate Secretary in January 2026.',
  },
  verification: {
    status: 'passed',
    flags: [],
    claims_checked: 8,
    claims_verified: 8,
  },
  ui_hint: 'table',
  structured_data: {
    meetings: [
      { name: 'Board of Directors', date: '2026-03-15', time: '10:00 EST', location: 'Main Boardroom (Floor 22)' },
      { name: 'Audit Committee', date: '2026-03-22', time: '14:00 EST', location: 'Conference Room A' },
      { name: 'Risk Committee', date: '2026-04-05', time: '11:00 EST', location: 'Virtual (Teams)' },
      { name: 'Annual General Meeting', date: '2026-04-20', time: '09:00 EST', location: 'Grand Hall' },
    ],
  },
  follow_up_suggestions: [
    'How do I submit materials for the board meeting?',
    'Who are the current Audit Committee members?',
    'Where can I find the AGM proxy form?',
  ],
}

/** Select a response based on message content keywords */
export function selectResponse(message: string): {
  response: AgentResponse
  agent: string
  agentLabel: string
} {
  const lower = message.toLowerCase()

  if (lower.includes('leave') || lower.includes('vacation') || lower.includes('pto') || lower.includes('time off') || lower.includes('hr')) {
    return { response: hrLeavePolicy, agent: 'hr-agent', agentLabel: 'HR Assistant' }
  }

  if (lower.includes('password') || lower.includes('reset') || lower.includes('login') || lower.includes('account') || lower.includes('it ')) {
    return { response: itPasswordReset, agent: 'it-agent', agentLabel: 'IT Support' }
  }

  if (lower.includes('meeting') || lower.includes('board') || lower.includes('governance') || lower.includes('agm') || lower.includes('schedule')) {
    return { response: governanceMeetingDates, agent: 'governance-agent', agentLabel: 'Governance' }
  }

  // Default: cycle through responses based on message length as a simple heuristic
  const responses = [hrLeavePolicy, itPasswordReset, governanceMeetingDates]
  const agents = [
    { agent: 'hr-agent', agentLabel: 'HR Assistant' },
    { agent: 'it-agent', agentLabel: 'IT Support' },
    { agent: 'governance-agent', agentLabel: 'Governance' },
  ]
  const idx = message.length % 3
  return { response: responses[idx], ...agents[idx] }
}
