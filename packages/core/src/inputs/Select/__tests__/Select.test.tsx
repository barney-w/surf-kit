import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Select } from '../Select'

const items = [
  { key: 'cat', label: 'Cat' },
  { key: 'dog', label: 'Dog' },
  { key: 'fish', label: 'Fish' },
]

describe('Select', () => {
  it('renders without crashing', () => {
    render(<Select label="Pet" items={items} />)
    expect(screen.getByRole('button')).toBeDefined()
    expect(screen.getAllByText('Pet').length).toBeGreaterThan(0)
  })

  it('applies className prop', () => {
    const { container } = render(<Select label="Pet" items={items} className="custom" />)
    expect(container.firstElementChild?.className).toContain('custom')
  })

  it('opens dropdown on trigger click', async () => {
    const user = userEvent.setup()
    render(<Select label="Pet" items={items} />)
    const trigger = screen.getByRole('button')
    await user.click(trigger)
    expect(screen.getByRole('listbox')).toBeDefined()
  })
})
