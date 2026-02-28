import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { Pagination } from '../Pagination'

describe('Pagination', () => {
  it('renders with correct number of page buttons', () => {
    render(<Pagination totalPages={5} currentPage={1} onPageChange={() => {}} />)
    // Should render pages 1-5, no ellipsis needed
    expect(screen.getByText('1')).toBeDefined()
    expect(screen.getByText('2')).toBeDefined()
    expect(screen.getByText('3')).toBeDefined()
    expect(screen.getByText('4')).toBeDefined()
    expect(screen.getByText('5')).toBeDefined()
  })

  it('calls onPageChange when a page button is clicked', async () => {
    const onPageChange = vi.fn()
    const user = userEvent.setup()
    render(<Pagination totalPages={5} currentPage={1} onPageChange={onPageChange} />)
    await user.click(screen.getByLabelText('Page 3'))
    expect(onPageChange).toHaveBeenCalledWith(3)
  })

  it('previous button is disabled on first page', () => {
    render(<Pagination totalPages={5} currentPage={1} onPageChange={() => {}} />)
    const prevButton = screen.getByLabelText('Previous page')
    expect(prevButton).toHaveAttribute('disabled')
  })

  it('next button is disabled on last page', () => {
    render(<Pagination totalPages={5} currentPage={5} onPageChange={() => {}} />)
    const nextButton = screen.getByLabelText('Next page')
    expect(nextButton).toHaveAttribute('disabled')
  })

  it('ellipsis is displayed when pages are truncated', () => {
    render(<Pagination totalPages={20} currentPage={10} onPageChange={() => {}} />)
    // With siblingCount=1 and currentPage=10 out of 20, should show ellipsis
    const ellipses = screen.getAllByText((_, element) => element?.textContent === '\u2026')
    expect(ellipses.length).toBeGreaterThanOrEqual(1)
  })

  it('does not show ellipsis when all pages fit', () => {
    render(<Pagination totalPages={5} currentPage={3} onPageChange={() => {}} />)
    const ellipses = screen.queryAllByText((_, element) => element?.textContent === '\u2026')
    expect(ellipses).toHaveLength(0)
  })

  it('merges custom className', () => {
    render(
      <Pagination
        totalPages={5}
        currentPage={1}
        onPageChange={() => {}}
        className="my-custom-class"
      />,
    )
    const nav = screen.getByRole('navigation')
    expect(nav.className).toContain('my-custom-class')
  })

  it('renders nav with aria-label="Pagination"', () => {
    render(<Pagination totalPages={5} currentPage={1} onPageChange={() => {}} />)
    const nav = screen.getByRole('navigation', { name: 'Pagination' })
    expect(nav).toBeDefined()
  })

  it('active page has aria-current="page"', () => {
    render(<Pagination totalPages={5} currentPage={3} onPageChange={() => {}} />)
    const activeButton = screen.getByLabelText('Page 3')
    expect(activeButton).toHaveAttribute('aria-current', 'page')
  })

  it('first/last buttons are disabled at bounds', () => {
    render(<Pagination totalPages={5} currentPage={1} onPageChange={() => {}} />)
    const firstButton = screen.getByLabelText('First page')
    expect(firstButton).toHaveAttribute('disabled')

    const lastButton = screen.getByLabelText('Last page')
    expect(lastButton).not.toHaveAttribute('disabled')
  })

  it('hides first/last buttons when showFirstLast is false', () => {
    render(
      <Pagination
        totalPages={5}
        currentPage={1}
        onPageChange={() => {}}
        showFirstLast={false}
      />,
    )
    expect(screen.queryByLabelText('First page')).toBeNull()
    expect(screen.queryByLabelText('Last page')).toBeNull()
  })

  it('calls onPageChange with correct page for next/previous', async () => {
    const onPageChange = vi.fn()
    const user = userEvent.setup()
    render(<Pagination totalPages={5} currentPage={3} onPageChange={onPageChange} />)

    await user.click(screen.getByLabelText('Previous page'))
    expect(onPageChange).toHaveBeenCalledWith(2)

    await user.click(screen.getByLabelText('Next page'))
    expect(onPageChange).toHaveBeenCalledWith(4)
  })
})
