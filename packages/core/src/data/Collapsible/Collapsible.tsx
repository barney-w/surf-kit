import React, { createContext, useCallback, useContext, useState } from 'react'
import { twMerge } from 'tailwind-merge'

type CollapsibleProps = {
  isOpen?: boolean
  defaultOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
  children: React.ReactNode
  className?: string
}

type CollapsibleTriggerProps = {
  children: React.ReactNode
  className?: string
}

type CollapsibleContentProps = {
  children: React.ReactNode
  className?: string
}

type CollapsibleContextValue = {
  isOpen: boolean
  toggle: () => void
  contentId: string
}

const CollapsibleContext = createContext<CollapsibleContextValue | null>(null)

function useCollapsibleContext() {
  const context = useContext(CollapsibleContext)
  if (!context) {
    throw new Error('Collapsible compound components must be used within a <Collapsible> parent.')
  }
  return context
}

function CollapsibleTrigger({ children, className }: CollapsibleTriggerProps) {
  const { isOpen, toggle, contentId } = useCollapsibleContext()

  return (
    <button
      type="button"
      aria-expanded={isOpen}
      aria-controls={contentId}
      onClick={toggle}
      className={twMerge(className)}
    >
      {children}
    </button>
  )
}

function CollapsibleContent({ children, className }: CollapsibleContentProps) {
  const { isOpen, contentId } = useCollapsibleContext()

  return (
    <div id={contentId} role="region" hidden={!isOpen} className={twMerge(className)}>
      {children}
    </div>
  )
}

function Collapsible({
  isOpen: controlledIsOpen,
  defaultOpen = false,
  onOpenChange,
  children,
  className,
}: CollapsibleProps) {
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(defaultOpen)
  const contentId = React.useId()

  const isControlled = controlledIsOpen !== undefined
  const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen

  const toggle = useCallback(() => {
    const next = !isOpen
    if (!isControlled) {
      setUncontrolledIsOpen(next)
    }
    onOpenChange?.(next)
  }, [isOpen, isControlled, onOpenChange])

  return (
    <CollapsibleContext.Provider value={{ isOpen, toggle, contentId }}>
      <div className={twMerge(className)}>{children}</div>
    </CollapsibleContext.Provider>
  )
}

Collapsible.Trigger = CollapsibleTrigger
Collapsible.Content = CollapsibleContent

export { Collapsible }
export type { CollapsibleProps, CollapsibleTriggerProps, CollapsibleContentProps }
