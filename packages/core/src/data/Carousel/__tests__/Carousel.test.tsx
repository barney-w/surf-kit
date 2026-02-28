import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'

import { Carousel } from '../Carousel'

function renderCarousel(props: Partial<React.ComponentProps<typeof Carousel>> = {}) {
  return render(
    <Carousel {...props}>
      <div>Slide A</div>
      <div>Slide B</div>
      <div>Slide C</div>
    </Carousel>,
  )
}

describe('Carousel', () => {
  it('renders children as slides', () => {
    renderCarousel()
    expect(screen.getByText('Slide A')).toBeDefined()
    expect(screen.getByText('Slide B')).toBeDefined()
    expect(screen.getByText('Slide C')).toBeDefined()
  })

  it('renders correct number of dot indicators', () => {
    renderCarousel()
    const dots = screen.getAllByRole('tab')
    expect(dots).toHaveLength(3)
  })

  it('arrow buttons exist with correct aria-labels', () => {
    renderCarousel()
    expect(screen.getByRole('button', { name: 'Previous slide' })).toBeDefined()
    expect(screen.getByRole('button', { name: 'Next slide' })).toBeDefined()
  })

  it('has correct ARIA attributes (roledescription="carousel")', () => {
    renderCarousel()
    const region = screen.getByRole('region')
    expect(region).toHaveAttribute('aria-roledescription', 'carousel')
    expect(region).toHaveAttribute('aria-label', 'Carousel')
  })

  it('slides have correct aria-labels ("Slide 1 of 3", etc.)', () => {
    renderCarousel()
    const slides = screen.getAllByRole('group')
    expect(slides).toHaveLength(3)
    expect(slides[0]).toHaveAttribute('aria-roledescription', 'slide')
    expect(slides[0]).toHaveAttribute('aria-label', 'Slide 1 of 3')
    expect(slides[1]).toHaveAttribute('aria-label', 'Slide 2 of 3')
    expect(slides[2]).toHaveAttribute('aria-label', 'Slide 3 of 3')
  })

  it('merges className', () => {
    renderCarousel({ className: 'custom-class' })
    const region = screen.getByRole('region')
    expect(region.className).toContain('custom-class')
  })

  it('previous button is disabled at first slide when loop is false', () => {
    renderCarousel({ loop: false })
    const prevButton = screen.getByRole('button', { name: 'Previous slide' })
    expect(prevButton).toBeDisabled()
  })

  it('previous button is not disabled at first slide when loop is true', () => {
    renderCarousel({ loop: true })
    const prevButton = screen.getByRole('button', { name: 'Previous slide' })
    expect(prevButton).not.toBeDisabled()
  })

  it('next button is not disabled at first slide', () => {
    renderCarousel()
    const nextButton = screen.getByRole('button', { name: 'Next slide' })
    expect(nextButton).not.toBeDisabled()
  })

  it('hides arrows when showArrows is false', () => {
    renderCarousel({ showArrows: false })
    expect(screen.queryByRole('button', { name: 'Previous slide' })).toBeNull()
    expect(screen.queryByRole('button', { name: 'Next slide' })).toBeNull()
  })

  it('hides dots when showDots is false', () => {
    renderCarousel({ showDots: false })
    expect(screen.queryAllByRole('tab')).toHaveLength(0)
  })

  it('does not show arrows or dots for a single slide', () => {
    render(
      <Carousel>
        <div>Only slide</div>
      </Carousel>,
    )
    expect(screen.queryByRole('button', { name: 'Previous slide' })).toBeNull()
    expect(screen.queryByRole('button', { name: 'Next slide' })).toBeNull()
    expect(screen.queryAllByRole('tab')).toHaveLength(0)
  })
})
