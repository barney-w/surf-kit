import type {
  AgentInfo,
  ConfidenceBreakdown,
  ConversationSummary,
  MCPResource,
  MCPServerInfo,
  MCPToolCallData,
  Source,
  VerificationResult,
} from '@surf-kit/agent'

// ── Sources ──────────────────────────────────────────────────────────

export const mockSources: Source[] = [
  {
    title: 'Enterprise Pricing Guide',
    section: 'Plan Comparison',
    document_id: 'doc-001',
    url: 'https://example.com/pricing',
    confidence: 0.95,
    snippet:
      'The Enterprise plan includes unlimited API calls, priority support, and custom SLA agreements starting at $499/month.',
  },
  {
    title: 'API Rate Limits',
    section: 'Throttling Policy',
    document_id: 'doc-002',
    url: 'https://example.com/rate-limits',
    confidence: 0.88,
    snippet:
      'Pro plan users receive 10,000 requests per minute. Enterprise users can negotiate custom rate limits.',
  },
  {
    title: 'Getting Started Guide',
    section: 'Quick Start',
    document_id: 'doc-003',
    url: 'https://example.com/quickstart',
    confidence: 0.72,
    snippet:
      'To begin, install the SDK with `npm install @surf-kit/sdk` and configure your API key in the dashboard.',
  },
]

// ── Confidence ───────────────────────────────────────────────────────

export const mockConfidenceHigh: ConfidenceBreakdown = {
  overall: 'high',
  retrieval_quality: 0.95,
  source_authority: 0.92,
  answer_groundedness: 0.97,
  recency: 0.88,
  reasoning: 'Multiple authoritative sources confirm this information with high consistency.',
}

export const mockConfidenceMedium: ConfidenceBreakdown = {
  overall: 'medium',
  retrieval_quality: 0.72,
  source_authority: 0.65,
  answer_groundedness: 0.78,
  recency: 0.55,
  reasoning: 'Sources partially address the question but some details may be outdated.',
}

export const mockConfidenceLow: ConfidenceBreakdown = {
  overall: 'low',
  retrieval_quality: 0.35,
  source_authority: 0.42,
  answer_groundedness: 0.28,
  recency: 0.3,
  reasoning: 'Limited relevant sources found. Answer is partially inferred from context.',
}

// ── Verification ─────────────────────────────────────────────────────

export const mockVerificationPassed: VerificationResult = {
  status: 'passed',
  flags: [],
  claims_checked: 5,
  claims_verified: 5,
}

export const mockVerificationFlagged: VerificationResult = {
  status: 'flagged',
  flags: ['Pricing may have changed since source was last updated'],
  claims_checked: 4,
  claims_verified: 3,
}

export const mockVerificationFailed: VerificationResult = {
  status: 'failed',
  flags: ['Unable to verify rate limit claims', 'Source document appears outdated'],
  claims_checked: 3,
  claims_verified: 1,
}

// ── Agents ───────────────────────────────────────────────────────────

export const mockAgents: AgentInfo[] = [
  { id: 'coordinator', label: 'Coordinator', accent: '#38BDD0' },
  { id: 'finance_agent', label: 'Finance Agent', accent: '#D4A843' },
  { id: 'hr_agent', label: 'HR Agent', accent: '#8B5CF6' },
  { id: 'it_agent', label: 'IT Agent', accent: '#10B981' },
  { id: 'facilities_agent', label: 'Facilities Agent', accent: '#F59E0B' },
  { id: 'governance_agent', label: 'Governance Agent', accent: '#EC4899' },
]

// ── Conversations ────────────────────────────────────────────────────

export const mockConversations: ConversationSummary[] = [
  {
    id: '1',
    title: 'Pricing plan comparison',
    lastMessage: 'What is included in the Pro plan?',
    updatedAt: new Date('2026-02-28'),
    messageCount: 4,
  },
  {
    id: '2',
    title: 'API rate limit question',
    lastMessage: 'How do I increase my requests per minute?',
    updatedAt: new Date('2026-02-27'),
    messageCount: 6,
  },
  {
    id: '3',
    title: 'Onboarding assistance',
    lastMessage: 'How do I connect a Slack integration?',
    updatedAt: new Date('2026-02-26'),
    messageCount: 2,
  },
]

// ── Table data ───────────────────────────────────────────────────────

export const tableColumns = [
  { key: 'name', label: 'Feature', sortable: true },
  { key: 'free', label: 'Free' },
  { key: 'pro', label: 'Pro', sortable: true },
  { key: 'enterprise', label: 'Enterprise' },
]

export const tableRows = [
  { name: 'API Calls', free: '1,000/mo', pro: '100,000/mo', enterprise: 'Unlimited' },
  { name: 'Rate Limit', free: '100/min', pro: '10,000/min', enterprise: 'Custom' },
  { name: 'Support', free: 'Community', pro: 'Email', enterprise: 'Dedicated' },
  { name: 'SSO', free: '—', pro: '—', enterprise: 'Yes' },
  { name: 'Custom Models', free: '—', pro: 'Yes', enterprise: 'Yes' },
]

// ── MCP ──────────────────────────────────────────────────────────────

export const mockMCPToolCall: MCPToolCallData = {
  id: 'tc-001',
  name: 'search_documents',
  serverName: 'knowledge-base',
  arguments: { query: 'pricing plans', limit: 5 },
  result: { documents: ['doc-001', 'doc-002'], total: 2 },
  status: 'success',
  startedAt: new Date('2026-02-28T10:00:00'),
  completedAt: new Date('2026-02-28T10:00:02'),
}

export const mockMCPToolCallPending: MCPToolCallData = {
  id: 'tc-002',
  name: 'update_database',
  serverName: 'admin-tools',
  arguments: { table: 'users', action: 'update_role', userId: 'usr-123' },
  status: 'pending',
}

export const mockMCPResource: MCPResource = {
  uri: 'file:///docs/pricing.md',
  name: 'Pricing Documentation',
  mimeType: 'text/markdown',
  description: 'Current pricing plans and feature comparison',
  content: '# Pricing Plans\n\nWe offer three tiers: Free, Pro, and Enterprise.',
}

export const mockMCPServer: MCPServerInfo = {
  name: 'knowledge-base',
  version: '1.2.0',
  status: 'connected',
  tools: [
    { name: 'search_documents', description: 'Search the knowledge base' },
    { name: 'get_document', description: 'Retrieve a specific document' },
    { name: 'list_collections', description: 'List all document collections' },
  ],
  resources: [
    { uri: 'file:///docs/pricing.md', name: 'Pricing Documentation' },
    { uri: 'file:///docs/api-guide.md', name: 'API Guide' },
  ],
  lastPing: new Date('2026-02-28T10:05:00'),
}

export const mockMCPServerDisconnected: MCPServerInfo = {
  name: 'analytics-service',
  version: '0.9.1',
  status: 'disconnected',
  tools: [{ name: 'run_report', description: 'Generate analytics report' }],
  resources: [],
}

// ── DataList items ───────────────────────────────────────────────────

export const dataListItems = [
  { label: 'Status', value: 'Active' },
  { label: 'Plan', value: 'Enterprise' },
  { label: 'Members', value: '24' },
  { label: 'Storage', value: '128 GB' },
]

// ── Breadcrumb items ─────────────────────────────────────────────────

export const breadcrumbItems = [
  { label: 'Home', href: '#' },
  { label: 'Settings', href: '#' },
  { label: 'API Keys' },
]

// ── Accordion items ──────────────────────────────────────────────────

export const accordionItems = [
  {
    key: 'what',
    title: 'What is Surf Kit?',
    content:
      'Surf Kit is an accessible React component library built with React Aria and Tailwind CSS.',
  },
  {
    key: 'install',
    title: 'How do I install it?',
    content: 'Install via npm: `npm install @surf-kit/core @surf-kit/theme @surf-kit/tokens`',
  },
  {
    key: 'theme',
    title: 'Can I customise the theme?',
    content:
      'Yes! Use ThemeProvider with light, dark, or brand color modes. Tokens are fully overridable.',
  },
]
