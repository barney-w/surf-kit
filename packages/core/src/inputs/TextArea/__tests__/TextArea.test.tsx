import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { TextArea } from '../TextArea'

describe('TextArea', () => {
  it('renders without crashing', () => {
    render(<TextArea label="Message" />)
    expect(screen.getByLabelText('Message')).toBeDefined()
  })

  it('applies className prop', () => {
    render(<TextArea label="Message" className="custom" />)
    expect(screen.getByLabelText('Message').parentElement?.className).toContain('custom')
  })

  it('renders with custom rows', () => {
    render(<TextArea label="Message" rows={5} />)
    expect(screen.getByLabelText('Message').getAttribute('rows')).toBe('5')
  })

  it('renders description', () => {
    render(<TextArea label="Message" description="Write something" />)
    expect(screen.getByText('Write something')).toBeDefined()
  })

  it('renders error message', () => {
    render(<TextArea label="Message" errorMessage="Too short" />)
    expect(screen.getByText('Too short')).toBeDefined()
  })

  it('handles disabled state', () => {
    render(<TextArea label="Message" isDisabled />)
    expect(screen.getByLabelText('Message')).toBeDisabled()
  })
})
