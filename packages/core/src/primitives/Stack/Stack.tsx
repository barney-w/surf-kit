import { cva, type VariantProps } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import React from 'react'

const stack = cva('flex', {
  variants: {
    direction: {
      vertical: 'flex-col',
      horizontal: 'flex-row',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
    gap: {
      0: 'gap-0',
      1: 'gap-1',
      2: 'gap-2',
      3: 'gap-3',
      4: 'gap-4',
      5: 'gap-5',
      6: 'gap-6',
      8: 'gap-8',
      10: 'gap-10',
      12: 'gap-12',
    },
  },
  defaultVariants: { direction: 'vertical', gap: 3 },
})

type StackProps = {
  className?: string
  children?: React.ReactNode
} & VariantProps<typeof stack> &
  Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'children'>

function Stack({ direction, align, justify, gap, className, ...props }: StackProps) {
  return <div className={twMerge(stack({ direction, align, justify, gap }), className)} {...props} />
}

export { Stack, stack }
export type { StackProps }
