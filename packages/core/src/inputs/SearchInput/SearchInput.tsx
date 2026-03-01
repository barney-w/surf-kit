import { useRef } from 'react'
import { useButton, useSearchField } from 'react-aria'
import { useSearchFieldState } from 'react-stately'
import { twMerge } from 'tailwind-merge'

type SearchInputProps = {
  label: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onClear?: () => void
  onSubmit?: (value: string) => void
  isDisabled?: boolean
  className?: string
}

function SearchInput({
  label,
  placeholder,
  value,
  onChange,
  onClear,
  onSubmit,
  isDisabled,
  className,
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const clearRef = useRef<HTMLButtonElement>(null)

  const state = useSearchFieldState({
    label,
    value,
    onChange,
    onSubmit,
    isDisabled,
  })

  const { labelProps, inputProps, clearButtonProps } = useSearchField(
    {
      label,
      placeholder,
      value,
      onChange,
      onSubmit,
      isDisabled,
      onClear,
    },
    state,
    inputRef,
  )

  const { buttonProps } = useButton(clearButtonProps, clearRef)

  return (
    <div className={twMerge('flex flex-col gap-1', className)}>
      <label {...labelProps} className="text-sm font-medium text-text-primary">
        {label}
      </label>
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <input
          {...inputProps}
          ref={inputRef}
          className={twMerge(
            'w-full border border-border rounded-lg bg-surface pl-9 pr-9 h-10 text-text-primary text-sm',
            'focus:border-interactive focus:ring-2 focus:ring-accent/20 focus:outline-none',
            'disabled:opacity-50 disabled:cursor-not-allowed',
          )}
        />
        {state.value !== '' && (
          <button
            {...buttonProps}
            ref={clearRef}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-surface-raised text-text-secondary"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

export { SearchInput }
export type { SearchInputProps }
