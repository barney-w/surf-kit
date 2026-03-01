import type React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

type ContextMenuItem = {
  key: string
  label: string
  icon?: React.ReactNode
  isDisabled?: boolean
  isDanger?: boolean
}

type ContextMenuProps = {
  children: React.ReactNode
  items: ContextMenuItem[]
  onAction?: (key: string) => void
  className?: string
}

function findNextEnabledIndex(
  items: ContextMenuItem[],
  current: number,
  direction: 1 | -1,
): number {
  const len = items.length
  let index = current + direction
  for (let i = 0; i < len; i++) {
    if (index < 0) index = len - 1
    if (index >= len) index = 0
    if (!items[index].isDisabled) return index
    index += direction
  }
  return current
}

function ContextMenu({ children, items, onAction, className }: ContextMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const menuRef = useRef<HTMLUListElement>(null)

  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      setPosition({ x: e.clientX, y: e.clientY })
      setIsOpen(true)
      setFocusedIndex(findNextEnabledIndex(items, -1, 1))
    },
    [items],
  )

  useEffect(() => {
    if (!isOpen) return

    const handleClick = () => setIsOpen(false)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        return
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setFocusedIndex((i) => findNextEnabledIndex(items, i, 1))
        return
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setFocusedIndex((i) => findNextEnabledIndex(items, i, -1))
        return
      }
      if (e.key === 'Enter') {
        e.preventDefault()
        const item = items[focusedIndex]
        if (item && !item.isDisabled) {
          onAction?.(item.key)
          setIsOpen(false)
        }
      }
    }

    document.addEventListener('click', handleClick)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, focusedIndex, items, onAction])

  useEffect(() => {
    if (isOpen && menuRef.current) {
      menuRef.current.focus()
    }
  }, [isOpen])

  return (
    <div onContextMenu={handleContextMenu}>
      {children}
      {isOpen && (
        <ul
          ref={menuRef}
          role="menu"
          tabIndex={-1}
          className={twMerge(
            'fixed z-50 min-w-[160px] rounded-lg border border-border bg-surface p-1 shadow-lg outline-none',
            className,
          )}
          style={{ top: position.y, left: position.x }}
        >
          {items.map((item, index) => (
            <li
              key={item.key}
              role="menuitem"
              tabIndex={-1}
              aria-disabled={item.isDisabled || undefined}
              className={twMerge(
                'flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm outline-none transition-colors',
                item.isDisabled
                  ? 'cursor-not-allowed text-text-tertiary'
                  : item.isDanger
                    ? 'text-status-error hover:bg-status-error/10 focus:bg-status-error/10'
                    : 'text-text-primary hover:bg-surface-raised focus:bg-surface-raised',
                index === focusedIndex && !item.isDisabled && 'bg-surface-raised',
              )}
              onClick={() => {
                if (item.isDisabled) return
                onAction?.(item.key)
                setIsOpen(false)
              }}
            >
              {item.icon && <span className="h-4 w-4">{item.icon}</span>}
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export { ContextMenu }
export type { ContextMenuProps, ContextMenuItem }
