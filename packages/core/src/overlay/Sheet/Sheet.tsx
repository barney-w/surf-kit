import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import React, { useRef, useEffect } from 'react'
import { FocusScope } from 'react-aria'

const sheetPanel = cva(
  'fixed top-0 h-full bg-surface border-border shadow-xl flex flex-col transition-transform duration-300 ease-in-out outline-none z-50',
  {
    variants: {
      side: {
        left: 'left-0 border-r',
        right: 'right-0 border-l',
      },
      size: {
        sm: 'w-72',
        md: 'w-96',
        lg: 'w-[32rem]',
      },
    },
    defaultVariants: { side: 'right', size: 'md' },
  },
)

type SheetProps = {
  isOpen: boolean
  onClose: () => void
  side?: 'left' | 'right'
  size?: 'sm' | 'md' | 'lg'
  title?: string
  children: React.ReactNode
  className?: string
}

function Sheet({
  isOpen,
  onClose,
  side = 'right',
  size = 'md',
  title,
  children,
  className,
}: SheetProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const translateClass =
    side === 'left'
      ? 'translate-x-0'
      : 'translate-x-0'

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />
      <FocusScope contain restoreFocus autoFocus>
        <div
          ref={ref}
          role="dialog"
          aria-label={title}
          className={twMerge(sheetPanel({ side, size }), translateClass, className)}
        >
          {title && (
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h2 className="text-lg font-semibold text-text-primary">
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="rounded p-1 text-text-secondary hover:text-text-primary transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          )}
          <div className="flex-1 overflow-auto p-6">{children}</div>
        </div>
      </FocusScope>
    </div>
  )
}

export { Sheet, sheetPanel }
export type { SheetProps }
