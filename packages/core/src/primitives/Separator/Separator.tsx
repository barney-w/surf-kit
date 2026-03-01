import type React from 'react'
import { twMerge } from 'tailwind-merge'

type SeparatorProps = {
  orientation?: 'horizontal' | 'vertical'
  className?: string
} & Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'children'>

function Separator({ orientation = 'horizontal', className, ...props }: SeparatorProps) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={twMerge(
        orientation === 'horizontal' ? 'h-px w-full bg-border' : 'w-px h-full bg-border',
        className,
      )}
      {...props}
    />
  )
}

export { Separator }
export type { SeparatorProps }
