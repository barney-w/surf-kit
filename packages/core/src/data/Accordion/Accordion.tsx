import type React from 'react'
import { useCallback, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

type AccordionItem = { key: string; title: string; content: React.ReactNode }

type AccordionProps = {
  items: AccordionItem[]
  type?: 'single' | 'multiple'
  defaultExpandedKeys?: string[]
  className?: string
}

function Accordion({
  items,
  type = 'single',
  defaultExpandedKeys = [],
  className,
}: AccordionProps) {
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set(defaultExpandedKeys))
  const headerRefs = useRef<Map<string, HTMLButtonElement>>(new Map())

  const toggleKey = useCallback(
    (key: string) => {
      setExpandedKeys((prev) => {
        const next = new Set(prev)
        if (next.has(key)) {
          next.delete(key)
        } else {
          if (type === 'single') {
            next.clear()
          }
          next.add(key)
        }
        return next
      })
    },
    [type],
  )

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let targetIndex: number | null = null

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        targetIndex = (index + 1) % items.length
        break
      case 'ArrowUp':
        e.preventDefault()
        targetIndex = (index - 1 + items.length) % items.length
        break
      case 'Home':
        e.preventDefault()
        targetIndex = 0
        break
      case 'End':
        e.preventDefault()
        targetIndex = items.length - 1
        break
      default:
        return
    }

    if (targetIndex !== null) {
      const targetItem = items[targetIndex]
      const el = headerRefs.current.get(targetItem.key)
      el?.focus()
    }
  }

  return (
    <div className={twMerge('divide-y divide-border border border-border rounded-lg', className)}>
      {items.map((item, index) => {
        const isExpanded = expandedKeys.has(item.key)
        const panelId = `accordion-panel-${item.key}`
        const headerId = `accordion-header-${item.key}`

        return (
          <div key={item.key}>
            <h3>
              <button
                id={headerId}
                ref={(el) => {
                  if (el) headerRefs.current.set(item.key, el)
                }}
                type="button"
                aria-expanded={isExpanded}
                aria-controls={panelId}
                onClick={() => toggleKey(item.key)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={twMerge(
                  'flex items-center justify-between w-full px-4 py-3 text-left text-sm font-medium text-text-primary',
                  'hover:bg-surface-raised transition-colors outline-none',
                  'focus-visible:ring-2 focus-visible:ring-accent/20',
                )}
              >
                {item.title}
                <svg
                  className={twMerge(
                    'w-4 h-4 text-text-secondary transition-transform',
                    isExpanded && 'rotate-180',
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              hidden={!isExpanded}
              className="px-4 py-3 text-sm text-text-secondary"
            >
              {item.content}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export { Accordion }
export type { AccordionProps, AccordionItem }
