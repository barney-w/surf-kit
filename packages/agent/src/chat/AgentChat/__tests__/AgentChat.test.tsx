import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import * as vitestAxe from 'vitest-axe/matchers'
import { axe } from 'vitest-axe'

expect.extend(vitestAxe)
import { AgentChat } from '../AgentChat'

// Mock useAgentChat to avoid real fetch calls
const mockSendMessage = vi.fn()
const mockSetInputValue = vi.fn()
const mockState = {
  messages: [] as import('../../../types/chat').ChatMessage[],
  conversationId: null,
  isLoading: false,
  error: null,
  inputValue: '',
  streamPhase: 'idle' as const,
}

vi.mock('../../../hooks/useAgentChat', () => ({
  useAgentChat: () => ({
    state: mockState,
    actions: {
      sendMessage: mockSendMessage,
      setInputValue: mockSetInputValue,
      loadConversation: vi.fn(),
      submitFeedback: vi.fn(),
      retry: vi.fn(),
      reset: vi.fn(),
    },
  }),
}))

describe('AgentChat', () => {
  beforeEach(() => {
    mockState.messages = []
    mockState.isLoading = false
    mockSendMessage.mockClear()
  })

  it('renders the chat container with title', () => {
    render(<AgentChat endpoint="https://api.test.com" title="My Chat" />)
    expect(screen.getByRole('heading', { name: 'My Chat', level: 1 })).toBeDefined()
  })

  it('shows WelcomeScreen when there are no messages', () => {
    render(
      <AgentChat
        endpoint="https://api.test.com"
        title="Bot"
        welcomeMessage="Ask me anything"
        suggestedQuestions={['Q1']}
      />,
    )
    expect(screen.getByText('Ask me anything')).toBeDefined()
    expect(screen.getByText('Q1')).toBeDefined()
    // Title appears in both header (h1) and welcome screen (h2)
    expect(screen.getByRole('heading', { name: 'Bot', level: 2 })).toBeDefined()
  })

  it('shows MessageThread when there are messages', () => {
    mockState.messages = [
      {
        id: 'msg-1',
        role: 'user',
        content: 'Hello!',
        timestamp: new Date(),
      },
    ]
    render(<AgentChat endpoint="https://api.test.com" />)
    expect(screen.getByText('Hello!')).toBeDefined()
    expect(screen.getByRole('log')).toBeDefined()
  })

  it('renders MessageComposer', () => {
    render(<AgentChat endpoint="https://api.test.com" />)
    expect(screen.getByLabelText('Message input')).toBeDefined()
    expect(screen.getByRole('button', { name: 'Send message' })).toBeDefined()
  })

  it('calls sendMessage when composing and sending', async () => {
    const user = userEvent.setup()
    render(<AgentChat endpoint="https://api.test.com" />)
    await user.type(screen.getByLabelText('Message input'), 'Hello{Enter}')
    expect(mockSendMessage).toHaveBeenCalledWith('Hello')
  })

  it('calls sendMessage when a suggested question chip is clicked', async () => {
    const user = userEvent.setup()
    render(
      <AgentChat
        endpoint="https://api.test.com"
        suggestedQuestions={['Tell me about X']}
      />,
    )
    await user.click(screen.getByText('Tell me about X'))
    expect(mockSendMessage).toHaveBeenCalledWith('Tell me about X')
  })

  it('applies custom className', () => {
    const { container } = render(
      <AgentChat endpoint="https://api.test.com" className="custom-chat" />,
    )
    expect(container.firstElementChild?.className).toContain('custom-chat')
  })

  it('passes vitest-axe accessibility audit', async () => {
    const { container } = render(
      <AgentChat
        endpoint="https://api.test.com"
        title="Bot"
        welcomeMessage="Hello"
        suggestedQuestions={['Q1']}
      />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
