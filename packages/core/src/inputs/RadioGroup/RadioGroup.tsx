import { createContext, useContext, useRef } from 'react'
import { useRadio, useRadioGroup } from 'react-aria'
import type { RadioGroupState } from 'react-stately'
import { useRadioGroupState } from 'react-stately'
import { twMerge } from 'tailwind-merge'

type RadioItem = { value: string; label: string }

type RadioGroupProps = {
  label: string
  items: RadioItem[]
  value?: string
  onChange?: (value: string) => void
  orientation?: 'vertical' | 'horizontal'
  className?: string
}

const RadioContext = createContext<RadioGroupState | null>(null)

function Radio({ value, label }: { value: string; label: string }) {
  const state = useContext(RadioContext)!
  const ref = useRef<HTMLInputElement>(null)
  const { inputProps } = useRadio({ value, 'aria-label': label }, state, ref)
  const isSelected = state.selectedValue === value

  return (
    <label className="inline-flex items-center gap-2 cursor-pointer">
      <div className="relative">
        <input {...inputProps} ref={ref} className="sr-only peer" />
        <div
          className={twMerge(
            'w-5 h-5 border-2 border-border rounded-full transition-colors flex items-center justify-center',
            'peer-focus-visible:ring-2 peer-focus-visible:ring-accent/20 peer-focus-visible:ring-offset-1',
            isSelected && 'border-accent',
          )}
        >
          {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
        </div>
      </div>
      <span className="text-sm text-text-primary">{label}</span>
    </label>
  )
}

function RadioGroup({
  label,
  items,
  value,
  onChange,
  orientation = 'vertical',
  className,
}: RadioGroupProps) {
  const state = useRadioGroupState({ label, value, onChange })
  const { radioGroupProps, labelProps } = useRadioGroup(
    { label, value, onChange, orientation },
    state,
  )

  return (
    <div {...radioGroupProps} className={twMerge('flex flex-col gap-2', className)}>
      <span {...labelProps} className="text-sm font-medium text-text-primary">
        {label}
      </span>
      <RadioContext.Provider value={state}>
        <div
          className={twMerge('flex gap-3', orientation === 'vertical' ? 'flex-col' : 'flex-row')}
        >
          {items.map((item) => (
            <Radio key={item.value} value={item.value} label={item.label} />
          ))}
        </div>
      </RadioContext.Provider>
    </div>
  )
}

export { RadioGroup }
export type { RadioGroupProps, RadioItem }
