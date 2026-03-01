import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import * as vitestAxe from 'vitest-axe/matchers'

expect.extend(vitestAxe)

import type { ChatMessage } from '../../../types/chat'
import { MessageThread } from '../MessageThread'

const messages: ChatMessage[] = [
  {
    id: 'msg-1',
    role: 'user',
    content: 'Hello',
    timestamp: new Date('2025-01-01'),
  },
  {
    id: 'msg-2',
    role: 'assistant',
    content: 'Hi there!',
    timestamp: new Date('2025-01-01'),
  },
]

describe('MessageThread', () => {
  it('renders all messages', () => {
    render(<MessageThread messages={messages} />)
    expect(screen.getByText('Hello')).toBeDefined()
    expect(screen.getByText('Hi there!')).toBeDefined()
  })

  it('has role="log" for accessibility', () => {
    render(<MessageThread messages={messages} />)
    expect(screen.getByRole('log')).toBeDefined()
  })

  it('renders streaming slot when provided', () => {
    render(
      <MessageThread
        messages={messages}
        streamingSlot={<div data-testid="streaming">Typing...</div>}
      />,
    )
    expect(screen.getByTestId('streaming')).toBeDefined()
  })

  it('renders empty thread', () => {
    render(<MessageThread messages={[]} />)
    expect(screen.getByRole('log')).toBeDefined()
  })

  it('applies custom className', () => {
    render(<MessageThread messages={[]} className="custom-thread" />)
    expect(screen.getByRole('log').className).toContain('custom-thread')
  })

  it('renders data-message-id on each message bubble', () => {
    const { container } = render(<MessageThread messages={messages} />)
    expect(container.querySelector('[data-message-id="msg-1"]')).not.toBeNull()
    expect(container.querySelector('[data-message-id="msg-2"]')).not.toBeNull()
  })

  it('passes vitest-axe accessibility audit', async () => {
    const { container } = render(<MessageThread messages={messages} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
