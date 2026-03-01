import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Calendar } from '../Calendar'

describe('Calendar', () => {
  it('renders with month/year header', () => {
    render(<Calendar defaultValue={new Date(2024, 5, 15)} />)
    // react-aria renders a title with the month and year
    expect(screen.getByText(/june/i)).toBeDefined()
    expect(screen.getByText(/2024/i)).toBeDefined()
  })

  it('renders day-of-week headers', () => {
    render(<Calendar />)
    // react-aria renders narrow weekday abbreviations by default
    const table = screen.getByRole('grid')
    const headers = table.querySelectorAll('th')
    expect(headers.length).toBe(7)
  })

  it('renders date cells', () => {
    render(<Calendar defaultValue={new Date(2024, 5, 15)} />)
    const grid = screen.getByRole('grid')
    // Should have cells with day numbers
    const buttons = grid.querySelectorAll('td div')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('has navigation buttons (prev/next month)', () => {
    render(<Calendar />)
    const buttons = screen.getAllByRole('button')
    // Should have at least prev and next buttons
    expect(buttons.length).toBeGreaterThanOrEqual(2)
  })

  it('merges className', () => {
    const { container } = render(<Calendar className="custom-calendar" />)
    // The outermost calendar div should contain the custom class
    const calendarEl = container.firstElementChild!
    expect(calendarEl.className).toContain('custom-calendar')
  })
})
