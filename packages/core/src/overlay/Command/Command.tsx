import { twMerge } from 'tailwind-merge'
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  createContext,
  useContext,
  useId,
  useMemo,
} from 'react'
import { useDialog, FocusScope } from 'react-aria'

type CommandProps = {
  isOpen: boolean
  onClose: () => void
  onSelect: (value: string) => void
  placeholder?: string
  children: React.ReactNode
  className?: string
}

type CommandGroupProps = {
  heading: string
  children: React.ReactNode
}

type CommandItemProps = {
  value: string
  onSelect?: () => void
  children: React.ReactNode
  icon?: React.ReactNode
  shortcut?: string
  isDisabled?: boolean
  className?: string
}

type CommandContextValue = {
  query: string
  focusedIndex: number
  getItemIndex: (value: string) => number
  selectItem: (value: string, onItemSelect?: () => void) => void
}

const CommandContext = createContext<CommandContextValue>({
  query: '',
  focusedIndex: -1,
  getItemIndex: () => -1,
  selectItem: () => {},
})

/**
 * Recursively extract all CommandItem value props from the children tree,
 * filtering by query match. This gives us a stable ordered list of visible items
 * that matches render order, without needing effect-based registration.
 */
function collectItemValues(
  children: React.ReactNode,
  query: string,
): string[] {
  const values: string[] = []
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return
    // CommandItem has a value prop
    if (child.props && typeof (child.props as CommandItemProps).value === 'string') {
      const itemValue = (child.props as CommandItemProps).value
      if (itemValue.toLowerCase().includes(query.toLowerCase())) {
        values.push(itemValue)
      }
    }
    // Recurse into children (for CommandGroup wrappers)
    if (child.props && (child.props as { children?: React.ReactNode }).children) {
      values.push(
        ...collectItemValues(
          (child.props as { children: React.ReactNode }).children,
          query,
        ),
      )
    }
  })
  return values
}

function CommandGroup({ heading, children }: CommandGroupProps) {
  const id = useId()
  return (
    <div role="group" aria-labelledby={id}>
      <div
        id={id}
        className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-text-tertiary"
      >
        {heading}
      </div>
      {children}
    </div>
  )
}

function CommandItem({
  value,
  onSelect: onItemSelect,
  children,
  icon,
  shortcut,
  isDisabled,
  className,
}: CommandItemProps) {
  const ctx = useContext(CommandContext)

  const matchesQuery = value.toLowerCase().includes(ctx.query.toLowerCase())
  if (!matchesQuery) return null

  const itemIndex = ctx.getItemIndex(value)
  const isFocused = itemIndex === ctx.focusedIndex

  return (
    <div
      role="option"
      aria-selected={isFocused}
      aria-disabled={isDisabled || undefined}
      className={twMerge(
        'flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors',
        isFocused && !isDisabled && 'bg-surface-raised',
        isDisabled
          ? 'cursor-not-allowed text-text-tertiary'
          : 'text-text-primary',
        className,
      )}
      onClick={() => {
        if (isDisabled) return
        ctx.selectItem(value, onItemSelect)
      }}
    >
      {icon && <span className="h-4 w-4 flex-shrink-0">{icon}</span>}
      <span className="flex-1">{children}</span>
      {shortcut && (
        <kbd className="rounded bg-surface-raised px-1.5 py-0.5 text-xs text-text-tertiary">
          {shortcut}
        </kbd>
      )}
    </div>
  )
}

function Command({
  isOpen,
  onClose,
  onSelect,
  placeholder = 'Type a command or search...',
  children,
  className,
}: CommandProps) {
  const [query, setQuery] = useState('')
  const [focusedIndex, setFocusedIndex] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { dialogProps } = useDialog({ role: 'dialog' }, ref)

  // Collect visible item values by traversing children
  const visibleValues = useMemo(
    () => collectItemValues(children, query),
    [children, query],
  )

  const getItemIndex = useCallback(
    (value: string) => visibleValues.indexOf(value),
    [visibleValues],
  )

  const selectItem = useCallback(
    (value: string, onItemSelect?: () => void) => {
      onItemSelect?.()
      onSelect(value)
    },
    [onSelect],
  )

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setFocusedIndex(0)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setFocusedIndex((i) => {
          const next = i + 1
          return next >= visibleValues.length ? 0 : next
        })
        return
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setFocusedIndex((i) => {
          const prev = i - 1
          return prev < 0 ? Math.max(visibleValues.length - 1, 0) : prev
        })
        return
      }
      if (e.key === 'Enter') {
        e.preventDefault()
        const value = visibleValues[focusedIndex]
        if (value != null) {
          onSelect(value)
        }
      }
    },
    [visibleValues, focusedIndex, onClose, onSelect],
  )

  const contextValue = useMemo(
    () => ({
      query,
      focusedIndex,
      getItemIndex,
      selectItem,
    }),
    [query, focusedIndex, getItemIndex, selectItem],
  )

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-[20vh]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <FocusScope contain restoreFocus autoFocus>
        <div
          {...dialogProps}
          ref={ref}
          className={twMerge(
            'w-full max-w-lg rounded-xl border border-border bg-surface shadow-xl outline-none',
            className,
          )}
        >
          <input
            ref={inputRef}
            role="combobox"
            aria-expanded={true}
            aria-haspopup="listbox"
            placeholder={placeholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setFocusedIndex(0)
            }}
            className="w-full border-b border-border bg-transparent px-4 py-3 text-sm text-text-primary outline-none placeholder:text-text-tertiary"
            onKeyDown={handleKeyDown}
          />
          <div role="listbox" className="max-h-72 overflow-y-auto p-2">
            <CommandContext.Provider value={contextValue}>
              {children}
            </CommandContext.Provider>
          </div>
        </div>
      </FocusScope>
    </div>
  )
}

Command.Group = CommandGroup
Command.Item = CommandItem

export { Command }
export type { CommandProps, CommandGroupProps, CommandItemProps }
