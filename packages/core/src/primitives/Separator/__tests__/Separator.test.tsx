import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Separator } from '../Separator'

describe('Separator', () => {
  it('renders with separator role', () => {
    render(<Separator />)
    expect(screen.getByRole('separator')).toBeDefined()
  })

  it('applies className', () => {
    render(<Separator className="custom-class" />)
    expect(screen.getByRole('separator').className).toContain('custom-class')
  })

  it('has horizontal orientation by default', () => {
    render(<Separator />)
    expect(screen.getByRole('separator').getAttribute('aria-orientation')).toBe('horizontal')
  })

  it('applies horizontal styles by default', () => {
    render(<Separator />)
    const el = screen.getByRole('separator')
    expect(el.className).toContain('h-px')
    expect(el.className).toContain('w-full')
  })

  it('applies vertical orientation', () => {
    render(<Separator orientation="vertical" />)
    const el = screen.getByRole('separator')
    expect(el.getAttribute('aria-orientation')).toBe('vertical')
    expect(el.className).toContain('w-px')
    expect(el.className).toContain('h-full')
  })
})
