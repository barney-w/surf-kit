import React, { useState, useRef, useCallback, useEffect, Children } from 'react'
import { twMerge } from 'tailwind-merge'

type CarouselProps = {
  children: React.ReactNode
  autoPlay?: boolean
  autoPlayInterval?: number
  showArrows?: boolean
  showDots?: boolean
  loop?: boolean
  className?: string
}

function Carousel({
  children,
  autoPlay = false,
  autoPlayInterval = 5000,
  showArrows = true,
  showDots = true,
  loop = false,
  className,
}: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const isHoveredRef = useRef(false)
  const slideCount = Children.count(children)

  const scrollToSlide = useCallback(
    (index: number) => {
      const container = containerRef.current
      if (!container) return
      const slideWidth = container.offsetWidth
      container.scrollTo({ left: slideWidth * index, behavior: 'smooth' })
    },
    [],
  )

  const goToNext = useCallback(() => {
    if (currentSlide >= slideCount - 1) {
      if (loop) {
        scrollToSlide(0)
        setCurrentSlide(0)
      }
    } else {
      scrollToSlide(currentSlide + 1)
      setCurrentSlide(currentSlide + 1)
    }
  }, [currentSlide, slideCount, loop, scrollToSlide])

  const goToPrevious = useCallback(() => {
    if (currentSlide <= 0) {
      if (loop) {
        scrollToSlide(slideCount - 1)
        setCurrentSlide(slideCount - 1)
      }
    } else {
      scrollToSlide(currentSlide - 1)
      setCurrentSlide(currentSlide - 1)
    }
  }, [currentSlide, slideCount, loop, scrollToSlide])

  const goToSlide = useCallback(
    (index: number) => {
      scrollToSlide(index)
      setCurrentSlide(index)
    },
    [scrollToSlide],
  )

  // Track current slide via scroll position
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    function handleScroll() {
      if (!container) return
      const slideWidth = container.offsetWidth
      if (slideWidth === 0) return
      const index = Math.round(container.scrollLeft / slideWidth)
      setCurrentSlide(index)
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  // AutoPlay
  useEffect(() => {
    if (!autoPlay || slideCount <= 1) return

    const interval = setInterval(() => {
      if (isHoveredRef.current) return
      if (currentSlide >= slideCount - 1) {
        if (loop) {
          scrollToSlide(0)
          setCurrentSlide(0)
        }
      } else {
        scrollToSlide(currentSlide + 1)
        setCurrentSlide(currentSlide + 1)
      }
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, currentSlide, slideCount, loop, scrollToSlide])

  const handleMouseEnter = useCallback(() => {
    isHoveredRef.current = true
  }, [])

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false
  }, [])

  const arrowClassName =
    'absolute top-1/2 -translate-y-1/2 bg-surface/80 hover:bg-surface border border-border rounded-full p-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'

  const isPrevDisabled = !loop && currentSlide === 0
  const isNextDisabled = !loop && currentSlide === slideCount - 1

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Carousel"
      className={twMerge('relative', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={containerRef}
        className="flex overflow-x-auto scrollbar-none"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {Children.map(children, (child, index) => (
          <div
            key={index}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${index + 1} of ${slideCount}`}
            className="w-full flex-shrink-0"
            style={{ scrollSnapAlign: 'start' }}
          >
            {child}
          </div>
        ))}
      </div>

      {showArrows && slideCount > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            disabled={isPrevDisabled}
            onClick={goToPrevious}
            className={twMerge(arrowClassName, 'left-2')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next slide"
            disabled={isNextDisabled}
            onClick={goToNext}
            className={twMerge(arrowClassName, 'right-2')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </>
      )}

      {showDots && slideCount > 1 && (
        <div className="flex justify-center gap-2 pt-3" role="tablist" aria-label="Slide controls">
          {Array.from({ length: slideCount }, (_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={index === currentSlide}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => goToSlide(index)}
              className={twMerge(
                'h-2 w-2 rounded-full transition-colors',
                index === currentSlide ? 'bg-accent' : 'bg-border',
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export { Carousel }
export type { CarouselProps }
