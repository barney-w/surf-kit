import type React from 'react'
import { useCallback, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { ToggleGroupCtx } from '../Toggle'

type ToggleGroupProps = {
  type: 'single' | 'multiple'
  value?: string | string[]
  defaultValue?: string | string[]
  onValueChange?: (value: string | string[]) => void
  children: React.ReactNode
  className?: string
  isDisabled?: boolean
}

function normalizeValue(val: string | string[] | undefined): string[] {
  if (val === undefined) return []
  return Array.isArray(val) ? val : [val]
}

function ToggleGroup({
  type,
  value,
  defaultValue,
  onValueChange,
  children,
  className,
  isDisabled,
}: ToggleGroupProps) {
  const isControlled = value !== undefined
  const [internal, setInternal] = useState<string[]>(() => normalizeValue(defaultValue))
  const selected = isControlled ? normalizeValue(value) : internal

  const toggle = useCallback(
    (itemValue: string) => {
      let next: string[]
      if (type === 'single') {
        next = selected.includes(itemValue) ? [] : [itemValue]
      } else {
        next = selected.includes(itemValue)
          ? selected.filter((v) => v !== itemValue)
          : [...selected, itemValue]
      }

      if (!isControlled) {
        setInternal(next)
      }

      if (onValueChange) {
        onValueChange(type === 'single' ? (next[0] ?? '') : next)
      }
    },
    [type, selected, isControlled, onValueChange],
  )

  return (
    <div role="group" className={twMerge('inline-flex gap-1', className)}>
      <ToggleGroupCtx.Provider value={{ selectedValues: selected, toggle, isDisabled }}>
        {children}
      </ToggleGroupCtx.Provider>
    </div>
  )
}

export { ToggleGroup }
export type { ToggleGroupProps }
