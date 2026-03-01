import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Slider } from '../Slider'

describe('Slider', () => {
  it('renders with label', () => {
    render(<Slider label="Volume" />)
    expect(screen.getByText('Volume')).toBeDefined()
  })

  it('renders default value', () => {
    render(<Slider label="Volume" defaultValue={75} />)
    const slider = screen.getByRole('slider')
    expect(slider).toBeDefined()
    // react-aria uses native input[type=range] with value property
    expect((slider as HTMLInputElement).value).toBe('75')
  })

  it('respects min/max bounds', () => {
    render(<Slider label="Price" minValue={10} maxValue={200} defaultValue={50} />)
    const slider = screen.getByRole('slider') as HTMLInputElement
    expect(slider.min).toBe('10')
    expect(slider.max).toBe('200')
    expect(slider.value).toBe('50')
  })

  it('applies disabled state', () => {
    const { container } = render(<Slider label="Volume" isDisabled defaultValue={50} />)
    const slider = screen.getByRole('slider') as HTMLInputElement
    expect(slider.disabled).toBe(true)
    expect(container.firstElementChild?.className).toContain('opacity-50')
  })

  it('merges className prop', () => {
    const { container } = render(<Slider label="Volume" className="custom-class" />)
    expect(container.firstElementChild?.className).toContain('custom-class')
  })

  it('renders output element with formatted value', () => {
    render(<Slider label="Volume" defaultValue={42} />)
    const output = screen.getByRole('status')
    expect(output.textContent).toBe('42')
  })

  it('supports controlled value', () => {
    const { rerender } = render(<Slider label="Volume" value={30} />)
    expect((screen.getByRole('slider') as HTMLInputElement).value).toBe('30')
    rerender(<Slider label="Volume" value={60} />)
    expect((screen.getByRole('slider') as HTMLInputElement).value).toBe('60')
  })
})
