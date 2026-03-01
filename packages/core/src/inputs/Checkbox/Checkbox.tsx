import { useRef } from 'react'
import { useCheckbox } from 'react-aria'
import { useToggleState } from 'react-stately'
import { twMerge } from 'tailwind-merge'

type CheckboxProps = {
  label: string
  isSelected?: boolean
  onChange?: (isSelected: boolean) => void
  isDisabled?: boolean
  isIndeterminate?: boolean
  className?: string
}

function Checkbox({
  label,
  isSelected,
  onChange,
  isDisabled,
  isIndeterminate,
  className,
}: CheckboxProps) {
  const ref = useRef<HTMLInputElement>(null)
  const state = useToggleState({ isSelected, onChange, isDisabled })
  const { inputProps } = useCheckbox(
    { 'aria-label': label, isDisabled, isIndeterminate, isSelected, onChange },
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
            'w-5 h-5 border-2 border-border rounded transition-colors flex items-center justify-center',
            'peer-focus-visible:ring-2 peer-focus-visible:ring-accent/20 peer-focus-visible:ring-offset-1',
            (state.isSelected || isIndeterminate) && 'bg-accent border-accent',
          )}
        >
          {state.isSelected && !isIndeterminate && (
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
          {isIndeterminate && (
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
            </svg>
          )}
        </div>
      </div>
      <span className="text-sm text-text-primary">{label}</span>
    </label>
  )
}

export { Checkbox }
export type { CheckboxProps }
