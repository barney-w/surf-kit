import type React from 'react'
import { cloneElement, useRef } from 'react'
import { useTooltip, useTooltipTrigger } from 'react-aria'
import { useTooltipTriggerState } from 'react-stately'
import { twMerge } from 'tailwind-merge'

type TooltipProps = {
  content: string
  placement?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
  children: React.ReactElement
  className?: string
}

const placementStyles: Record<string, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
}

function TooltipContent({ state, className, placement = 'top', content, ...props }: any) {
  const { tooltipProps } = useTooltip(props, state)

  return (
    <span
      {...tooltipProps}
      className={twMerge(
        'absolute z-50 whitespace-nowrap rounded-md bg-neutral-900 px-2 py-1 text-xs text-white shadow-lg pointer-events-none',
        placementStyles[placement],
        className,
      )}
    >
      {content}
    </span>
  )
}

function Tooltip({ content, placement = 'top', delay = 700, children, className }: TooltipProps) {
  const state = useTooltipTriggerState({ delay })
  const triggerRef = useRef<HTMLElement>(null)
  const { triggerProps, tooltipProps } = useTooltipTrigger({ delay }, state, triggerRef)

  return (
    <span className="relative inline-block">
      {cloneElement(children as React.ReactElement<any>, { ...triggerProps, ref: triggerRef })}
      {state.isOpen && (
        <TooltipContent
          state={state}
          placement={placement}
          content={content}
          className={className}
          {...tooltipProps}
        />
      )}
    </span>
  )
}

export { Tooltip }
export type { TooltipProps }
