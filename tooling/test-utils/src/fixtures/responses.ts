import { enterpriseAgreementSource, hrPolicySource, itGuidelinesSource } from './sources'

export const highConfidenceHRResponse = {
  message:
    'Based on the Enterprise Agreement 2024, all full-time employees are entitled to four weeks (20 days) of paid annual leave per year of service. Part-time employees receive a pro-rata entitlement. Leave requests should be submitted through the self-service portal at least two weeks in advance.',
  sources: [
    {
      ...enterpriseAgreementSource,
      confidence: 0.95,
    },
    {
      ...hrPolicySource,
      confidence: 0.88,
    },
    {
      title: 'Leave FAQ',
      section: 'Annual Leave',
      document_id: 'faq-leave-001',
      url: 'https://internal.example.com/docs/leave-faq',
      confidence: 0.79,
      snippet:
        'Annual leave accrues progressively during each year of service and accumulates from year to year.',
    },
  ],
  confidence: {
    overall: 0.92,
    retrieval_quality: 0.94,
    source_authority: 0.96,
    answer_groundedness: 0.91,
    recency: 0.88,
    reasoning:
      'High confidence due to direct match with Enterprise Agreement clause and corroborating HR policy documentation.',
  },
  verification: {
    status: 'passed' as const,
    flags: [],
    claims_checked: 3,
    claims_verified: 3,
  },
  ui_hint: 'confident',
  structured_data: {
    leave_entitlement_days: 20,
    leave_type: 'annual',
    applicable_to: 'full-time',
  },
  follow_up_suggestions: [
    'How do I apply for annual leave?',
    'What happens to unused annual leave?',
    'Can I cash out my annual leave?',
  ],
}

export const lowConfidenceFlaggedResponse = {
  message:
    'Based on the IT Security Guidelines, passwords should be at least 12 characters. However, I found limited information about the specific MFA requirements you asked about. The available documentation may be outdated.',
  sources: [
    {
      ...itGuidelinesSource,
      confidence: 0.62,
    },
  ],
  confidence: {
    overall: 0.45,
    retrieval_quality: 0.52,
    source_authority: 0.71,
    answer_groundedness: 0.38,
    recency: 0.29,
    reasoning:
      'Low confidence due to partial source match and potentially outdated documentation. MFA policy details were not found in retrieved sources.',
  },
  verification: {
    status: 'flagged' as const,
    flags: [
      'Source documentation may be outdated (last updated 18 months ago)',
      'MFA requirements not explicitly covered in retrieved sources',
    ],
    claims_checked: 2,
    claims_verified: 1,
  },
  ui_hint: 'uncertain',
  structured_data: {
    password_min_length: 12,
    mfa_required: null,
  },
  follow_up_suggestions: [
    'Who should I contact about MFA setup?',
    'Where can I find the latest IT security policies?',
  ],
}

export const failedVerificationResponse = {
  message:
    'The company holiday schedule includes 10 public holidays per year. All employees are entitled to these days off with pay.',
  sources: [
    {
      title: 'Employee Handbook 2022',
      section: 'Section 8 — Public Holidays',
      document_id: 'handbook-2022-008',
      url: 'https://internal.example.com/docs/handbook-2022',
      confidence: 0.41,
      snippet:
        'The company observes 8 public holidays per year as designated by the applicable regional authority.',
    },
  ],
  confidence: {
    overall: 0.25,
    retrieval_quality: 0.48,
    source_authority: 0.55,
    answer_groundedness: 0.15,
    recency: 0.22,
    reasoning:
      'Failed verification: the response states 10 holidays but the source document states 8. The source is also from 2022 and may not reflect current policy.',
  },
  verification: {
    status: 'failed' as const,
    flags: [
      'Claim "10 public holidays" contradicts source which states 8',
      'Source document is from 2022 and may be superseded',
      'No corroborating sources found',
    ],
    claims_checked: 2,
    claims_verified: 0,
  },
  ui_hint: 'warning',
  structured_data: {
    public_holidays_count: 10,
    discrepancy: true,
  },
  follow_up_suggestions: [
    'Can you check the latest holiday schedule?',
    'Who manages the public holiday calendar?',
  ],
}
