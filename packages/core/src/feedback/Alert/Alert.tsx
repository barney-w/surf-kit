import { cva } from 'class-variance-authority'
import type React from 'react'
import { twMerge } from 'tailwind-merge'

const alert = cva('flex items-start gap-3 rounded-lg border p-4', {
  variants: {
    intent: {
      info: 'bg-sky-100 text-sky-700 border-sky-300',
      success: 'bg-status-success-subtle text-status-success border-status-success',
      warning: 'bg-status-warning-subtle text-status-warning border-status-warning',
      error: 'bg-status-error-subtle text-status-error border-status-error',
    },
  },
  defaultVariants: { intent: 'info' },
})

type AlertProps = {
  intent?: 'info' | 'success' | 'warning' | 'error'
  title?: string
  children?: React.ReactNode
  onDismiss?: () => void
  className?: string
}

function Alert({ intent = 'info', title, children, onDismiss, className }: AlertProps) {
  const role = intent === 'error' || intent === 'warning' ? 'alert' : 'status'

  return (
    <div role={role} className={twMerge(alert({ intent }), className)}>
      <div className="flex-1">
        {title && <p className="font-semibold">{title}</p>}
        {children && <div className={title ? 'mt-1' : ''}>{children}</div>}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="shrink-0 rounded p-1 opacity-70 hover:opacity-100 transition-opacity"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
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
      )}
    </div>
  )
}

export { Alert, alert }
export type { AlertProps }
