import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'
import * as vitestAxe from 'vitest-axe/matchers'
import type { ChatError } from '../../../types/chat'
import { ErrorResponse } from '../ErrorResponse'

expect.extend(vitestAxe)

describe('ErrorResponse', () => {
  const retryableError: ChatError = {
    code: 'NETWORK_ERROR',
    message: 'Failed to connect to the server.',
    retryable: true,
  }

  const nonRetryableError: ChatError = {
    code: 'API_ERROR',
    message: 'Invalid API key.',
    retryable: false,
  }

  it('renders error message', () => {
    render(<ErrorResponse error={retryableError} />)
    expect(screen.getByText('Failed to connect to the server.')).toBeDefined()
  })

  it('renders retry button when error is retryable and onRetry provided', () => {
    render(<ErrorResponse error={retryableError} onRetry={() => {}} />)
    expect(screen.getByText('Retry')).toBeDefined()
  })

  it('does not render retry button when error is not retryable', () => {
    render(<ErrorResponse error={nonRetryableError} onRetry={() => {}} />)
    expect(screen.queryByText('Retry')).toBeNull()
  })

  it('does not render retry button when onRetry is not provided', () => {
    render(<ErrorResponse error={retryableError} />)
    expect(screen.queryByText('Retry')).toBeNull()
  })

  it('calls onRetry when retry button is clicked', async () => {
    const user = userEvent.setup()
    const onRetry = vi.fn()
    render(<ErrorResponse error={retryableError} onRetry={onRetry} />)

    await user.click(screen.getByText('Retry'))
    expect(onRetry).toHaveBeenCalledOnce()
  })

  it('has alert role', () => {
    render(<ErrorResponse error={retryableError} />)
    expect(screen.getAllByRole('alert').length).toBeGreaterThan(0)
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<ErrorResponse error={retryableError} onRetry={() => {}} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
