import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { RadioGroup } from '../RadioGroup'

const items = [
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
]

describe('RadioGroup', () => {
  it('renders without crashing', () => {
    render(<RadioGroup label="Size" items={items} />)
    expect(screen.getByText('Size')).toBeDefined()
    expect(screen.getByText('Small')).toBeDefined()
  })

  it('applies className prop', () => {
    render(<RadioGroup label="Size" items={items} className="custom" />)
    expect(screen.getByRole('radiogroup').className).toContain('custom')
  })

  it('selects a radio on click', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<RadioGroup label="Size" items={items} onChange={onChange} />)
    const radio = screen.getByLabelText('Medium')
    await user.click(radio)
    expect(onChange).toHaveBeenCalledWith('md')
  })
})
