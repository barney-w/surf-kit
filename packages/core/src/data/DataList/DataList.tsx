import { cva } from 'class-variance-authority'
import React from 'react'
import { twMerge } from 'tailwind-merge'

const dataList = cva('', {
  variants: {
    orientation: {
      vertical: 'grid grid-cols-1 gap-2',
      horizontal: 'grid grid-cols-[auto_1fr] gap-x-6 gap-y-2',
    },
  },
  defaultVariants: { orientation: 'horizontal' },
})

type DataListItem = { label: string; value: React.ReactNode }

type DataListProps = {
  items: DataListItem[]
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

function DataList({ items, orientation = 'horizontal', className }: DataListProps) {
  return (
    <dl className={twMerge(dataList({ orientation }), className)}>
      {items.map((item) => (
        <React.Fragment key={item.label}>
          <dt className="text-sm font-medium text-text-primary">{item.label}</dt>
          <dd className="text-sm text-text-secondary">{item.value}</dd>
        </React.Fragment>
      ))}
    </dl>
  )
}

export { DataList, dataList }
export type { DataListProps, DataListItem }
