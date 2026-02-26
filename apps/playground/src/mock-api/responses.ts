import type { AgentResponse } from '@surf-kit/agent'

export const councilTaxSupport: AgentResponse = {
  message:
    'You may be able to reduce your organisation tax bill through **Council Tax Reduction** and related discounts.\n\nTypical options include:\n- **Council Tax Reduction (CTR)** for low-income households\n- **Single Person Discount** (25%) if only one adult lives in the property\n- **Severe Mental Impairment disregard** and some **carer/student disregards**\n- **Disabled Band Reduction** if your home has qualifying adaptations\n\nTo assess eligibility, the organisation usually checks household income, savings, rent/mortgage costs, and who lives at the address. Most councils ask for recent payslips or benefit statements and a tenancy agreement or proof of address.',
  sources: [
    {
      title: 'Council Tax Reduction Scheme',
      section: 'Who can apply',
      document_id: 'doc-ctr-scheme',
      url: 'https://www.example-council.gov.uk/council-tax-reduction',
      confidence: 0.94,
      snippet:
        'Council Tax Reduction may be available if you are on a low income or receive certain benefits, depending on household circumstances.',
    },
    {
      title: 'Council Tax Discounts and Exemptions',
      section: 'Discount types',
      document_id: 'doc-tax-discounts',
      url: 'https://www.example-council.gov.uk/council-tax-discounts',
      confidence: 0.89,
      snippet:
        'Discounts can include Single Person Discount, student exemptions, and disabled band reductions where eligibility rules are met.',
    },
  ],
  confidence: {
    overall: 'high',
    retrieval_quality: 0.94,
    source_authority: 0.93,
    answer_groundedness: 0.95,
    recency: 0.9,
    reasoning:
      'Answer is grounded in council revenue guidance and standard UK discount categories, but eligibility always depends on local scheme rules.',
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
    'What evidence do I need for a CTR application?',
    'Can I backdate a council tax reduction claim?',
    'How long does a council tax decision usually take?',
  ],
}

export const wasteCollectionInfo: AgentResponse = {
  message:
    'For missed bin collections, the usual process is:\n\n1. Check your collection day and accepted materials\n2. Report the missed collection within the organisation reporting window (often 1-2 working days)\n3. Leave the bin at the boundary until instructions are updated\n\nMost councils will not return if:\n- The wrong materials were presented\n- The bin was not out by the stated time\n- Access was blocked\n\nIf repeated issues occur, request a service investigation and include photos of presentation and any contamination notices.',
  sources: [
    {
      title: 'Report a Missed Bin Collection',
      section: 'Eligibility and deadlines',
      document_id: 'doc-missed-bin',
      url: 'https://www.example-council.gov.uk/bins/missed-collection',
      confidence: 0.9,
      snippet:
        'Missed collections should be reported within the published reporting window and bins should remain accessible for return.',
    },
    {
      title: 'Recycling and Refuse Guide',
      section: 'Contamination rules',
      document_id: 'doc-recycling-guide',
      url: 'https://www.example-council.gov.uk/bins/recycling-guide',
      confidence: 0.82,
      snippet:
        'Loads can be rejected if incorrect items are found. Residents should remove contamination before the next scheduled collection.',
    },
  ],
  confidence: {
    overall: 'medium',
    retrieval_quality: 0.84,
    source_authority: 0.88,
    answer_groundedness: 0.8,
    recency: 0.78,
    reasoning:
      'General missed-collection policy is stable, but specific cut-off times and return windows vary by council and service area.',
  },
  verification: {
    status: 'flagged',
    flags: [
      'Return window for missed collections varies by route',
      'Garden and bulky waste follow separate service rules',
    ],
    claims_checked: 4,
    claims_verified: 3,
  },
  ui_hint: 'steps',
  structured_data: null,
  follow_up_suggestions: [
    'How do I check my bin collection day?',
    'What items are not allowed in mixed recycling?',
    'How do I order a replacement bin?',
  ],
}

export const planningApplicationGuide: AgentResponse = {
  message:
    'Planning application pathways commonly include:\n\n| Application type | Typical use | Indicative target time |\n|---|---|---|\n| Householder | Extensions, loft conversions, outbuildings | 8 weeks |\n| Full Planning | New dwellings or major changes of use | 8-13 weeks |\n| Lawful Development Certificate | Confirming if works are permitted development | 8 weeks |\n\nBefore submitting, check local validation requirements, conservation area constraints, and whether your site is listed or in a protected zone. Most councils require scaled plans, ownership certificates, and the correct fee at submission.',
  sources: [
    {
      title: 'Apply for Planning Permission',
      section: 'Application routes',
      document_id: 'doc-planning-routes',
      url: 'https://www.example-council.gov.uk/planning/apply',
      confidence: 0.96,
      snippet:
        'Householder, full, and certificate applications have different requirements and processing targets.',
    },
    {
      title: 'Planning Validation Checklist',
      section: 'Required documents',
      document_id: 'doc-planning-validation',
      url: 'https://www.example-council.gov.uk/planning/validation',
      confidence: 0.92,
      snippet:
        'Applications are invalid unless mandatory plans, forms, certificates, and fees are provided at submission.',
    },
    {
      title: 'Planning Decision Timeframes',
      section: 'Service standards',
      document_id: 'doc-planning-timeframes',
      url: 'https://www.example-council.gov.uk/planning/decision-times',
      confidence: 0.88,
      snippet:
        'Most householder and minor planning applications have an 8-week target, subject to consultation and validation.',
    },
  ],
  confidence: {
    overall: 'high',
    retrieval_quality: 0.95,
    source_authority: 0.94,
    answer_groundedness: 0.96,
    recency: 0.87,
    reasoning:
      'Application types and processing targets are strongly grounded in planning guidance, but case complexity and consultation can extend timelines.',
  },
  verification: {
    status: 'passed',
    flags: [],
    claims_checked: 6,
    claims_verified: 6,
  },
  ui_hint: 'table',
  structured_data: {
    application_types: [
      { type: 'Householder', use: 'Domestic extensions and alterations', target_weeks: 8 },
      { type: 'Full Planning', use: 'New build or material change of use', target_weeks: 8 },
      { type: 'Lawful Development Certificate', use: 'Confirming lawful status', target_weeks: 8 },
    ],
  },
  follow_up_suggestions: [
    'Do I need planning permission for a rear extension?',
    'How do I check if my property is in a conservation area?',
    'What happens if my planning application is refused?',
  ],
}

export const generalDemoResponse: AgentResponse = {
  message:
    'This playground uses mock data to demonstrate Surf Kit components. Try one of these prompts for a richer response: "council tax reduction", "missed bin collection", or "planning permission".',
  sources: [
    {
      title: 'Surf Kit Playground Mock API',
      section: 'Prompt Routing',
      document_id: 'doc-playground-routing',
      url: 'https://example.com/surf-kit-playground-mock',
      confidence: 1,
      snippet:
        'Keyword-based routing is used in the playground to return deterministic demo responses for council tax, bins, and planning topics.',
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
    'How can I reduce my council tax bill?',
    'I need to report a missed bin collection',
    'What planning application do I need?',
  ],
}

/** Select a response based on message content keywords */
export function selectResponse(message: string): {
  response: AgentResponse
  agent: string
  agentLabel: string
} {
  const lower = message.toLowerCase()

  if (lower.includes('council tax') || lower.includes('tax') || lower.includes('discount') || lower.includes('benefit') || lower.includes('reduction')) {
    return { response: councilTaxSupport, agent: 'revenue-benefits', agentLabel: 'Revenue & Benefits' }
  }

  if (lower.includes('bin') || lower.includes('waste') || lower.includes('recycling') || lower.includes('refuse') || lower.includes('missed collection')) {
    return { response: wasteCollectionInfo, agent: 'environmental-services', agentLabel: 'Environmental Services' }
  }

  if (lower.includes('planning') || lower.includes('extension') || lower.includes('application') || lower.includes('permitted development') || lower.includes('conservation area')) {
    return { response: planningApplicationGuide, agent: 'planning-support', agentLabel: 'Planning Support' }
  }

  return {
    response: generalDemoResponse,
    agent: 'assistant',
    agentLabel: 'Demo Assistant',
  }
}
