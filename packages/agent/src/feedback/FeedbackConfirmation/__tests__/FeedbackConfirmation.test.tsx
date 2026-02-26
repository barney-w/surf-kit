import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import * as vitestAxe from 'vitest-axe/matchers'
import { axe } from 'vitest-axe'

import { FeedbackConfirmation } from '../FeedbackConfirmation'

expect.extend(vitestAxe)

describe('FeedbackConfirmation', () => {
  it('renders "Thanks for your feedback" message', () => {
    render(<FeedbackConfirmation />)
    expect(screen.getByText('Thanks for your feedback')).toBeDefined()
  })

  it('renders inline variant by default', () => {
    render(<FeedbackConfirmation />)
    const el = screen.getByTestId('feedback-confirmation')
    expect(el.tagName).toBe('SPAN')
  })

  it('renders toast variant', () => {
    render(<FeedbackConfirmation variant="toast" />)
    const el = screen.getByTestId('feedback-confirmation')
    expect(el.tagName).toBe('DIV')
  })

  it('has status role', () => {
    render(<FeedbackConfirmation />)
    expect(screen.getByRole('status')).toBeDefined()
  })

  it('has no accessibility violations (inline)', async () => {
    const { container } = render(<FeedbackConfirmation variant="inline" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('has no accessibility violations (toast)', async () => {
    const { container } = render(<FeedbackConfirmation variant="toast" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
