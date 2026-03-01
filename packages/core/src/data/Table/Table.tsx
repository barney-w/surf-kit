import React from 'react'
import { twMerge } from 'tailwind-merge'

type SortDescriptor = { column: string; direction: 'ascending' | 'descending' }

type TableColumn = { key: string; label: string; sortable?: boolean }

type TableProps = {
  columns: TableColumn[]
  rows: Record<string, React.ReactNode>[]
  sortDescriptor?: SortDescriptor
  onSortChange?: (descriptor: SortDescriptor) => void
  className?: string
}

function Table({ columns, rows, sortDescriptor, onSortChange, className }: TableProps) {
  const [focusedRow, setFocusedRow] = React.useState<number>(-1)
  const [focusedCol, setFocusedCol] = React.useState<number>(0)
  const tableRef = React.useRef<HTMLTableElement>(null)

  const handleSort = (column: TableColumn) => {
    if (!column.sortable || !onSortChange) return
    const direction =
      sortDescriptor?.column === column.key && sortDescriptor.direction === 'ascending'
        ? 'descending'
        : 'ascending'
    onSortChange({ column: column.key, direction })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    let newRow = focusedRow
    let newCol = focusedCol

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        newRow = Math.min(focusedRow + 1, rows.length - 1)
        break
      case 'ArrowUp':
        e.preventDefault()
        newRow = Math.max(focusedRow - 1, -1)
        break
      case 'ArrowRight':
        e.preventDefault()
        newCol = Math.min(focusedCol + 1, columns.length - 1)
        break
      case 'ArrowLeft':
        e.preventDefault()
        newCol = Math.max(focusedCol - 1, 0)
        break
      default:
        return
    }

    setFocusedRow(newRow)
    setFocusedCol(newCol)
  }

  return (
    <div className={twMerge('overflow-auto', className)}>
      <table
        ref={tableRef}
        role="grid"
        onKeyDown={handleKeyDown}
        className="w-full border-collapse text-sm"
      >
        <thead>
          <tr role="row">
            {columns.map((col, colIndex) => {
              const isSorted = sortDescriptor?.column === col.key
              return (
                <th
                  key={col.key}
                  role="columnheader"
                  aria-sort={isSorted ? sortDescriptor!.direction : undefined}
                  tabIndex={focusedRow === -1 && focusedCol === colIndex ? 0 : -1}
                  onClick={() => handleSort(col)}
                  onFocus={() => {
                    setFocusedRow(-1)
                    setFocusedCol(colIndex)
                  }}
                  className={twMerge(
                    'text-left px-4 py-3 font-medium text-text-primary border-b border-border bg-surface-raised',
                    col.sortable && 'cursor-pointer select-none hover:bg-surface-raised/80',
                    focusedRow === -1 &&
                      focusedCol === colIndex &&
                      'ring-2 ring-inset ring-accent/20',
                  )}
                >
                  <span className="flex items-center gap-1">
                    {col.label}
                    {col.sortable && isSorted && (
                      <svg
                        className={twMerge(
                          'w-4 h-4 transition-transform',
                          sortDescriptor!.direction === 'descending' && 'rotate-180',
                        )}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                      </svg>
                    )}
                  </span>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              role="row"
              className={twMerge(
                'border-b border-border hover:bg-surface-raised/50 transition-colors',
              )}
            >
              {columns.map((col, colIndex) => (
                <td
                  key={col.key}
                  role="gridcell"
                  tabIndex={focusedRow === rowIndex && focusedCol === colIndex ? 0 : -1}
                  onFocus={() => {
                    setFocusedRow(rowIndex)
                    setFocusedCol(colIndex)
                  }}
                  className={twMerge(
                    'px-4 py-3 text-text-secondary',
                    focusedRow === rowIndex &&
                      focusedCol === colIndex &&
                      'ring-2 ring-inset ring-accent/20',
                  )}
                >
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export { Table }
export type { TableProps, TableColumn, SortDescriptor }
