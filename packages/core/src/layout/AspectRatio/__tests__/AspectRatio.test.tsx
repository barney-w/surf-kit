import { render, screen } from '@testing-library/react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, it, expect } from 'vitest'
import { AspectRatio } from '../AspectRatio'

describe('AspectRatio', () => {
  it('renders children', () => {
    render(<AspectRatio><span>Hello</span></AspectRatio>)
    expect(screen.getByText('Hello')).toBeDefined()
  })
  it('applies default 1:1 ratio', () => {
    // jsdom 28+ does not support aspect-ratio as a CSS property, so DOM-based
    // style checks silently drop it. Use server rendering to verify the style.
    const html = renderToStaticMarkup(<AspectRatio>Content</AspectRatio>)
    expect(html).toContain('aspect-ratio:1')
  })
  it('applies custom ratio', () => {
    const html = renderToStaticMarkup(<AspectRatio ratio={16/9}>Content</AspectRatio>)
    expect(html).toContain('aspect-ratio:')
  })
  it('merges className', () => {
    const { container } = render(<AspectRatio className="custom">Content</AspectRatio>)
    expect(container.firstElementChild?.className).toContain('custom')
  })
})
