import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import * as vitestAxe from 'vitest-axe/matchers'
import { axe } from 'vitest-axe'

expect.extend(vitestAxe)
import { AgentEmbed } from '../AgentEmbed'

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

describe('AgentEmbed', () => {
  it('renders the embed container', () => {
    render(<AgentEmbed endpoint="https://api.test.com" />)
    expect(screen.getByTestId('agent-embed')).toBeDefined()
  })

  it('fills its container', () => {
    render(<AgentEmbed endpoint="https://api.test.com" />)
    const container = screen.getByTestId('agent-embed')
    expect(container.className).toContain('w-full')
    expect(container.className).toContain('h-full')
  })

  it('renders with minimal chrome (no border or rounding)', () => {
    render(<AgentEmbed endpoint="https://api.test.com" />)
    const container = screen.getByTestId('agent-embed')
    // The AgentChat inside should have border-0 and rounded-none
    const chatEl = container.firstElementChild
    expect(chatEl?.className).toContain('border-0')
    expect(chatEl?.className).toContain('rounded-none')
  })

  it('applies custom className', () => {
    render(
      <AgentEmbed endpoint="https://api.test.com" className="my-embed" />,
    )
    const container = screen.getByTestId('agent-embed')
    expect(container.className).toContain('my-embed')
  })

  it('passes vitest-axe accessibility audit', async () => {
    const { container } = render(
      <AgentEmbed endpoint="https://api.test.com" title="Embedded Chat" />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
