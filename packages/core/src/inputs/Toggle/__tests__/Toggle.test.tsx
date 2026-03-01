import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Toggle } from '../Toggle'

describe('Toggle', () => {
  it('renders children', () => {
    render(<Toggle>Bold</Toggle>)
    expect(screen.getByRole('button', { name: 'Bold' })).toBeDefined()
  })

  it('toggles on/off when clicked (uncontrolled with defaultSelected)', async () => {
    const user = userEvent.setup()
    render(<Toggle defaultSelected={false}>Bold</Toggle>)
    const btn = screen.getByRole('button', { name: 'Bold' })
    expect(btn.getAttribute('aria-pressed')).toBe('false')
    await user.click(btn)
    expect(btn.getAttribute('aria-pressed')).toBe('true')
    await user.click(btn)
    expect(btn.getAttribute('aria-pressed')).toBe('false')
  })

  it('supports controlled mode (isSelected + onChange)', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const { rerender } = render(
      <Toggle isSelected={false} onChange={onChange}>
        Bold
      </Toggle>,
    )
    const btn = screen.getByRole('button', { name: 'Bold' })
    expect(btn.getAttribute('aria-pressed')).toBe('false')
    await user.click(btn)
    expect(onChange).toHaveBeenCalledWith(true)

    rerender(
      <Toggle isSelected={true} onChange={onChange}>
        Bold
      </Toggle>,
    )
    expect(btn.getAttribute('aria-pressed')).toBe('true')
  })

  it('respects disabled state', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <Toggle isDisabled onChange={onChange}>
        Bold
      </Toggle>,
    )
    const btn = screen.getByRole('button', { name: 'Bold' })
    await user.click(btn)
    expect(onChange).not.toHaveBeenCalled()
  })

  it('merges className', () => {
    render(<Toggle className="custom-class">Bold</Toggle>)
    const btn = screen.getByRole('button', { name: 'Bold' })
    expect(btn.className).toContain('custom-class')
  })

  it('renders size variants', () => {
    const { rerender } = render(<Toggle size="sm">Bold</Toggle>)
    const btn = screen.getByRole('button', { name: 'Bold' })
    expect(btn.className).toContain('h-8')

    rerender(<Toggle size="lg">Bold</Toggle>)
    expect(btn.className).toContain('h-12')
  })
})
