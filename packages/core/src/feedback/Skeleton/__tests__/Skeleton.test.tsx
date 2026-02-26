import { render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('@surf-kit/hooks', () => ({
  useReducedMotion: () => false,
}))

import { Skeleton } from '../Skeleton'

describe('Skeleton', () => {
  it('renders without crashing', () => {
    const { container } = render(<Skeleton />)
    expect(container.firstChild).toBeDefined()
  })

  it('has aria-hidden', () => {
    const { container } = render(<Skeleton />)
    expect((container.firstChild as HTMLElement).getAttribute('aria-hidden')).toBe('true')
  })

  it('applies className prop', () => {
    const { container } = render(<Skeleton className="custom" />)
    expect((container.firstChild as HTMLElement).className).toContain('custom')
  })

  it('renders all variant types', () => {
    const variants = ['text', 'circle', 'rect'] as const
    for (const variant of variants) {
      const { container, unmount } = render(<Skeleton variant={variant} />)
      expect(container.firstChild).toBeDefined()
      unmount()
    }
  })

  it('applies width and height styles', () => {
    const { container } = render(<Skeleton width={200} height={100} />)
    const el = container.firstChild as HTMLElement
    expect(el.style.width).toBe('200px')
    expect(el.style.height).toBe('100px')
  })
})
