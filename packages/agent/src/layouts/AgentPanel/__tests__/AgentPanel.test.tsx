import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import * as vitestAxe from 'vitest-axe/matchers'
import { axe } from 'vitest-axe'

expect.extend(vitestAxe)
import { AgentPanel } from '../AgentPanel'

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

describe('AgentPanel', () => {
  it('renders panel hidden when not open', () => {
    const { container } = render(
      <AgentPanel
        endpoint="https://api.test.com"
        isOpen={false}
        onClose={vi.fn()}
      />,
    )
    // Panel is always in the DOM but hidden via CSS transforms and aria-hidden
    const root = container.firstElementChild as HTMLElement
    expect(root).not.toBeNull()
    expect(root.getAttribute('aria-hidden')).toBe('true')
    expect(root.className).toContain('pointer-events-none')
  })

  it('renders dialog when open', () => {
    render(
      <AgentPanel
        endpoint="https://api.test.com"
        isOpen={true}
        onClose={vi.fn()}
        title="Agent Panel"
      />,
    )
    expect(screen.getByRole('dialog', { name: 'Agent Panel' })).toBeDefined()
  })

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(
      <AgentPanel
        endpoint="https://api.test.com"
        isOpen={true}
        onClose={onClose}
      />,
    )
    await user.click(screen.getByLabelText('Close panel'))
    expect(onClose).toHaveBeenCalled()
  })

  it('calls onClose when backdrop is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(
      <AgentPanel
        endpoint="https://api.test.com"
        isOpen={true}
        onClose={onClose}
      />,
    )
    await user.click(screen.getByTestId('panel-backdrop'))
    expect(onClose).toHaveBeenCalled()
  })

  it('calls onClose when Escape is pressed', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(
      <AgentPanel
        endpoint="https://api.test.com"
        isOpen={true}
        onClose={onClose}
      />,
    )
    await user.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalled()
  })

  it('renders on the right side by default', () => {
    render(
      <AgentPanel
        endpoint="https://api.test.com"
        isOpen={true}
        onClose={vi.fn()}
      />,
    )
    const dialog = screen.getByRole('dialog')
    expect(dialog.className).toContain('right-0')
  })

  it('renders on the left side when side="left"', () => {
    render(
      <AgentPanel
        endpoint="https://api.test.com"
        isOpen={true}
        onClose={vi.fn()}
        side="left"
      />,
    )
    const dialog = screen.getByRole('dialog')
    expect(dialog.className).toContain('left-0')
  })

  it('applies custom width', () => {
    render(
      <AgentPanel
        endpoint="https://api.test.com"
        isOpen={true}
        onClose={vi.fn()}
        width={500}
      />,
    )
    const dialog = screen.getByRole('dialog')
    expect(dialog.style.width).toBe('500px')
  })

  it('passes vitest-axe accessibility audit', async () => {
    const { container } = render(
      <AgentPanel
        endpoint="https://api.test.com"
        isOpen={true}
        onClose={vi.fn()}
        title="Accessible Panel"
      />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
