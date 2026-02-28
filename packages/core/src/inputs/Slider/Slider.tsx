import { twMerge } from 'tailwind-merge'
import React, { useRef } from 'react'
import { useSlider, useSliderThumb, VisuallyHidden } from 'react-aria'
import { useSliderState } from 'react-stately'

type SliderProps = {
  label: string
  minValue?: number
  maxValue?: number
  step?: number
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
  isDisabled?: boolean
  className?: string
  formatOptions?: Intl.NumberFormatOptions
}

function Thumb({
  state,
  trackRef,
  isDisabled,
}: {
  state: ReturnType<typeof useSliderState>
  trackRef: React.RefObject<HTMLDivElement | null>
  isDisabled?: boolean
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { thumbProps, inputProps, isDragging } = useSliderThumb(
    { index: 0, trackRef, inputRef, isDisabled },
    state,
  )

  return (
    <div
      {...thumbProps}
      className={twMerge(
        'absolute top-1/2 w-5 h-5 rounded-full bg-accent shadow -translate-y-1/2 -translate-x-1/2',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20 focus-visible:ring-offset-1',
        isDragging && 'scale-110',
      )}
      style={{
        left: `${state.getThumbPercent(0) * 100}%`,
      }}
    >
      <VisuallyHidden>
        <input ref={inputRef} {...inputProps} />
      </VisuallyHidden>
    </div>
  )
}

function Slider({
  label,
  minValue = 0,
  maxValue = 100,
  step = 1,
  value,
  defaultValue,
  onChange,
  isDisabled,
  className,
  formatOptions,
}: SliderProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  const state = useSliderState({
    numberFormatter: new Intl.NumberFormat(undefined, formatOptions),
    minValue,
    maxValue,
    step,
    value: value !== undefined ? [value] : undefined,
    defaultValue: defaultValue !== undefined ? [defaultValue] : undefined,
    onChange: onChange ? (vals: number[]) => onChange(vals[0]) : undefined,
    isDisabled,
  })

  const { groupProps, trackProps, labelProps, outputProps } = useSlider(
    { label, minValue, maxValue, step, isDisabled },
    state,
    trackRef,
  )

  return (
    <div
      {...groupProps}
      className={twMerge(
        'flex flex-col gap-1 w-full',
        isDisabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
    >
      <div className="flex justify-between text-sm">
        <label {...labelProps} className="text-text-primary">
          {label}
        </label>
        <output {...outputProps} className="text-text-secondary">
          {state.getThumbValueLabel(0)}
        </output>
      </div>
      <div
        {...trackProps}
        ref={trackRef}
        className="relative h-6 flex items-center cursor-pointer"
      >
        <div className="h-1.5 w-full rounded-full bg-border">
          <div
            className="h-full rounded-full bg-accent"
            style={{ width: `${state.getThumbPercent(0) * 100}%` }}
          />
        </div>
        <Thumb state={state} trackRef={trackRef} isDisabled={isDisabled} />
      </div>
    </div>
  )
}

export { Slider }
export type { SliderProps }
