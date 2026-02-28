import { cva, type VariantProps } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import React, { useRef } from 'react'
import { useButton } from 'react-aria'

const pageButton = cva(
  'inline-flex items-center justify-center rounded-lg h-10 w-10 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
  {
    variants: {
      variant: {
        default: 'bg-transparent text-text-primary hover:bg-surface-raised',
        active: 'bg-accent text-white',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

type PaginationProps = {
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
  siblingCount?: number
  showFirstLast?: boolean
  className?: string
}

function PageButton({
  page,
  isActive,
  isDisabled,
  onPress,
  'aria-label': ariaLabel,
  children,
}: {
  page?: number
  isActive?: boolean
  isDisabled?: boolean
  onPress: () => void
  'aria-label': string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const { buttonProps } = useButton(
    { onPress, isDisabled, 'aria-label': ariaLabel },
    ref,
  )

  return (
    <button
      {...buttonProps}
      ref={ref}
      className={twMerge(
        pageButton({ variant: isActive ? 'active' : 'default' }),
        isDisabled && 'opacity-50 cursor-not-allowed',
      )}
      {...(isActive ? { 'aria-current': 'page' as const } : {})}
    >
      {children}
    </button>
  )
}

function buildPageRange(
  totalPages: number,
  currentPage: number,
  siblingCount: number,
): (number | 'ellipsis-start' | 'ellipsis-end')[] {
  // If total pages is small enough to show all, just return all pages
  // Total slots: first + last + current + 2*siblings + 2 ellipses = 5 + 2*siblingCount
  const totalSlots = 5 + 2 * siblingCount
  if (totalPages <= totalSlots) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const leftSibling = Math.max(currentPage - siblingCount, 1)
  const rightSibling = Math.min(currentPage + siblingCount, totalPages)

  const showLeftEllipsis = leftSibling > 2
  const showRightEllipsis = rightSibling < totalPages - 1

  const pages: (number | 'ellipsis-start' | 'ellipsis-end')[] = []

  // Always add first page
  pages.push(1)

  if (showLeftEllipsis) {
    pages.push('ellipsis-start')
  } else {
    // Fill in pages between 1 and leftSibling
    for (let i = 2; i < leftSibling; i++) {
      pages.push(i)
    }
  }

  // Add sibling range (and current page)
  for (let i = leftSibling; i <= rightSibling; i++) {
    if (i !== 1 && i !== totalPages) {
      pages.push(i)
    }
  }

  if (showRightEllipsis) {
    pages.push('ellipsis-end')
  } else {
    // Fill in pages between rightSibling and totalPages
    for (let i = rightSibling + 1; i < totalPages; i++) {
      pages.push(i)
    }
  }

  // Always add last page
  if (totalPages > 1) {
    pages.push(totalPages)
  }

  return pages
}

function Pagination({
  totalPages,
  currentPage,
  onPageChange,
  siblingCount = 1,
  showFirstLast = true,
  className,
}: PaginationProps) {
  const pages = buildPageRange(totalPages, currentPage, siblingCount)
  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages

  return (
    <nav aria-label="Pagination" className={twMerge('flex items-center gap-1', className)}>
      {showFirstLast && (
        <PageButton
          isDisabled={isFirstPage}
          onPress={() => onPageChange(1)}
          aria-label="First page"
        >
          &laquo;
        </PageButton>
      )}

      <PageButton
        isDisabled={isFirstPage}
        onPress={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
      >
        &lsaquo;
      </PageButton>

      {pages.map((page) => {
        if (page === 'ellipsis-start' || page === 'ellipsis-end') {
          return (
            <span
              key={page}
              className="inline-flex items-center justify-center h-10 w-10 text-sm text-text-secondary"
              aria-hidden="true"
            >
              &hellip;
            </span>
          )
        }

        return (
          <PageButton
            key={page}
            page={page}
            isActive={page === currentPage}
            onPress={() => onPageChange(page)}
            aria-label={`Page ${page}`}
          >
            {page}
          </PageButton>
        )
      })}

      <PageButton
        isDisabled={isLastPage}
        onPress={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
      >
        &rsaquo;
      </PageButton>

      {showFirstLast && (
        <PageButton
          isDisabled={isLastPage}
          onPress={() => onPageChange(totalPages)}
          aria-label="Last page"
        >
          &raquo;
        </PageButton>
      )}
    </nav>
  )
}

export { Pagination, pageButton }
export type { PaginationProps }
