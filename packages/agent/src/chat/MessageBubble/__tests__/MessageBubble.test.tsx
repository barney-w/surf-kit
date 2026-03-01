import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import * as vitestAxe from 'vitest-axe/matchers'

expect.extend(vitestAxe)

import type { ChatMessage } from '../../../types/chat'
import { MessageBubble } from '../MessageBubble'

const userMessage: ChatMessage = {
  id: 'msg-1',
  role: 'user',
  content: 'Hello there',
  timestamp: new Date('2025-01-01'),
}

const assistantMessage: ChatMessage = {
  id: 'msg-2',
  role: 'assistant',
  content: 'Hi! How can I help?',
  agent: 'TestBot',
  timestamp: new Date('2025-01-01'),
}

describe('MessageBubble', () => {
  it('renders user message content', () => {
    render(<MessageBubble message={userMessage} />)
    expect(screen.getByText('Hello there')).toBeDefined()
  })

  it('renders assistant message content', () => {
    render(<MessageBubble message={assistantMessage} />)
    expect(screen.getByText('Hi! How can I help?')).toBeDefined()
  })

  it('renders data-message-id attribute', () => {
    const { container } = render(<MessageBubble message={userMessage} />)
    const el = container.querySelector('[data-message-id="msg-1"]')
    expect(el).not.toBeNull()
  })

  it('right-aligns user messages', () => {
    const { container } = render(<MessageBubble message={userMessage} />)
    const wrapper = container.querySelector('[data-message-id="msg-1"]')
    expect(wrapper?.className).toContain('justify-end')
  })

  it('left-aligns assistant messages', () => {
    const { container } = render(<MessageBubble message={assistantMessage} />)
    const wrapper = container.querySelector('[data-message-id="msg-2"]')
    expect(wrapper?.className).toContain('items-start')
  })

  it('applies accent background to user messages', () => {
    const { container } = render(<MessageBubble message={userMessage} />)
    const bubble = container.querySelector('[data-message-id="msg-1"]')?.firstElementChild
    expect(bubble?.className).toContain('bg-accent')
  })

  it('applies surface background to assistant messages', () => {
    const { container } = render(<MessageBubble message={assistantMessage} />)
    const bubble = container.querySelector('[data-message-id="msg-2"]')?.firstElementChild
    expect(bubble?.className).toContain('bg-surface')
  })

  it('shows agent name when showAgent is true', () => {
    render(<MessageBubble message={assistantMessage} showAgent />)
    expect(screen.getByText('TestBot')).toBeDefined()
  })

  it('does not show agent name when showAgent is false', () => {
    render(<MessageBubble message={assistantMessage} />)
    expect(screen.queryByText('TestBot')).toBeNull()
  })

  it('applies custom className', () => {
    const { container } = render(<MessageBubble message={userMessage} className="custom-class" />)
    const wrapper = container.querySelector('[data-message-id="msg-1"]')
    expect(wrapper?.className).toContain('custom-class')
  })

  it('passes vitest-axe accessibility audit', async () => {
    const { container } = render(
      <div>
        <MessageBubble message={userMessage} />
        <MessageBubble message={assistantMessage} showAgent />
      </div>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
