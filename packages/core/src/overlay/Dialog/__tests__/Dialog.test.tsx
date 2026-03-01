import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Dialog } from '../Dialog'

describe('Dialog', () => {
  it('renders nothing when not open', () => {
    render(
      <Dialog isOpen={false} onClose={() => {}} title="Test">
        Content
      </Dialog>,
    )
    expect(screen.queryByText('Content')).toBeNull()
  })

  it('renders content when open', () => {
    render(
      <Dialog isOpen={true} onClose={() => {}} title="Test Dialog">
        Dialog body
      </Dialog>,
    )
    expect(screen.getByText('Test Dialog')).toBeDefined()
    expect(screen.getByText('Dialog body')).toBeDefined()
  })

  it('renders footer when provided', () => {
    render(
      <Dialog
        isOpen={true}
        onClose={() => {}}
        title="Test"
        footer={<button type="button">Save</button>}
      >
        Body
      </Dialog>,
    )
    expect(screen.getByText('Save')).toBeDefined()
  })
})
