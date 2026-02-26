import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Switch } from '../Switch'

describe('Switch', () => {
  it('renders without crashing', () => {
    render(<Switch label="Dark mode" />)
    expect(screen.getByText('Dark mode')).toBeDefined()
  })

  it('applies className prop', () => {
    const { container } = render(<Switch label="Dark mode" className="custom" />)
    expect(container.firstElementChild?.className).toContain('custom')
  })

  it('calls onChange when clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Switch label="Dark mode" onChange={onChange} />)
    const switchEl = screen.getByRole('switch')
    await user.click(switchEl)
    expect(onChange).toHaveBeenCalledWith(true)
  })
})
