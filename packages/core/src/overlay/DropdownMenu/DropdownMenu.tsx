'use client'

import { twMerge } from 'tailwind-merge'
import React, { useEffect, useRef } from 'react'
import { useMenuTrigger, useMenu, useMenuItem, useButton } from 'react-aria'
import { useMenuTriggerState, useTreeState, Item } from 'react-stately'

type DropdownMenuItem = {
  key: string
  label: string
  isDisabled?: boolean
}

type DropdownMenuProps = {
  trigger: React.ReactElement
  items: DropdownMenuItem[]
  onAction?: (key: string) => void
  className?: string
  align?: 'start' | 'end'
  'aria-label'?: string
}

function MenuItemRow({ item, state, onAction }: any) {
  const ref = useRef<HTMLLIElement>(null)
  const { menuItemProps } = useMenuItem(
    {
      key: item.key,
      onAction: onAction ? () => onAction(item.key) : undefined,
    },
    state,
    ref,
  )

  const isDisabled = state.disabledKeys.has(item.key)

  return (
    <li
      {...menuItemProps}
      ref={ref}
      className={twMerge(
        'px-3 py-2 text-sm outline-none cursor-pointer rounded-md transition-colors',
        isDisabled
          ? 'text-text-secondary cursor-default'
          : 'text-text-primary hover:bg-surface-raised focus:bg-surface-raised',
      )}
    >
      {item.rendered}
    </li>
  )
}

function MenuPopup({
  state,
  menuRef,
  onAction,
  className,
  menuLabel,
  align,
}: any) {
  const { menuProps } = useMenu(
    { 'aria-label': menuLabel || 'Menu' },
    state,
    menuRef,
  )

  return (
    <ul
      {...menuProps}
      ref={menuRef}
      className={twMerge(
        'absolute z-50 mt-1 min-w-[160px] rounded-lg border border-border bg-surface p-1 shadow-lg outline-none',
        align === 'end' ? 'right-0' : 'left-0',
        className,
      )}
    >
      {[...state.collection].map((item) => (
        <MenuItemRow
          key={item.key}
          item={item}
          state={state}
          onAction={onAction}
        />
      ))}
    </ul>
  )
}

function DropdownMenu({
  trigger,
  items,
  onAction,
  className,
  align = 'start',
  'aria-label': ariaLabel,
}: DropdownMenuProps) {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLUListElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const disabledKeys = items
    .filter((i) => i.isDisabled)
    .map((i) => i.key)

  const state = useMenuTriggerState({})
  const { menuTriggerProps, menuProps } = useMenuTrigger(
    { type: 'menu' },
    state,
    triggerRef,
  )
  const { buttonProps } = useButton(menuTriggerProps, triggerRef)

  const treeState = useTreeState({
    children: items.map((item) => (
      <Item key={item.key}>{item.label}</Item>
    )),
    selectionMode: 'none',
    disabledKeys,
  })

  // Close on click outside
  useEffect(() => {
    if (!state.isOpen) return
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        state.close()
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [state.isOpen])

  // Close on Escape
  useEffect(() => {
    if (!state.isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') state.close()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [state.isOpen])

  return (
    <div className="relative inline-block" ref={containerRef}>
      {React.cloneElement(trigger as React.ReactElement<any>, { ...buttonProps, ref: triggerRef })}
      {state.isOpen && (
        <MenuPopup
          state={treeState}
          menuRef={menuRef}
          onAction={(key: string) => {
            onAction?.(key)
            state.close()
          }}
          className={className}
          menuLabel={ariaLabel}
          align={align}
        />
      )}
    </div>
  )
}

export { DropdownMenu }
export type { DropdownMenuProps, DropdownMenuItem }
