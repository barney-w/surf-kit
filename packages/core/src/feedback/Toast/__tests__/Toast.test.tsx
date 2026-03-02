import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { ToastProvider, useToast } from '../Toast'

function TestComponent() {
  const toast = useToast()
  return (
    <button onClick={() => toast({ message: 'Hello toast', intent: 'success' })}>
      Show Toast
    </button>
  )
}

function TimedToastTestComponent() {
  const toast = useToast()
  return (
    <button onClick={() => toast({ message: 'Timed toast', duration: 1000 })}>
      Show Timed Toast
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

  it('pauses auto-dismiss on hover and resumes with remaining time on mouse leave', () => {
    vi.useFakeTimers()

    render(
      <ToastProvider>
        <TimedToastTestComponent />
      </ToastProvider>,
    )

    fireEvent.click(screen.getByText('Show Timed Toast'))
    const toastMessage = screen.getByText('Timed toast')
    const toastContainer = toastMessage.closest('div')
    expect(toastContainer).toBeTruthy()

    act(() => {
      vi.advanceTimersByTime(600)
    })
    fireEvent.mouseEnter(toastContainer as HTMLDivElement)

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(screen.getByText('Timed toast')).toBeDefined()

    fireEvent.mouseLeave(toastContainer as HTMLDivElement)
    act(() => {
      vi.advanceTimersByTime(399)
    })
    expect(screen.getByText('Timed toast')).toBeDefined()

    act(() => {
      vi.advanceTimersByTime(1)
    })
    expect(screen.queryByText('Timed toast')).toBeNull()

    vi.useRealTimers()
  })

  it('throws when useToast is used outside provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<TestComponent />)).toThrow(
      'useToast must be used within a ToastProvider',
    )
    spy.mockRestore()
  })
})
