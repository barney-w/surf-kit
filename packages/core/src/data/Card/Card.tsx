import { cva, type VariantProps } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import React from 'react'

const card = cva('rounded-xl transition-colors', {
  variants: {
    variant: {
      default: 'bg-surface border border-border',
      elevated: 'bg-surface shadow-lg',
      outlined: 'bg-transparent border-2 border-border',
    },
  },
  defaultVariants: { variant: 'default' },
})

type CardProps = {
  variant?: 'default' | 'elevated' | 'outlined'
  children: React.ReactNode
  className?: string
}

function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={twMerge('px-6 py-4 border-b border-border', className)}>
      {children}
    </div>
  )
}

function CardBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={twMerge('px-6 py-4', className)}>{children}</div>
}

function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={twMerge('px-6 py-4 border-t border-border', className)}>
      {children}
    </div>
  )
}

function Card({ variant = 'default', children, className }: CardProps) {
  return (
    <div className={twMerge(card({ variant }), className)}>
      {children}
    </div>
  )
}

Card.Header = CardHeader
Card.Body = CardBody
Card.Footer = CardFooter

export { Card, card }
export type { CardProps }
