import type React from 'react'
import { useRef } from 'react'
import { useBreadcrumbItem, useBreadcrumbs } from 'react-aria'
import { twMerge } from 'tailwind-merge'

type BreadcrumbItem = { label: string; href?: string }

type BreadcrumbProps = {
  items: BreadcrumbItem[]
  className?: string
}

function BreadcrumbLink({ item, isCurrent }: { item: BreadcrumbItem; isCurrent: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const { itemProps } = useBreadcrumbItem(
    { children: item.label, isCurrent, elementType: isCurrent ? 'span' : 'a' },
    ref,
  )

  if (isCurrent) {
    return (
      <span
        {...(itemProps as React.HTMLAttributes<HTMLSpanElement>)}
        ref={ref as React.Ref<HTMLSpanElement>}
        className="text-sm font-medium text-text-primary"
      >
        {item.label}
      </span>
    )
  }

  return (
    <a
      {...(itemProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      ref={ref}
      href={item.href}
      className="text-sm text-text-secondary hover:text-text-primary transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent/20 rounded"
    >
      {item.label}
    </a>
  )
}

function Breadcrumb({ items, className }: BreadcrumbProps) {
  const { navProps } = useBreadcrumbs({ 'aria-label': 'Breadcrumb' })

  return (
    <nav {...navProps} className={twMerge('', className)}>
      <ol className="flex items-center gap-2">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1
          return (
            <li key={item.label} className="flex items-center gap-2">
              {index > 0 && (
                <svg
                  className="w-4 h-4 text-text-secondary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              )}
              <BreadcrumbLink item={item} isCurrent={isCurrent} />
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export { Breadcrumb }
export type { BreadcrumbProps, BreadcrumbItem }
