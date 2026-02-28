import { twMerge } from 'tailwind-merge'
import React, { useState, useRef, useCallback, useEffect } from 'react'

type HoverCardProps = {
  children: React.ReactNode
  content: React.ReactNode
  openDelay?: number
  closeDelay?: number
  side?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
}

const sideStyles: Record<string, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
}

function HoverCard({
  children,
  content,
  openDelay = 300,
  closeDelay = 200,
  side = 'bottom',
  className,
}: HoverCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const id = useRef(`hovercard-${Math.random().toString(36).slice(2, 9)}`).current

  const clearTimers = useCallback(() => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current)
      openTimerRef.current = null
    }
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }, [])

  const handleMouseEnter = useCallback(() => {
    clearTimers()
    openTimerRef.current = setTimeout(() => {
      setIsOpen(true)
    }, openDelay)
  }, [openDelay, clearTimers])

  const handleMouseLeave = useCallback(() => {
    clearTimers()
    closeTimerRef.current = setTimeout(() => {
      setIsOpen(false)
    }, closeDelay)
  }, [closeDelay, clearTimers])

  useEffect(() => {
    return () => clearTimers()
  }, [clearTimers])

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div aria-describedby={isOpen ? id : undefined}>{children}</div>
      {isOpen && (
        <div
          id={id}
          role="tooltip"
          className={twMerge(
            'absolute z-50 w-64 rounded-lg border border-border bg-surface p-4 shadow-lg',
            sideStyles[side],
            className,
          )}
        >
          {content}
        </div>
      )}
    </div>
  )
}

export { HoverCard }
export type { HoverCardProps }
