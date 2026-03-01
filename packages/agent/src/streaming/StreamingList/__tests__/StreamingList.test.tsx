import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { StreamingList } from '../StreamingList'

// Mock useReducedMotion
vi.mock('@surf-kit/hooks', () => ({
  useReducedMotion: vi.fn(() => false),
}))

describe('StreamingList', () => {
  it('renders items using renderItem', () => {
    render(
      <StreamingList
        items={['alpha', 'beta', 'gamma']}
        renderItem={(item) => <span>{item}</span>}
      />,
    )
    expect(screen.getByText('alpha')).toBeDefined()
    expect(screen.getByText('beta')).toBeDefined()
    expect(screen.getByText('gamma')).toBeDefined()
  })

  it('renders empty state when no items and emptyMessage provided', () => {
    render(
      <StreamingList
        items={[]}
        renderItem={(item) => <span>{item}</span>}
        emptyMessage="No items yet"
      />,
    )
    expect(screen.getByText('No items yet')).toBeDefined()
    expect(screen.getByTestId('streaming-list-empty')).toBeDefined()
  })

  it('returns null when no items and no emptyMessage', () => {
    const { container } = render(
      <StreamingList items={[]} renderItem={(item) => <span>{item}</span>} />,
    )
    expect(container.innerHTML).toBe('')
  })

  it('shows TypingIndicator when isStreaming is true', () => {
    render(
      <StreamingList
        items={['one']}
        renderItem={(item) => <span>{item}</span>}
        isStreaming={true}
      />,
    )
    expect(screen.getByTestId('streaming-list-loading')).toBeDefined()
    expect(screen.getByTestId('typing-indicator')).toBeDefined()
  })

  it('does not show indicator when isStreaming is false', () => {
    render(
      <StreamingList
        items={['one']}
        renderItem={(item) => <span>{item}</span>}
        isStreaming={false}
      />,
    )
    expect(screen.queryByTestId('streaming-list-loading')).toBeNull()
  })

  it('merges className', () => {
    render(
      <StreamingList
        items={['item']}
        renderItem={(item) => <span>{item}</span>}
        className="my-custom-class"
      />,
    )
    const el = screen.getByTestId('streaming-list')
    expect(el.className).toContain('my-custom-class')
  })

  it('renders as ul with li elements', () => {
    render(<StreamingList items={['a', 'b']} renderItem={(item) => <span>{item}</span>} />)
    const ul = screen.getByTestId('streaming-list')
    expect(ul.tagName).toBe('UL')
    const items = screen.getAllByTestId('streaming-list-item')
    expect(items).toHaveLength(2)
    expect(items[0].tagName).toBe('LI')
  })
})
