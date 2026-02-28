import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ScrollArea } from '../ScrollArea'

describe('ScrollArea', () => {
  it('renders children', () => {
    render(<ScrollArea><span>Hello</span></ScrollArea>)
    expect(screen.getByText('Hello')).toBeDefined()
  })
  it('applies vertical orientation by default', () => {
    const { container } = render(<ScrollArea>Content</ScrollArea>)
    const el = container.firstElementChild!
    expect(el.className).toContain('overflow-y-auto')
    expect(el.className).toContain('overflow-x-hidden')
  })
  it('applies horizontal orientation', () => {
    const { container } = render(<ScrollArea orientation="horizontal">Content</ScrollArea>)
    const el = container.firstElementChild!
    expect(el.className).toContain('overflow-x-auto')
    expect(el.className).toContain('overflow-y-hidden')
  })
  it('applies maxHeight style', () => {
    const { container } = render(<ScrollArea maxHeight="200px">Content</ScrollArea>)
    expect(container.firstElementChild?.getAttribute('style')).toContain('max-height: 200px')
  })
  it('merges className', () => {
    const { container } = render(<ScrollArea className="custom">Content</ScrollArea>)
    expect(container.firstElementChild?.className).toContain('custom')
  })
})
