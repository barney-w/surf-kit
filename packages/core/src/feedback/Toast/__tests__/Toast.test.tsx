import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ToastProvider, useToast } from '../Toast'

function TestComponent() {
  const toast = useToast()
  return (
    <button type="button" onClick={() => toast({ message: 'Hello toast', intent: 'success' })}>
      Show Toast
    </button>
  )
}

describe('Toast', () => {
  it('renders provider without crashing', () => {
    render(
      <ToastProvider>
        <div>App content</div>
      </ToastProvider>,
    )
    expect(screen.getByText('App content')).toBeDefined()
  })

  it('shows toast when triggered', async () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>,
    )
    await userEvent.click(screen.getByText('Show Toast'))
    expect(screen.getByText('Hello toast')).toBeDefined()
  })

  it('throws when useToast is used outside provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<TestComponent />)).toThrow('useToast must be used within a ToastProvider')
    spy.mockRestore()
  })
})
