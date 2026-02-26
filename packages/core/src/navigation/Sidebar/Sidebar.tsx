import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import React from 'react'

const sidebar = cva(
  'flex flex-col bg-surface border-r border-border h-full transition-all duration-200',
  {
    variants: {
      collapsed: {
        true: 'w-16',
        false: '',
      },
    },
    defaultVariants: { collapsed: false },
  },
)

type SidebarProps = {
  width?: string | number
  collapsed?: boolean
  onToggle?: () => void
  children: React.ReactNode
  className?: string
  'aria-label'?: string
}

function Sidebar({
  width = 256,
  collapsed = false,
  onToggle,
  children,
  className,
  'aria-label': ariaLabel = 'Sidebar navigation',
}: SidebarProps) {
  const widthStyle = collapsed ? undefined : { width: typeof width === 'number' ? `${width}px` : width }

  return (
    <nav
      aria-label={ariaLabel}
      className={twMerge(sidebar({ collapsed }), className)}
      style={widthStyle}
    >
      {onToggle && (
        <button
          type="button"
          onClick={onToggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="self-end p-2 m-2 rounded hover:bg-surface-raised transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent/20"
        >
          <svg
            className={twMerge('w-4 h-4 text-text-secondary transition-transform', collapsed && 'rotate-180')}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </nav>
  )
}

export { Sidebar, sidebar }
export type { SidebarProps }
