import { twMerge } from 'tailwind-merge'
import React, { useRef } from 'react'
import { useTextField } from 'react-aria'

type TextInputProps = {
  label: string
  description?: string
  errorMessage?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  isDisabled?: boolean
  isRequired?: boolean
  className?: string
}

function TextInput({
  label,
  description,
  errorMessage,
  placeholder,
  value,
  onChange,
  isDisabled,
  isRequired,
  className,
}: TextInputProps) {
  const ref = useRef<HTMLInputElement>(null)
  const { labelProps, inputProps, descriptionProps, errorMessageProps } = useTextField(
    {
      label,
      description,
      errorMessage,
      placeholder,
      value,
      onChange,
      isDisabled,
      isRequired,
      inputElementType: 'input',
    },
    ref,
  )

  return (
    <div className={twMerge('flex flex-col gap-1', className)}>
      <label {...labelProps} className="text-sm font-medium text-text-primary">
        {label}
      </label>
      <input
        {...inputProps}
        ref={ref}
        className={twMerge(
          'border border-border rounded-lg bg-surface px-3 h-10 text-text-primary',
          'focus:border-interactive focus:ring-2 focus:ring-accent/20 focus:outline-none',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          errorMessage && 'border-status-error',
        )}
      />
      {description && !errorMessage && (
        <div {...descriptionProps} className="text-xs text-text-secondary">
          {description}
        </div>
      )}
      {errorMessage && (
        <div {...errorMessageProps} className="text-xs text-status-error">
          {errorMessage}
        </div>
      )}
    </div>
  )
}

export { TextInput }
export type { TextInputProps }
