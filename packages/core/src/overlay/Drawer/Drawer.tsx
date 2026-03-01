import { cva } from 'class-variance-authority'
import type React from 'react'
import { useEffect, useRef } from 'react'
import { FocusScope, useDialog } from 'react-aria'
import { twMerge } from 'tailwind-merge'

const drawer = cva('fixed z-50 bg-surface border-border shadow-xl', {
  variants: {
    side: {
      bottom: 'inset-x-0 bottom-0 rounded-t-xl border-t max-h-[85vh]',
      left: 'inset-y-0 left-0 rounded-r-xl border-r w-80 max-w-[85vw]',
      right: 'inset-y-0 right-0 rounded-l-xl border-l w-80 max-w-[85vw]',
    },
  },
  defaultVariants: { side: 'bottom' },
})

type DrawerProps = {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  side?: 'bottom' | 'left' | 'right'
  className?: string
}

function Drawer({ isOpen, onClose, title, children, side = 'bottom', className }: DrawerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { dialogProps, titleProps } = useDialog({ role: 'dialog' }, ref)

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <FocusScope contain restoreFocus autoFocus>
        <div
          {...dialogProps}
          ref={ref}
          className={twMerge(drawer({ side }), 'p-6 outline-none', className)}
        >
          {side === 'bottom' && <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-border" />}
          {title && (
            <h2 {...titleProps} className="text-lg font-semibold text-text-primary mb-4">
              {title}
            </h2>
          )}
          {children}
        </div>
      </FocusScope>
    </div>
  )
}

export { Drawer, drawer }
export type { DrawerProps }
