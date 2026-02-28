import { twMerge } from 'tailwind-merge'
import React, { useState, useRef, useEffect, useCallback, createContext, useContext } from 'react'

type MenubarProps = {
  children: React.ReactNode
  className?: string
}

type MenubarMenuProps = {
  label: string
  children: React.ReactNode
}

type MenubarItemProps = {
  label: string
  shortcut?: string
  onSelect?: () => void
  isDisabled?: boolean
}

type MenubarSeparatorProps = {
  className?: string
}

type MenubarContextValue = {
  openMenu: string | null
  setOpenMenu: (menu: string | null) => void
  menuRefs: React.MutableRefObject<Map<string, HTMLButtonElement>>
  menuLabels: React.MutableRefObject<string[]>
}

const MenubarContext = createContext<MenubarContextValue | null>(null)

function useMenubar() {
  const ctx = useContext(MenubarContext)
  if (!ctx) throw new Error('Menubar compound components must be used inside <Menubar>')
  return ctx
}

function MenubarItem({ label, shortcut, onSelect, isDisabled = false }: MenubarItemProps) {
  return (
    <div
      role="menuitem"
      tabIndex={isDisabled ? undefined : -1}
      aria-disabled={isDisabled || undefined}
      onClick={() => {
        if (!isDisabled) onSelect?.()
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !isDisabled) {
          e.preventDefault()
          onSelect?.()
        }
      }}
      className={twMerge(
        'flex items-center justify-between gap-8 px-3 py-1.5 text-sm rounded-md outline-none cursor-pointer transition-colors',
        isDisabled
          ? 'text-text-tertiary cursor-not-allowed'
          : 'text-text-primary hover:bg-surface-raised focus:bg-surface-raised',
      )}
    >
      <span>{label}</span>
      {shortcut && (
        <span className="text-xs text-text-tertiary ml-auto">{shortcut}</span>
      )}
    </div>
  )
}

function MenubarSeparator({ className }: MenubarSeparatorProps) {
  return (
    <hr
      role="separator"
      className={twMerge('my-1 border-t border-border', className)}
    />
  )
}

function MenubarMenu({ label, children }: MenubarMenuProps) {
  const { openMenu, setOpenMenu, menuRefs, menuLabels } = useMenubar()
  const isOpen = openMenu === label
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuContentRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (triggerRef.current) {
      menuRefs.current.set(label, triggerRef.current)
    }
    if (!menuLabels.current.includes(label)) {
      menuLabels.current.push(label)
    }
    return () => {
      menuRefs.current.delete(label)
    }
  }, [label, menuRefs, menuLabels])

  useEffect(() => {
    if (!isOpen) return
    // Focus first menu item when opening
    const timer = setTimeout(() => {
      const items = menuContentRef.current?.querySelectorAll('[role="menuitem"]:not([aria-disabled])')
      if (items && items.length > 0) {
        ;(items[0] as HTMLElement).focus()
      }
    }, 0)
    return () => clearTimeout(timer)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    function handleClickOutside(e: MouseEvent) {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node) &&
        menuContentRef.current &&
        !menuContentRef.current.contains(e.target as Node)
      ) {
        setOpenMenu(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, setOpenMenu])

  const handleTriggerKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const labels = menuLabels.current
      const idx = labels.indexOf(label)

      if (e.key === 'ArrowRight') {
        e.preventDefault()
        const nextLabel = labels[(idx + 1) % labels.length]
        const nextTrigger = menuRefs.current.get(nextLabel)
        if (nextTrigger) {
          nextTrigger.focus()
          if (isOpen) setOpenMenu(nextLabel)
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        const prevLabel = labels[(idx - 1 + labels.length) % labels.length]
        const prevTrigger = menuRefs.current.get(prevLabel)
        if (prevTrigger) {
          prevTrigger.focus()
          if (isOpen) setOpenMenu(prevLabel)
        }
      } else if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        setOpenMenu(label)
      } else if (e.key === 'Escape') {
        e.preventDefault()
        setOpenMenu(null)
      }
    },
    [label, menuLabels, menuRefs, isOpen, setOpenMenu],
  )

  const handleMenuKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const items = menuContentRef.current?.querySelectorAll(
        '[role="menuitem"]:not([aria-disabled])',
      )
      if (!items) return

      const currentIdx = Array.from(items).findIndex((el) => el === document.activeElement)

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        const next = (currentIdx + 1) % items.length
        ;(items[next] as HTMLElement).focus()
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        const prev = (currentIdx - 1 + items.length) % items.length
        ;(items[prev] as HTMLElement).focus()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        const labels = menuLabels.current
        const idx = labels.indexOf(label)
        const nextLabel = labels[(idx + 1) % labels.length]
        setOpenMenu(nextLabel)
        const nextTrigger = menuRefs.current.get(nextLabel)
        if (nextTrigger) nextTrigger.focus()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        const labels = menuLabels.current
        const idx = labels.indexOf(label)
        const prevLabel = labels[(idx - 1 + labels.length) % labels.length]
        setOpenMenu(prevLabel)
        const prevTrigger = menuRefs.current.get(prevLabel)
        if (prevTrigger) prevTrigger.focus()
      } else if (e.key === 'Escape') {
        e.preventDefault()
        setOpenMenu(null)
        triggerRef.current?.focus()
      }
    },
    [label, menuLabels, menuRefs, setOpenMenu],
  )

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        role="menuitem"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setOpenMenu(isOpen ? null : label)}
        onKeyDown={handleTriggerKeyDown}
        className={twMerge(
          'px-3 py-1.5 text-sm font-medium rounded-md outline-none transition-colors',
          'hover:bg-surface-raised focus-visible:ring-2 focus-visible:ring-accent/20',
          isOpen ? 'bg-surface-raised text-text-primary' : 'text-text-primary',
        )}
      >
        {label}
      </button>
      {isOpen && (
        <div
          ref={menuContentRef}
          role="menu"
          aria-label={label}
          onKeyDown={handleMenuKeyDown}
          className="absolute left-0 top-full z-50 mt-1 min-w-[180px] rounded-lg border border-border bg-surface p-1 shadow-lg"
        >
          {children}
        </div>
      )}
    </div>
  )
}

function Menubar({ children, className }: MenubarProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const menuRefs = useRef<Map<string, HTMLButtonElement>>(new Map())
  const menuLabels = useRef<string[]>([])

  // Reset labels on each render so they stay in order
  menuLabels.current = []

  return (
    <MenubarContext.Provider value={{ openMenu, setOpenMenu, menuRefs, menuLabels }}>
      <div
        role="menubar"
        className={twMerge('inline-flex items-center gap-1 rounded-lg border border-border bg-surface px-1 py-1', className)}
      >
        {children}
      </div>
    </MenubarContext.Provider>
  )
}

Menubar.Menu = MenubarMenu
Menubar.Item = MenubarItem
Menubar.Separator = MenubarSeparator

export { Menubar }
export type { MenubarProps, MenubarMenuProps, MenubarItemProps, MenubarSeparatorProps }
