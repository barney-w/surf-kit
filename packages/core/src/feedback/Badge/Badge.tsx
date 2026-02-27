import { cva, type VariantProps } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import React from 'react'

const badge = cva('inline-flex items-center rounded-full font-medium', {
  variants: {
    intent: {
      default: 'bg-neutral-200 text-text-secondary',
      success: 'bg-status-success-subtle text-status-success',
      warning: 'bg-status-warning-subtle text-status-warning',
      error: 'bg-status-error-subtle text-status-error',
      info: 'bg-sky-100 text-sky-700',
      // Brand-specific badge types — use brand-* color palette
      'founding-member': 'border border-[rgba(225,185,137,0.40)] bg-[rgba(225,185,137,0.20)] text-[#E1B989]',
      'hub-attendee': 'border border-[rgba(241,240,227,0.10)] bg-transparent text-[rgba(241,240,227,0.80)]',
      'first-agent': 'border border-[rgba(0,145,165,0.40)] bg-[rgba(0,145,165,0.15)] text-[#0091A5]',
      'collaborator': 'border border-[rgba(56,189,208,0.40)] bg-[rgba(56,189,208,0.20)] text-[#38BDD0]',
    },
    size: {
      sm: 'text-xs px-2 py-0.5',
      md: 'text-sm px-2.5 py-0.5',
    },
  },
  defaultVariants: { intent: 'default', size: 'md' },
})

type BadgeProps = {
  className?: string
  children?: React.ReactNode
} & VariantProps<typeof badge> &
  Omit<React.ComponentPropsWithoutRef<'span'>, 'className' | 'children'>

function Badge({ intent, size, className, children, ...rest }: BadgeProps) {
  return (
    <span className={twMerge(badge({ intent, size }), className)} {...rest}>
      {children}
    </span>
  )
}

export { Badge, badge }
export type { BadgeProps }
