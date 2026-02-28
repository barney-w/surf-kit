import { cva, type VariantProps } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import React from 'react'

const scrollArea = cva(
  'overflow-auto [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-track]:bg-transparent',
  {
    variants: {
      orientation: {
        vertical: 'overflow-x-hidden overflow-y-auto',
        horizontal: 'overflow-y-hidden overflow-x-auto',
        both: 'overflow-auto',
      },
    },
    defaultVariants: { orientation: 'vertical' },
  },
)

type ScrollAreaProps = {
  children: React.ReactNode
  className?: string
  maxHeight?: string | number
} & VariantProps<typeof scrollArea>

function ScrollArea({ orientation, children, className, maxHeight }: ScrollAreaProps) {
  return (
    <div
      className={twMerge(scrollArea({ orientation }), className)}
      style={maxHeight ? { maxHeight } : undefined}
    >
      {children}
    </div>
  )
}

export { ScrollArea, scrollArea }
export type { ScrollAreaProps }
