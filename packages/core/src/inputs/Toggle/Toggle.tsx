import { cva, type VariantProps } from 'class-variance-authority'
import type React from 'react'
import { createContext, useContext, useRef } from 'react'
import { useToggleButton } from 'react-aria'
import { useToggleState } from 'react-stately'
import { twMerge } from 'tailwind-merge'

const toggle = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-12 px-6 text-lg',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

type ToggleGroupContext = {
  selectedValues: string[]
  toggle: (value: string) => void
  isDisabled?: boolean
}

const ToggleGroupCtx = createContext<ToggleGroupContext | null>(null)

export { ToggleGroupCtx }

type ToggleProps = {
  isSelected?: boolean
  defaultSelected?: boolean
  onChange?: (isSelected: boolean) => void
  isDisabled?: boolean
  children: React.ReactNode
  className?: string
  'aria-label'?: string
  value?: string
} & VariantProps<typeof toggle>

function Toggle({
  isSelected,
  defaultSelected,
  onChange,
  isDisabled,
  children,
  className,
  'aria-label': ariaLabel,
  value,
  size,
}: ToggleProps) {
  const group = useContext(ToggleGroupCtx)
  const ref = useRef<HTMLButtonElement>(null)

  const inGroup = group !== null && value !== undefined
  const groupSelected = inGroup ? group.selectedValues.includes(value) : undefined
  const disabled = isDisabled ?? (inGroup ? group.isDisabled : false)

  const state = useToggleState({
    isSelected: inGroup ? groupSelected : isSelected,
    defaultSelected: inGroup ? undefined : defaultSelected,
    onChange: inGroup ? () => group.toggle(value) : onChange,
  })

  const { buttonProps } = useToggleButton(
    { isDisabled: disabled, 'aria-label': ariaLabel },
    state,
    ref,
  )

  return (
    <button
      {...buttonProps}
      ref={ref}
      className={twMerge(
        toggle({ size }),
        state.isSelected ? 'bg-surface-raised' : 'bg-transparent',
        className,
      )}
    >
      {children}
    </button>
  )
}

export { Toggle, toggle }
export type { ToggleProps }
