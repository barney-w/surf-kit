import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Badge } from '../Badge'

describe('Badge', () => {
  it('renders without crashing', () => {
    render(<Badge>New</Badge>)
    expect(screen.getByText('New')).toBeDefined()
  })

  it('applies className prop', () => {
    render(<Badge className="custom">Tag</Badge>)
    expect(screen.getByText('Tag').className).toContain('custom')
  })

  it('renders all intent variants', () => {
    const intents = ['default', 'success', 'warning', 'error', 'info'] as const
    for (const intent of intents) {
      const { unmount } = render(<Badge intent={intent}>{intent}</Badge>)
      expect(screen.getByText(intent)).toBeDefined()
      unmount()
    }
  })

  it('renders all size variants', () => {
    const sizes = ['sm', 'md'] as const
    for (const size of sizes) {
      const { unmount } = render(<Badge size={size}>Tag</Badge>)
      expect(screen.getByText('Tag')).toBeDefined()
      unmount()
    }
  })
})
