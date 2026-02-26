import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import * as vitestAxe from 'vitest-axe/matchers'
import { axe } from 'vitest-axe'

expect.extend(vitestAxe)
import { AgentFullPage } from '../AgentFullPage'
import type { ConversationSummary } from '../../../types/chat'

// Mock useAgentChat
vi.mock('../../../hooks/useAgentChat', () => ({
  useAgentChat: () => ({
    state: {
      messages: [],
      conversationId: null,
      isLoading: false,
      error: null,
      inputValue: '',
      streamPhase: 'idle',
    },
    actions: {
      sendMessage: vi.fn(),
      setInputValue: vi.fn(),
      loadConversation: vi.fn(),
      submitFeedback: vi.fn(),
      retry: vi.fn(),
      reset: vi.fn(),
    },
  }),
}))

const mockConversations: ConversationSummary[] = [
  {
    id: 'conv-1',
    title: 'Test conversation',
    lastMessage: 'Hello',
    updatedAt: new Date(),
    messageCount: 1,
  },
]

describe('AgentFullPage', () => {
  it('renders the full-page chat layout', () => {
    render(<AgentFullPage endpoint="https://api.test.com" />)
    expect(screen.getByTestId('agent-full-page')).toBeDefined()
    // AgentChat renders h1 and WelcomeScreen renders h2 with the title
    const headings = screen.getAllByRole('heading', { name: 'Chat' })
    expect(headings.length).toBeGreaterThanOrEqual(1)
  })

  it('renders with custom title', () => {
    render(<AgentFullPage endpoint="https://api.test.com" title="My Agent" />)
    const headings = screen.getAllByRole('heading', { name: 'My Agent' })
    expect(headings.length).toBeGreaterThanOrEqual(1)
  })

  it('uses 100vh height', () => {
    render(<AgentFullPage endpoint="https://api.test.com" />)
    const container = screen.getByTestId('agent-full-page')
    expect(container.className).toContain('h-screen')
  })

  it('shows sidebar when showConversationList is true', () => {
    render(
      <AgentFullPage
        endpoint="https://api.test.com"
        showConversationList
        conversations={mockConversations}
      />,
    )
    // aside with aria-label has complementary role; ConversationList nav is inside it
    expect(screen.getByRole('complementary', { name: 'Conversations sidebar' })).toBeDefined()
  })

  it('does not show sidebar when showConversationList is false', () => {
    render(<AgentFullPage endpoint="https://api.test.com" />)
    expect(screen.queryByRole('complementary', { name: 'Conversations sidebar' })).toBeNull()
  })

  it('shows mobile sidebar toggle when showConversationList is true', () => {
    render(
      <AgentFullPage
        endpoint="https://api.test.com"
        showConversationList
        conversations={mockConversations}
      />,
    )
    expect(screen.getByLabelText('Open conversations sidebar')).toBeDefined()
  })

  it('applies custom className', () => {
    render(
      <AgentFullPage endpoint="https://api.test.com" className="custom-class" />,
    )
    const container = screen.getByTestId('agent-full-page')
    expect(container.className).toContain('custom-class')
  })

  it('passes vitest-axe accessibility audit', async () => {
    const { container } = render(
      <AgentFullPage
        endpoint="https://api.test.com"
        title="Accessible Chat"
        showConversationList
        conversations={mockConversations}
      />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
