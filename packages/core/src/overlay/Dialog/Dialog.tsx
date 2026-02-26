import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import React, { useRef, useEffect } from 'react'
import { useDialog, FocusScope } from 'react-aria'

const dialogPanel = cva(
  'relative bg-surface rounded-xl shadow-xl border border-border p-6 outline-none',
  {
    variants: {
      size: {
        sm: 'w-full max-w-sm',
        md: 'w-full max-w-lg',
        lg: 'w-full max-w-3xl',
        full: 'w-full max-w-[calc(100vw-2rem)] h-[calc(100vh-2rem)]',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

type DialogProps = {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  footer?: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'full'
  className?: string
}

function DialogHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={twMerge('text-lg font-semibold text-text-primary mb-4', className)}>
      {children}
    </div>
  )
}

function DialogBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={twMerge('text-text-secondary', className)}>{children}</div>
}

function DialogFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={twMerge('mt-6 flex justify-end gap-3', className)}>{children}</div>
  )
}

function Dialog({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  className,
}: DialogProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { dialogProps, titleProps } = useDialog({ role: 'dialog' }, ref)

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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <FocusScope contain restoreFocus autoFocus>
        <div
          {...dialogProps}
          ref={ref}
          className={twMerge(dialogPanel({ size }), className)}
        >
          <h2 {...titleProps} className="text-lg font-semibold text-text-primary mb-4">
            {title}
          </h2>
          <div className="text-text-secondary">{children}</div>
          {footer && (
            <div className="mt-6 flex justify-end gap-3">{footer}</div>
          )}
        </div>
      </FocusScope>
    </div>
  )
}

Dialog.Header = DialogHeader
Dialog.Body = DialogBody
Dialog.Footer = DialogFooter

export { Dialog, dialogPanel }
export type { DialogProps }
