import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { SearchInput } from '../SearchInput'

describe('SearchInput', () => {
  it('renders without crashing', () => {
    render(<SearchInput label="Search" />)
    expect(screen.getByLabelText('Search')).toBeDefined()
  })

  it('applies className prop', () => {
    render(<SearchInput label="Search" className="custom" />)
    expect(screen.getByLabelText('Search').closest('.custom')).toBeDefined()
  })

  it('allows typing in the input', async () => {
    const user = userEvent.setup()
    render(<SearchInput label="Search" placeholder="Search..." />)
    const input = screen.getByLabelText('Search')
    await user.type(input, 'hello')
    expect(input).toHaveValue('hello')
  })
})
