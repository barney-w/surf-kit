import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Alert } from '../Alert'

describe('Alert', () => {
  it('renders without crashing', () => {
    render(<Alert>Test message</Alert>)
    expect(screen.getByRole('status')).toBeDefined()
    expect(screen.getByText('Test message')).toBeDefined()
  })

  it('uses role="alert" for error intent', () => {
    render(<Alert intent="error">Error message</Alert>)
    expect(screen.getByRole('alert')).toBeDefined()
  })

  it('uses role="alert" for warning intent', () => {
    render(<Alert intent="warning">Warning message</Alert>)
    expect(screen.getByRole('alert')).toBeDefined()
  })

  it('uses role="status" for info and success intents', () => {
    const { unmount } = render(<Alert intent="info">Info</Alert>)
    expect(screen.getByRole('status')).toBeDefined()
    unmount()

    render(<Alert intent="success">Success</Alert>)
    expect(screen.getByRole('status')).toBeDefined()
  })

  it('renders title when provided', () => {
    render(<Alert title="Title">Content</Alert>)
    expect(screen.getByText('Title')).toBeDefined()
  })

  it('renders dismiss button and fires onDismiss', async () => {
    const handler = vi.fn()
    render(<Alert onDismiss={handler}>Dismissible</Alert>)
    const btn = screen.getByRole('button', { name: 'Dismiss' })
    await userEvent.click(btn)
    expect(handler).toHaveBeenCalledTimes(1)
  })
})
