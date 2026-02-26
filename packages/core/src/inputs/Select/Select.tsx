import { twMerge } from 'tailwind-merge'
import React, { useRef } from 'react'
import { useSelect, useListBox, useOption, useButton, HiddenSelect } from 'react-aria'
import { useSelectState, Item } from 'react-stately'
import type { Node } from 'react-stately'

type SelectItem = { key: string; label: string }

type SelectProps = {
  label: string
  items: SelectItem[]
  selectedKey?: string
  onSelectionChange?: (key: string) => void
  placeholder?: string
  isDisabled?: boolean
  errorMessage?: string
  className?: string
}

function Option({ item, state }: { item: Node<object>; state: ReturnType<typeof useSelectState> }) {
  const ref = useRef<HTMLLIElement>(null)
  const { optionProps, isSelected, isFocused } = useOption({ key: item.key }, state, ref)

  return (
    <li
      {...optionProps}
      ref={ref}
      className={twMerge(
        'px-3 py-2 text-sm cursor-pointer outline-none',
        isFocused && 'bg-surface-raised',
        isSelected && 'text-accent font-medium',
      )}
    >
      {item.rendered}
    </li>
  )
}

function ListBox(props: { state: ReturnType<typeof useSelectState> }) {
  const { state } = props
  const ref = useRef<HTMLUListElement>(null)
  const { listBoxProps } = useListBox({ 'aria-label': 'Options' }, state, ref)

  return (
    <ul
      {...listBoxProps}
      ref={ref}
      className="border border-border rounded-lg bg-surface py-1 shadow-lg max-h-60 overflow-auto"
    >
      {[...state.collection].map((item) => (
        <Option key={item.key} item={item} state={state} />
      ))}
    </ul>
  )
}

function Select({
  label,
  items,
  selectedKey,
  onSelectionChange,
  placeholder = 'Select an option',
  isDisabled,
  errorMessage,
  className,
}: SelectProps) {
  const triggerRef = useRef<HTMLButtonElement>(null)

  const state = useSelectState({
    label,
    items,
    selectedKey,
    onSelectionChange: onSelectionChange
      ? (key) => onSelectionChange(String(key))
      : undefined,
    isDisabled,
    children: (item: SelectItem) => <Item key={item.key}>{item.label}</Item>,
  })

  const { labelProps, triggerProps, valueProps, menuProps } = useSelect(
    { label, isDisabled },
    state,
    triggerRef,
  )

  const { buttonProps } = useButton(triggerProps, triggerRef)

  return (
    <div className={twMerge('flex flex-col gap-1 relative', className)}>
      <label {...labelProps} className="text-sm font-medium text-text-primary">
        {label}
      </label>
      <HiddenSelect state={state} triggerRef={triggerRef} label={label} />
      <button
        {...buttonProps}
        ref={triggerRef}
        className={twMerge(
          'flex items-center justify-between border border-border rounded-lg bg-surface px-3 h-10 text-left',
          'focus:border-interactive focus:ring-2 focus:ring-accent/20 focus:outline-none',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          errorMessage && 'border-status-error',
        )}
      >
        <span
          {...valueProps}
          className={twMerge(
            'text-sm truncate',
            state.selectedItem ? 'text-text-primary' : 'text-text-secondary',
          )}
        >
          {state.selectedItem ? state.selectedItem.rendered : placeholder}
        </span>
        <svg
          className="w-4 h-4 text-text-secondary ml-2 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {state.isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 z-10">
          <ListBox state={state} />
        </div>
      )}
      {errorMessage && (
        <div className="text-xs text-status-error">{errorMessage}</div>
      )}
    </div>
  )
}

export { Select }
export type { SelectProps, SelectItem }
