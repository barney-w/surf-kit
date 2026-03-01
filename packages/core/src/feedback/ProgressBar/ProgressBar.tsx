import { cva } from 'class-variance-authority'
import { useProgressBar } from 'react-aria'
import { twMerge } from 'tailwind-merge'

const track = cva('w-full overflow-hidden rounded-full bg-neutral-200', {
  variants: {
    size: {
      sm: 'h-1.5',
      md: 'h-3',
    },
  },
  defaultVariants: { size: 'md' },
})

type ProgressBarProps = {
  value: number
  label: string
  size?: 'sm' | 'md'
  className?: string
}

function ProgressBar({ value, label, size = 'md', className }: ProgressBarProps) {
  const { progressBarProps, labelProps } = useProgressBar({
    value,
    minValue: 0,
    maxValue: 100,
    label,
  })

  const clampedValue = Math.min(100, Math.max(0, value))

  return (
    <div {...progressBarProps} className={twMerge('w-full', className)}>
      <div className="flex justify-between mb-1">
        <span {...labelProps} className="text-sm text-text-secondary">
          {label}
        </span>
        <span className="text-sm text-text-secondary">{clampedValue}%</span>
      </div>
      <div className={track({ size })}>
        <div
          className="h-full rounded-full bg-accent transition-all duration-300"
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  )
}

export { ProgressBar }
export type { ProgressBarProps }
