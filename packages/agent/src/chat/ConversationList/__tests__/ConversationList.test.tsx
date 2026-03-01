import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'
import * as vitestAxe from 'vitest-axe/matchers'

expect.extend(vitestAxe)

import type { ConversationSummary } from '../../../types/chat'
import { ConversationList } from '../ConversationList'

const mockConversations: ConversationSummary[] = [
  {
    id: 'conv-1',
    title: 'First conversation',
    lastMessage: 'Hello world',
    updatedAt: new Date('2025-01-01'),
    messageCount: 3,
  },
  {
    id: 'conv-2',
    title: 'Second conversation',
    lastMessage: 'How are you?',
    updatedAt: new Date('2025-01-02'),
    messageCount: 5,
  },
]

describe('ConversationList', () => {
  it('renders conversation titles and previews', () => {
    render(<ConversationList conversations={mockConversations} onSelect={vi.fn()} />)
    expect(screen.getByText('First conversation')).toBeDefined()
    expect(screen.getByText('Hello world')).toBeDefined()
    expect(screen.getByText('Second conversation')).toBeDefined()
    expect(screen.getByText('How are you?')).toBeDefined()
  })

  it('renders empty state when no conversations', () => {
    render(<ConversationList conversations={[]} onSelect={vi.fn()} />)
    expect(screen.getByText('No conversations yet')).toBeDefined()
  })

  it('calls onSelect when a conversation is clicked', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<ConversationList conversations={mockConversations} onSelect={onSelect} />)
    await user.click(screen.getByText('First conversation'))
    expect(onSelect).toHaveBeenCalledWith('conv-1')
  })

  it('highlights the active conversation', () => {
    render(
      <ConversationList conversations={mockConversations} activeId="conv-1" onSelect={vi.fn()} />,
    )
    const activeButton = screen.getByText('First conversation').closest('button')
    expect(activeButton?.getAttribute('aria-current')).toBe('true')
    // The parent li should have the active background
    const activeLi = activeButton?.closest('li')
    expect(activeLi?.className).toContain('bg-surface-raised')
    expect(activeLi?.className).toContain('border-l-accent')
  })

  it('renders "New conversation" button when onNew is provided', async () => {
    const user = userEvent.setup()
    const onNew = vi.fn()
    render(<ConversationList conversations={mockConversations} onSelect={vi.fn()} onNew={onNew} />)
    const newButton = screen.getByText('New conversation')
    expect(newButton).toBeDefined()
    await user.click(newButton)
    expect(onNew).toHaveBeenCalled()
  })

  it('renders delete buttons when onDelete is provided', async () => {
    const user = userEvent.setup()
    const onDelete = vi.fn()
    render(
      <ConversationList conversations={mockConversations} onSelect={vi.fn()} onDelete={onDelete} />,
    )
    const deleteButton = screen.getByLabelText('Delete First conversation')
    await user.click(deleteButton)
    expect(onDelete).toHaveBeenCalledWith('conv-1')
  })

  it('does not call onSelect when delete is clicked', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    const onDelete = vi.fn()
    render(
      <ConversationList
        conversations={mockConversations}
        onSelect={onSelect}
        onDelete={onDelete}
      />,
    )
    await user.click(screen.getByLabelText('Delete First conversation'))
    expect(onDelete).toHaveBeenCalled()
    expect(onSelect).not.toHaveBeenCalled()
  })

  it('has an accessible navigation landmark', () => {
    render(<ConversationList conversations={mockConversations} onSelect={vi.fn()} />)
    expect(screen.getByRole('navigation', { name: 'Conversation list' })).toBeDefined()
  })

  it('passes vitest-axe accessibility audit', async () => {
    const { container } = render(
      <ConversationList
        conversations={mockConversations}
        activeId="conv-1"
        onSelect={vi.fn()}
        onDelete={vi.fn()}
        onNew={vi.fn()}
      />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
