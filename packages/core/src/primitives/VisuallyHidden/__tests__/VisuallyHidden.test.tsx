import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { VisuallyHidden } from '../VisuallyHidden'

describe('VisuallyHidden', () => {
  it('renders children', () => {
    render(<VisuallyHidden>Hidden text</VisuallyHidden>)
    expect(screen.getByText('Hidden text')).toBeDefined()
  })

  it('applies sr-only class', () => {
    render(<VisuallyHidden>Hidden text</VisuallyHidden>)
    expect(screen.getByText('Hidden text').className).toContain('sr-only')
  })

  it('renders as span', () => {
    render(<VisuallyHidden>Hidden text</VisuallyHidden>)
    expect(screen.getByText('Hidden text').tagName).toBe('SPAN')
  })
})
