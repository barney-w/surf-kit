import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Avatar } from '../Avatar'

describe('Avatar', () => {
  it('renders image when src is provided', () => {
    render(<Avatar src="https://example.com/photo.jpg" alt="User" />)
    const img = screen.getByRole('img')
    expect(img).toBeDefined()
    expect(img.getAttribute('src')).toBe('https://example.com/photo.jpg')
    expect(img.getAttribute('alt')).toBe('User')
  })

  it('renders initials from name when no src', () => {
    render(<Avatar name="John Doe" />)
    expect(screen.getByText('JD')).toBeDefined()
    expect(screen.getByText('JD').getAttribute('aria-label')).toBe('John Doe')
  })

  it('falls back to initials on image error', () => {
    render(<Avatar src="https://example.com/broken.jpg" name="Jane Smith" />)
    const img = screen.getByRole('img')
    fireEvent.error(img)
    expect(screen.getByText('JS')).toBeDefined()
  })

  it('computes initials correctly for a single word name', () => {
    render(<Avatar name="Alice" />)
    expect(screen.getByText('A')).toBeDefined()
  })

  it('computes initials correctly for a two-word name', () => {
    render(<Avatar name="Bob Marley" />)
    expect(screen.getByText('BM')).toBeDefined()
  })

  it('renders all size variants', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
    for (const size of sizes) {
      const { container, unmount } = render(<Avatar name="Test User" size={size} />)
      expect(container.firstElementChild).toBeDefined()
      unmount()
    }
  })

  it('merges className prop', () => {
    const { container } = render(<Avatar name="Test" className="custom-class" />)
    expect(container.firstElementChild?.className).toContain('custom-class')
  })

  it('renders fallback question mark when no src or name', () => {
    const { container } = render(<Avatar />)
    const span = container.querySelector('span[aria-hidden="true"]')
    expect(span).toBeDefined()
    expect(span?.textContent).toBe('?')
  })
})
