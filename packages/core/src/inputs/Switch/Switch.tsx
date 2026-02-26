import { twMerge } from 'tailwind-merge'
import React, { useRef } from 'react'
import { useSwitch } from 'react-aria'
import { useToggleState } from 'react-stately'

type SwitchProps = {
  label: string
  isSelected?: boolean
  onChange?: (isSelected: boolean) => void
  isDisabled?: boolean
  className?: string
}

function Switch({
  label,
  isSelected,
  onChange,
  isDisabled,
  className,
}: SwitchProps) {
  const ref = useRef<HTMLInputElement>(null)
  const state = useToggleState({ isSelected, onChange, isDisabled })
  const { inputProps } = useSwitch(
    { 'aria-label': label, isDisabled, isSelected, onChange },
    state,
    ref,
  )

  return (
    <label
      className={twMerge(
        'inline-flex items-center gap-2 cursor-pointer',
        isDisabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
    >
      <div className="relative">
        <input {...inputProps} ref={ref} className="sr-only peer" />
        <div
          className={twMerge(
            'w-10 h-6 rounded-full transition-colors',
            'peer-focus-visible:ring-2 peer-focus-visible:ring-accent/20 peer-focus-visible:ring-offset-1',
            state.isSelected ? 'bg-accent' : 'bg-border',
          )}
        >
          <div
            className={twMerge(
              'absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform',
              state.isSelected ? 'translate-x-5' : 'translate-x-1',
            )}
          />
        </div>
      </div>
      <span className="text-sm text-text-primary">{label}</span>
    </label>
  )
}

export { Switch }
export type { SwitchProps }
