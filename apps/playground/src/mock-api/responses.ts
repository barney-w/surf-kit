import type { AgentResponse } from '@surf-kit/agent'

export const subscriptionPlanInfo: AgentResponse = {
  message:
    'You may be able to reduce your subscription costs by switching to an annual plan or applying eligible discounts.\n\nTypical options include:\n- **Annual billing discount** (up to 20% compared to monthly)\n- **Team plan** for 5+ seats with volume pricing\n- **Startup tier** for early-stage companies under 2 years old\n- **Non-profit rate** for registered charities and NGOs\n\nTo assess eligibility, simply review the pricing page or contact our sales team with details about your organisation. Most discounts require verification and take effect on the next billing cycle.',
  sources: [
    {
      title: 'Pricing Plans Overview',
      section: 'Who qualifies for discounts',
      document_id: 'doc-pricing-plans',
      url: 'https://example.com/pricing',
      confidence: 0.94,
      snippet:
        'Annual billing, team plans, and special rates are available for qualifying organisations.',
    },
    {
      title: 'Discount and Special Rates',
      section: 'Eligibility criteria',
      document_id: 'doc-discounts',
      url: 'https://example.com/pricing/discounts',
      confidence: 0.89,
      snippet:
        'Discounts can include annual billing savings, volume pricing, and non-profit rates where eligibility rules are met.',
    },
  ],
  confidence: {
    overall: 'high',
    retrieval_quality: 0.94,
    source_authority: 0.93,
    answer_groundedness: 0.95,
    recency: 0.9,
    reasoning:
      'Answer is grounded in current pricing documentation, but exact rates depend on your account tier and region.',
  },
  verification: {
    status: 'passed',
    flags: [],
    claims_checked: 5,
    claims_verified: 5,
  },
  ui_hint: 'text',
  structured_data: null,
  follow_up_suggestions: [
    'How do I apply for a non-profit discount?',
    'Can I switch from monthly to annual billing mid-cycle?',
    'What happens to my data if I downgrade my plan?',
  ],
}

export const onboardingGuide: AgentResponse = {
  message:
    'To get started with the product, follow these steps:\n\n1. Complete your profile and verify your email address\n2. Connect your first integration from the Integrations panel\n3. Invite team members from Settings > Team\n4. Run through the interactive quickstart guide in the dashboard\n\nIf you encounter any issues during setup:\n- Check the troubleshooting guide in our docs\n- Review integration requirements for your tech stack\n- Contact support with your account ID and a description of the issue\n\nMost onboarding issues are resolved within one business day.',
  sources: [
    {
      title: 'Getting Started Guide',
      section: 'Initial setup steps',
      document_id: 'doc-onboarding',
      url: 'https://example.com/docs/getting-started',
      confidence: 0.9,
      snippet:
        'Complete your profile, connect integrations, and invite team members to get the most out of the product.',
    },
    {
      title: 'Integration Setup Guide',
      section: 'Requirements and compatibility',
      document_id: 'doc-integrations',
      url: 'https://example.com/docs/integrations',
      confidence: 0.82,
      snippet:
        'Each integration has specific authentication and permission requirements. Check compatibility before connecting.',
    },
  ],
  confidence: {
    overall: 'medium',
    retrieval_quality: 0.84,
    source_authority: 0.88,
    answer_groundedness: 0.8,
    recency: 0.78,
    reasoning:
      'Onboarding steps are generally stable, but UI details and integration options may change with product updates.',
  },
  verification: {
    status: 'flagged',
    flags: [
      'Integration availability varies by plan tier',
      'Team invite limits depend on subscription',
    ],
    claims_checked: 4,
    claims_verified: 3,
  },
  ui_hint: 'steps',
  structured_data: null,
  follow_up_suggestions: [
    'How do I connect a Slack integration?',
    'What permissions do team members need?',
    'How do I export my data?',
  ],
}

export const apiUsageGuide: AgentResponse = {
  message:
    'API access tiers and rate limits are structured as follows:\n\n| Plan | Requests/min | Requests/day | Context window |\n|---|---|---|\n| Free | 10 | 1,000 | 8k tokens |\n| Pro | 60 | 50,000 | 32k tokens |\n| Enterprise | Custom | Unlimited | 128k tokens |\n\nBefore making requests, ensure you have:\n- Generated an API key from your dashboard\n- Set the correct base URL for your region\n- Included the `Authorization: Bearer <key>` header\n\nRate limit errors return HTTP 429 with a `Retry-After` header.',
  sources: [
    {
      title: 'API Reference',
      section: 'Authentication',
      document_id: 'doc-api-auth',
      url: 'https://example.com/docs/api',
      confidence: 0.96,
      snippet:
        'All API requests require a valid API key passed as a Bearer token in the Authorization header.',
    },
    {
      title: 'Rate Limits and Quotas',
      section: 'Per-plan limits',
      document_id: 'doc-rate-limits',
      url: 'https://example.com/docs/api/rate-limits',
      confidence: 0.92,
      snippet:
        'Rate limits are enforced per API key. Exceeding limits returns HTTP 429 with retry information.',
    },
    {
      title: 'Enterprise API Guide',
      section: 'Custom limits',
      document_id: 'doc-enterprise-api',
      url: 'https://example.com/docs/api/enterprise',
      confidence: 0.88,
      snippet:
        'Enterprise plans support custom rate limits and dedicated infrastructure upon request.',
    },
  ],
  confidence: {
    overall: 'high',
    retrieval_quality: 0.95,
    source_authority: 0.94,
    answer_groundedness: 0.96,
    recency: 0.87,
    reasoning:
      'Rate limits and plan details are strongly grounded in current documentation, but enterprise limits are negotiated per contract.',
  },
  verification: {
    status: 'passed',
    flags: [],
    claims_checked: 6,
    claims_verified: 6,
  },
  ui_hint: 'table',
  structured_data: {
    plans: [
      { plan: 'Free', rpm: 10, rpd: 1000, context: '8k tokens' },
      { plan: 'Pro', rpm: 60, rpd: 50000, context: '32k tokens' },
      { plan: 'Enterprise', rpm: 'Custom', rpd: 'Unlimited', context: '128k tokens' },
    ],
  },
  follow_up_suggestions: [
    'How do I increase my rate limits?',
    'Where do I find my API key?',
    'What happens when I hit the rate limit?',
  ],
}

export const generalDemoResponse: AgentResponse = {
  message:
    'This playground uses mock data to demonstrate Surf Kit components. Try one of these prompts for a richer response: "pricing plans", "getting started", or "API rate limits".',
  sources: [
    {
      title: 'Surf Kit Playground Mock API',
      section: 'Prompt Routing',
      document_id: 'doc-playground-routing',
      url: 'https://example.com/surf-kit-playground-mock',
      confidence: 1,
      snippet:
        'Keyword-based routing is used in the playground to return deterministic demo responses for pricing, onboarding, and API topics.',
    },
  ],
  confidence: {
    overall: 'high',
    retrieval_quality: 1,
    source_authority: 0.9,
    answer_groundedness: 1,
    recency: 1,
    reasoning:
      'This is a deterministic mock response generated locally for the playground. It is not a production answer.',
  },
  verification: {
    status: 'passed',
    flags: [],
    claims_checked: 1,
    claims_verified: 1,
  },
  ui_hint: 'text',
  structured_data: null,
  follow_up_suggestions: [
    'What pricing plans are available?',
    'How do I get started?',
    'What are the API rate limits?',
  ],
}

/** Select a response based on message content keywords */
export function selectResponse(message: string): {
  response: AgentResponse
  agent: string
  agentLabel: string
} {
  const lower = message.toLowerCase()

  if (
    lower.includes('pricing') ||
    lower.includes('plan') ||
    lower.includes('discount') ||
    lower.includes('billing') ||
    lower.includes('subscription') ||
    lower.includes('cost')
  ) {
    return {
      response: subscriptionPlanInfo,
      agent: 'billing-support',
      agentLabel: 'Billing Support',
    }
  }

  if (
    lower.includes('onboard') ||
    lower.includes('getting started') ||
    lower.includes('setup') ||
    lower.includes('integration') ||
    lower.includes('started') ||
    lower.includes('start')
  ) {
    return {
      response: onboardingGuide,
      agent: 'onboarding-support',
      agentLabel: 'Onboarding Support',
    }
  }

  if (
    lower.includes('api') ||
    lower.includes('rate limit') ||
    lower.includes('request') ||
    lower.includes('token') ||
    lower.includes('enterprise')
  ) {
    return { response: apiUsageGuide, agent: 'developer-support', agentLabel: 'Developer Support' }
  }

  return {
    response: generalDemoResponse,
    agent: 'assistant',
    agentLabel: 'Demo Assistant',
  }
}
