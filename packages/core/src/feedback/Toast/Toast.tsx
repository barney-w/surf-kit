import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react'
import { cva } from 'class-variance-authority'

type ToastIntent = 'info' | 'success' | 'warning' | 'error'

interface ToastOptions {
  message: string
  intent?: ToastIntent
  duration?: number
}

interface ToastItem extends ToastOptions {
  id: string
}

interface ToastContextValue {
  toast: (options: ToastOptions) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

const toastStyle = cva(
  'flex items-center gap-3 rounded-lg border p-4 shadow-lg min-w-[280px] max-w-[420px]',
  {
    variants: {
      intent: {
        info: 'bg-sky-100 text-sky-700 border-sky-300',
        success:
          'bg-status-success-subtle text-status-success border-status-success',
        warning:
          'bg-status-warning-subtle text-status-warning border-status-warning',
        error:
          'bg-status-error-subtle text-status-error border-status-error',
      },
    },
    defaultVariants: { intent: 'info' },
  },
)

function Toast({ item, onDismiss }: { item: ToastItem; onDismiss: () => void }) {
  const duration = item.duration ?? 5000
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const startedAtRef = useRef<number | null>(null)
  const remainingRef = useRef(duration)

  const clearTimer = useCallback(() => {
    if (!timeoutRef.current) {
      return
    }

    clearTimeout(timeoutRef.current)
    timeoutRef.current = null

    if (startedAtRef.current !== null) {
      const elapsed = Date.now() - startedAtRef.current
      remainingRef.current = Math.max(0, remainingRef.current - elapsed)
      startedAtRef.current = null
    }
  }, [])

  const startTimer = useCallback(() => {
    clearTimer()

    if (remainingRef.current <= 0) {
      onDismiss()
      return
    }

    startedAtRef.current = Date.now()
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null
      startedAtRef.current = null
      onDismiss()
    }, remainingRef.current)
  }, [clearTimer, onDismiss])

  useEffect(() => {
    startTimer()

    return () => {
      clearTimer()
    }
  }, [clearTimer, startTimer])

  return (
    <div
      className={toastStyle({ intent: item.intent ?? 'info' })}
      onMouseEnter={clearTimer}
      onMouseLeave={startTimer}
    >
      <span className="flex-1">{item.message}</span>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss"
        className="shrink-0 rounded p-1 opacity-70 hover:opacity-100 transition-opacity"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
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
  )
}

function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const counterRef = useRef(0)

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback((options: ToastOptions) => {
    const id = String(++counterRef.current)
    const item: ToastItem = { ...options, id }
    setToasts((prev) => [...prev, item])
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        aria-live="polite"
        className="fixed top-4 right-4 z-50 flex flex-col gap-2"
      >
        {toasts.map((t) => (
          <Toast key={t.id} item={t} onDismiss={() => removeToast(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return ctx.toast
}

export { ToastProvider, useToast, toastStyle }
export type { ToastOptions, ToastIntent }
