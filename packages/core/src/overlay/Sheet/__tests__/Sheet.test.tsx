import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Sheet } from '../Sheet'

describe('Sheet', () => {
  it('renders nothing when not open', () => {
    render(
      <Sheet isOpen={false} onClose={() => {}}>
        Sheet content
      </Sheet>,
    )
    expect(screen.queryByText('Sheet content')).toBeNull()
  })

  it('renders content when open', () => {
    render(
      <Sheet isOpen={true} onClose={() => {}} title="Settings">
        Sheet content
      </Sheet>,
    )
    expect(screen.getByText('Settings')).toBeDefined()
    expect(screen.getByText('Sheet content')).toBeDefined()
  })

  it('renders close button when title is provided', () => {
    render(
      <Sheet isOpen={true} onClose={() => {}} title="Panel">
        Body
      </Sheet>,
    )
    expect(screen.getByRole('button', { name: 'Close' })).toBeDefined()
  })
})
