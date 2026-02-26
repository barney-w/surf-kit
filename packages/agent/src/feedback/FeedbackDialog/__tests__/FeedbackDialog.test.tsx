import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeAll } from 'vitest'
import * as vitestAxe from 'vitest-axe/matchers'
import { axe } from 'vitest-axe'
import { OverlayProvider } from 'react-aria'

import { FeedbackDialog } from '../FeedbackDialog'

expect.extend(vitestAxe)

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
})

function renderWithProvider(ui: React.ReactElement) {
  return render(<OverlayProvider>{ui}</OverlayProvider>)
}

describe('FeedbackDialog', () => {
  it('renders dialog with title when open', () => {
    renderWithProvider(<FeedbackDialog isOpen onClose={vi.fn()} onSubmit={vi.fn()} />)
    expect(screen.getByText('Share your feedback')).toBeDefined()
  })

  it('renders nothing when closed', () => {
    renderWithProvider(<FeedbackDialog isOpen={false} onClose={vi.fn()} onSubmit={vi.fn()} />)
    expect(screen.queryByText('Share your feedback')).toBeNull()
  })

  it('renders textarea for feedback', () => {
    renderWithProvider(<FeedbackDialog isOpen onClose={vi.fn()} onSubmit={vi.fn()} />)
    expect(screen.getByLabelText('What could be improved?')).toBeDefined()
  })

  it('renders submit and cancel buttons', () => {
    renderWithProvider(<FeedbackDialog isOpen onClose={vi.fn()} onSubmit={vi.fn()} />)
    expect(screen.getByText('Submit')).toBeDefined()
    expect(screen.getByText('Cancel')).toBeDefined()
  })

  it('calls onClose when cancel is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    renderWithProvider(<FeedbackDialog isOpen onClose={onClose} onSubmit={vi.fn()} />)

    await user.click(screen.getByText('Cancel'))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('calls onSubmit with comment text', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    const onClose = vi.fn()
    renderWithProvider(<FeedbackDialog isOpen onClose={onClose} onSubmit={onSubmit} />)

    const textarea = screen.getByLabelText('What could be improved?')
    await user.type(textarea, 'The answer was inaccurate')
    await user.click(screen.getByText('Submit'))

    expect(onSubmit).toHaveBeenCalledWith('The answer was inaccurate')
    expect(onClose).toHaveBeenCalled()
  })

  it('has no accessibility violations', async () => {
    const { container } = renderWithProvider(
      <FeedbackDialog isOpen onClose={vi.fn()} onSubmit={vi.fn()} />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
