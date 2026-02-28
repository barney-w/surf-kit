import { twMerge } from 'tailwind-merge'
import React, { useRef } from 'react'
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
          ? 'text-text-tertiary cursor-not-allowed'
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
  'aria-label': ariaLabel,
}: DropdownMenuProps) {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLUListElement>(null)

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

  return (
    <div className="relative inline-block">
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
        />
      )}
    </div>
  )
}

export { DropdownMenu }
export type { DropdownMenuProps, DropdownMenuItem }
