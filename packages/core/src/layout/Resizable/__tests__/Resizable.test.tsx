import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Resizable } from '../Resizable'

describe('Resizable', () => {
  it('renders two panels', () => {
    render(
      <Resizable>
        <div>Panel A</div>
        <div>Panel B</div>
      </Resizable>,
    )
    expect(screen.getByText('Panel A')).toBeDefined()
    expect(screen.getByText('Panel B')).toBeDefined()
  })

  it('has separator with correct role', () => {
    render(
      <Resizable>
        <div>Left</div>
        <div>Right</div>
      </Resizable>,
    )
    const separator = screen.getByRole('separator')
    expect(separator).toBeDefined()
    expect(separator.tabIndex).toBe(0)
  })

  it('separator has aria-valuenow matching defaultSize', () => {
    render(
      <Resizable defaultSize={30}>
        <div>Left</div>
        <div>Right</div>
      </Resizable>,
    )
    const separator = screen.getByRole('separator')
    expect(separator.getAttribute('aria-valuenow')).toBe('30')
    expect(separator.getAttribute('aria-valuemin')).toBe('10')
    expect(separator.getAttribute('aria-valuemax')).toBe('90')
  })

  it('merges className', () => {
    const { container } = render(
      <Resizable className="custom-class">
        <div>Left</div>
        <div>Right</div>
      </Resizable>,
    )
    expect(container.firstElementChild?.className).toContain('custom-class')
  })

  it('keyboard navigation changes size for horizontal', () => {
    render(
      <Resizable defaultSize={50}>
        <div>Left</div>
        <div>Right</div>
      </Resizable>,
    )
    const separator = screen.getByRole('separator')
    fireEvent.keyDown(separator, { key: 'ArrowLeft' })
    expect(separator.getAttribute('aria-valuenow')).toBe('45')
    fireEvent.keyDown(separator, { key: 'ArrowRight' })
    expect(separator.getAttribute('aria-valuenow')).toBe('50')
  })

  it('keyboard navigation changes size for vertical', () => {
    render(
      <Resizable direction="vertical" defaultSize={50}>
        <div>Top</div>
        <div>Bottom</div>
      </Resizable>,
    )
    const separator = screen.getByRole('separator')
    fireEvent.keyDown(separator, { key: 'ArrowUp' })
    expect(separator.getAttribute('aria-valuenow')).toBe('45')
    fireEvent.keyDown(separator, { key: 'ArrowDown' })
    expect(separator.getAttribute('aria-valuenow')).toBe('50')
  })

  it('applies vertical layout classes', () => {
    const { container } = render(
      <Resizable direction="vertical">
        <div>Top</div>
        <div>Bottom</div>
      </Resizable>,
    )
    expect(container.firstElementChild?.className).toContain('flex-col')
  })

  it('respects minSize and maxSize bounds', () => {
    render(
      <Resizable defaultSize={12} minSize={10} maxSize={90}>
        <div>Left</div>
        <div>Right</div>
      </Resizable>,
    )
    const separator = screen.getByRole('separator')
    // Press left 3 times: 12 -> 10 -> 10 -> 10 (clamped)
    fireEvent.keyDown(separator, { key: 'ArrowLeft' })
    expect(separator.getAttribute('aria-valuenow')).toBe('10')
    fireEvent.keyDown(separator, { key: 'ArrowLeft' })
    expect(separator.getAttribute('aria-valuenow')).toBe('10')
  })
})
