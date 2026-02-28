import { twMerge } from 'tailwind-merge'
import React, { useState, useRef, useEffect, useCallback } from 'react'

type NavigationMenuProps = {
  children: React.ReactNode
  className?: string
}

type NavigationMenuItemProps = {
  label: string
  href?: string
  children?: React.ReactNode
  className?: string
}

function NavigationMenuItem({ label, href, children, className }: NavigationMenuItemProps) {
  const [open, setOpen] = useState(false)
  const itemRef = useRef<HTMLLIElement>(null)
  const hasDropdown = Boolean(children)

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!hasDropdown) return
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
      if (e.key === 'Escape' && open) {
        e.preventDefault()
        setOpen(false)
      }
    },
    [hasDropdown, open],
  )

  useEffect(() => {
    if (!open) return
    function handleClickOutside(e: MouseEvent) {
      if (itemRef.current && !itemRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  if (!hasDropdown) {
    return (
      <li role="none" className={twMerge('relative', className)}>
        <a
          href={href}
          role="menuitem"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-text-primary rounded-md hover:bg-surface-raised transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent/20"
        >
          {label}
        </a>
      </li>
    )
  }

  return (
    <li role="none" ref={itemRef} className={twMerge('relative', className)}>
      <button
        type="button"
        role="menuitem"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-text-primary rounded-md hover:bg-surface-raised transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent/20"
      >
        {label}
        <svg
          className={twMerge('w-3 h-3 transition-transform', open && 'rotate-180')}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 min-w-[200px] rounded-lg border border-border bg-surface p-2 shadow-lg">
          {children}
        </div>
      )}
    </li>
  )
}

function NavigationMenu({ children, className }: NavigationMenuProps) {
  return (
    <nav className={twMerge('relative', className)}>
      <ul role="menubar" className="flex items-center gap-1">
        {children}
      </ul>
    </nav>
  )
}

NavigationMenu.Item = NavigationMenuItem

export { NavigationMenu }
export type { NavigationMenuProps, NavigationMenuItemProps }
