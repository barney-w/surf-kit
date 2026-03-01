import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'
import * as vitestAxe from 'vitest-axe/matchers'

import { ThumbsFeedback } from '../ThumbsFeedback'

expect.extend(vitestAxe)

describe('ThumbsFeedback', () => {
  it('renders thumbs up and thumbs down buttons', () => {
    render(<ThumbsFeedback messageId="msg-1" onFeedback={vi.fn()} />)
    expect(screen.getByLabelText('Thumbs up')).toBeDefined()
    expect(screen.getByLabelText('Thumbs down')).toBeDefined()
  })

  it('calls onFeedback with positive rating on thumbs up click', async () => {
    const user = userEvent.setup()
    const onFeedback = vi.fn()
    render(<ThumbsFeedback messageId="msg-1" onFeedback={onFeedback} />)

    await user.click(screen.getByLabelText('Thumbs up'))
    expect(onFeedback).toHaveBeenCalledWith('msg-1', 'positive')
  })

  it('calls onFeedback with negative rating on thumbs down click', async () => {
    const user = userEvent.setup()
    const onFeedback = vi.fn()
    render(<ThumbsFeedback messageId="msg-1" onFeedback={onFeedback} />)

    await user.click(screen.getByLabelText('Thumbs down'))
    expect(onFeedback).toHaveBeenCalledWith('msg-1', 'negative')
  })

  it('calls onNegative when thumbs down is clicked', async () => {
    const user = userEvent.setup()
    const onNegative = vi.fn()
    render(<ThumbsFeedback messageId="msg-1" onFeedback={vi.fn()} onNegative={onNegative} />)

    await user.click(screen.getByLabelText('Thumbs down'))
    expect(onNegative).toHaveBeenCalledOnce()
  })

  it('sets aria-pressed on selected button', async () => {
    const user = userEvent.setup()
    render(<ThumbsFeedback messageId="msg-1" onFeedback={vi.fn()} />)

    const thumbsUp = screen.getByLabelText('Thumbs up')
    await user.click(thumbsUp)
    expect(thumbsUp.getAttribute('aria-pressed')).toBe('true')
    expect(screen.getByLabelText('Thumbs down').getAttribute('aria-pressed')).toBe('false')
  })

  it('has group role with label', () => {
    render(<ThumbsFeedback messageId="msg-1" onFeedback={vi.fn()} />)
    expect(screen.getByRole('group')).toBeDefined()
    expect(screen.getByRole('group').getAttribute('aria-label')).toBe('Rate this response')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<ThumbsFeedback messageId="msg-1" onFeedback={vi.fn()} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
