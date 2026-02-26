import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import * as vitestAxe from 'vitest-axe/matchers'
import { axe } from 'vitest-axe'

expect.extend(vitestAxe)
import { AgentWidget } from '../AgentWidget'

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

describe('AgentWidget', () => {
  it('renders a floating trigger button when closed', () => {
    render(<AgentWidget endpoint="https://api.test.com" />)
    expect(screen.getByRole('button', { name: 'Chat' })).toBeDefined()
  })

  it('renders with custom trigger label', () => {
    render(
      <AgentWidget endpoint="https://api.test.com" triggerLabel="Ask AI" />,
    )
    expect(screen.getByRole('button', { name: 'Ask AI' })).toBeDefined()
  })

  it('opens chat panel when trigger button is clicked', async () => {
    const user = userEvent.setup()
    render(<AgentWidget endpoint="https://api.test.com" title="Widget Chat" />)
    await user.click(screen.getByRole('button', { name: 'Chat' }))
    expect(screen.getByRole('dialog', { name: 'Widget Chat' })).toBeDefined()
  })

  it('closes chat panel when minimize button is clicked', async () => {
    const user = userEvent.setup()
    render(<AgentWidget endpoint="https://api.test.com" />)
    await user.click(screen.getByRole('button', { name: 'Chat' }))
    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeDefined()
    await user.click(screen.getByLabelText('Minimize chat'))
    // Popover is always in DOM but hidden via aria-hidden
    expect(dialog.getAttribute('aria-hidden')).toBe('true')
  })

  it('sets aria-expanded on trigger button', async () => {
    const user = userEvent.setup()
    render(<AgentWidget endpoint="https://api.test.com" />)
    const trigger = screen.getByRole('button', { name: 'Chat' })
    expect(trigger.getAttribute('aria-expanded')).toBe('false')
    await user.click(trigger)
    // After open, the trigger label changes
    const floatingButtons = screen.getAllByRole('button')
    const expandedButton = floatingButtons.find(
      (b) => b.getAttribute('aria-expanded') === 'true',
    )
    expect(expandedButton).toBeDefined()
  })

  it('positions on the bottom-right by default', () => {
    render(<AgentWidget endpoint="https://api.test.com" />)
    const trigger = screen.getByRole('button', { name: 'Chat' })
    expect(trigger.className).toContain('right-4')
    expect(trigger.className).toContain('bottom-4')
  })

  it('positions on the bottom-left when configured', () => {
    render(
      <AgentWidget endpoint="https://api.test.com" position="bottom-left" />,
    )
    const trigger = screen.getByRole('button', { name: 'Chat' })
    expect(trigger.className).toContain('left-4')
    expect(trigger.className).toContain('bottom-4')
  })

  it('passes vitest-axe accessibility audit', async () => {
    const { container } = render(
      <AgentWidget endpoint="https://api.test.com" triggerLabel="Help" />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
