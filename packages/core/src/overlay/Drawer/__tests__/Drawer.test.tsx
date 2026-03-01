import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Drawer } from '../Drawer'

describe('Drawer', () => {
  it('does not render when isOpen is false', () => {
    render(
      <Drawer isOpen={false} onClose={() => {}}>
        Drawer content
      </Drawer>,
    )
    expect(screen.queryByText('Drawer content')).toBeNull()
  })

  it('renders when isOpen is true', () => {
    render(
      <Drawer isOpen={true} onClose={() => {}}>
        Drawer content
      </Drawer>,
    )
    expect(screen.getByText('Drawer content')).toBeDefined()
  })

  it('renders title when provided', () => {
    render(
      <Drawer isOpen={true} onClose={() => {}} title="Drawer Title">
        Content
      </Drawer>,
    )
    expect(screen.getByText('Drawer Title')).toBeDefined()
  })

  it('calls onClose on Escape key', async () => {
    const onClose = vi.fn()
    render(
      <Drawer isOpen={true} onClose={onClose}>
        Content
      </Drawer>,
    )
    const user = userEvent.setup()
    await user.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('merges className', () => {
    render(
      <Drawer isOpen={true} onClose={() => {}} className="custom-drawer">
        Content
      </Drawer>,
    )
    expect(screen.getByRole('dialog').className).toContain('custom-drawer')
  })

  it('renders drag handle for bottom side', () => {
    const { container } = render(
      <Drawer isOpen={true} onClose={() => {}} side="bottom">
        Content
      </Drawer>,
    )
    // The drag handle is a small rounded div
    const handle = container.querySelector('.bg-border.rounded-full')
    expect(handle).toBeDefined()
    expect(handle).not.toBeNull()
  })
})
