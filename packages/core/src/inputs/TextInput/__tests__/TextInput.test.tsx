import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { TextInput } from '../TextInput'

describe('TextInput', () => {
  it('renders without crashing', () => {
    render(<TextInput label="Name" />)
    expect(screen.getByLabelText('Name')).toBeDefined()
  })

  it('applies className prop', () => {
    render(<TextInput label="Name" className="custom" />)
    expect(screen.getByLabelText('Name').parentElement?.className).toContain('custom')
  })

  it('renders description', () => {
    render(<TextInput label="Name" description="Enter your full name" />)
    expect(screen.getByText('Enter your full name')).toBeDefined()
  })

  it('renders error message', () => {
    render(<TextInput label="Name" errorMessage="Required field" />)
    expect(screen.getByText('Required field')).toBeDefined()
  })

  it('handles disabled state', () => {
    render(<TextInput label="Name" isDisabled />)
    expect(screen.getByLabelText('Name')).toBeDisabled()
  })
})
