import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { HoverCard } from '../HoverCard'

describe('HoverCard', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders trigger children', () => {
    render(
      <HoverCard content="Card content">
        <span>Hover me</span>
      </HoverCard>,
    )
    expect(screen.getByText('Hover me')).toBeDefined()
  })

  it('hides content by default', () => {
    render(
      <HoverCard content="Card content">
        <span>Hover me</span>
      </HoverCard>,
    )
    expect(screen.queryByText('Card content')).toBeNull()
  })

  it('shows content on hover after delay', () => {
    render(
      <HoverCard content="Card content" openDelay={0}>
        <span>Hover me</span>
      </HoverCard>,
    )

    const container = screen.getByText('Hover me').closest('.relative')!
    fireEvent.mouseEnter(container)

    act(() => {
      vi.advanceTimersByTime(0)
    })

    expect(screen.getByText('Card content')).toBeDefined()
  })

  it('hides content on mouse leave after delay', () => {
    render(
      <HoverCard content="Card content" openDelay={0} closeDelay={0}>
        <span>Hover me</span>
      </HoverCard>,
    )

    const container = screen.getByText('Hover me').closest('.relative')!
    fireEvent.mouseEnter(container)

    act(() => {
      vi.advanceTimersByTime(0)
    })

    expect(screen.getByText('Card content')).toBeDefined()

    fireEvent.mouseLeave(container)

    act(() => {
      vi.advanceTimersByTime(0)
    })

    expect(screen.queryByText('Card content')).toBeNull()
  })

  it('merges className onto content card', () => {
    render(
      <HoverCard content="Card content" openDelay={0} className="custom-class">
        <span>Hover me</span>
      </HoverCard>,
    )

    const container = screen.getByText('Hover me').closest('.relative')!
    fireEvent.mouseEnter(container)

    act(() => {
      vi.advanceTimersByTime(0)
    })

    expect(screen.getByRole('tooltip').className).toContain('custom-class')
  })

  it('keeps content visible when mouse moves to card', () => {
    render(
      <HoverCard content="Card content" openDelay={0} closeDelay={100}>
        <span>Hover me</span>
      </HoverCard>,
    )

    const container = screen.getByText('Hover me').closest('.relative')!
    fireEvent.mouseEnter(container)

    act(() => {
      vi.advanceTimersByTime(0)
    })

    expect(screen.getByText('Card content')).toBeDefined()

    // Mouse leave then re-enter before close delay
    fireEvent.mouseLeave(container)
    fireEvent.mouseEnter(container)

    act(() => {
      vi.advanceTimersByTime(100)
    })

    // Content should still be visible because re-enter cancelled the close timer
    expect(screen.getByText('Card content')).toBeDefined()
  })
})
