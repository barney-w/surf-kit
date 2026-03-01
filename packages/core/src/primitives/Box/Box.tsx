import type React from 'react'
import { twMerge } from 'tailwind-merge'

type BoxProps<C extends React.ElementType = 'div'> = {
  as?: C
  className?: string
  children?: React.ReactNode
} & Omit<React.ComponentPropsWithoutRef<C>, 'as' | 'className' | 'children'>

function Box<C extends React.ElementType = 'div'>({ as, className, ...props }: BoxProps<C>) {
  const Component = as || 'div'
  return <Component className={twMerge(className)} {...props} />
}

export { Box }
export type { BoxProps }
