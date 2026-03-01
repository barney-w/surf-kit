import type React from 'react'
import { useRef } from 'react'
import { DismissButton, FocusScope, useOverlay } from 'react-aria'
import { twMerge } from 'tailwind-merge'

type PopoverProps = {
  triggerRef: React.RefObject<HTMLElement | null>
  isOpen: boolean
  onClose: () => void
  placement?: 'top' | 'bottom' | 'left' | 'right'
  children: React.ReactNode
  className?: string
}

const placementStyles: Record<string, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
}

function Popover({
  triggerRef: _triggerRef,
  isOpen,
  onClose,
  placement = 'bottom',
  children,
  className,
}: PopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null)

  const { overlayProps } = useOverlay(
    { isOpen, onClose, isDismissable: true, shouldCloseOnBlur: true },
    popoverRef,
  )

  if (!isOpen) return null

  return (
    <FocusScope restoreFocus>
      <div
        {...overlayProps}
        ref={popoverRef}
        className={twMerge(
          'absolute z-50 rounded-lg border border-border bg-surface p-4 shadow-lg outline-none',
          placementStyles[placement],
          className,
        )}
      >
        <DismissButton onDismiss={onClose} />
        {children}
        <DismissButton onDismiss={onClose} />
      </div>
    </FocusScope>
  )
}

export { Popover }
export type { PopoverProps }
