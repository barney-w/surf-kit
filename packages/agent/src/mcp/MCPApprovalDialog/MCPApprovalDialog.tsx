import React, { useRef, useEffect } from 'react'
import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import { useDialog, FocusScope } from 'react-aria'
import { Button, Badge } from '@surf-kit/core'
import type { MCPToolCallData } from '../../types/mcp'

export type MCPApprovalDialogProps = {
  call: MCPToolCallData
  riskLevel?: 'low' | 'medium' | 'high'
  onApprove: () => void
  onDeny: () => void
  isOpen: boolean
  className?: string
}

const riskBadgeIntent: Record<string, 'success' | 'warning' | 'error'> = {
  low: 'success',
  medium: 'warning',
  high: 'error',
}

const riskLabel: Record<string, string> = {
  low: 'Low Risk',
  medium: 'Medium Risk',
  high: 'High Risk',
}

const riskBorder = cva('relative bg-surface rounded-xl shadow-xl border p-6 outline-none w-full max-w-lg', {
  variants: {
    risk: {
      low: 'border-status-success-subtle',
      medium: 'border-status-warning-subtle',
      high: 'border-status-error-subtle',
    },
  },
  defaultVariants: { risk: 'low' },
})

function formatValue(value: unknown): string {
  if (typeof value === 'string') return value
  return JSON.stringify(value, null, 2)
}

function MCPApprovalDialog({
  call,
  riskLevel = 'low',
  onApprove,
  onDeny,
  isOpen,
  className,
}: MCPApprovalDialogProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { dialogProps, titleProps } = useDialog({ role: 'alertdialog' }, ref)

  // Block Escape key — user must explicitly approve or deny
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
      }
    }
    document.addEventListener('keydown', handleKeyDown, true)
    return () => document.removeEventListener('keydown', handleKeyDown, true)
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      data-testid="mcp-approval-overlay"
    >
      <FocusScope contain restoreFocus autoFocus>
        <div
          {...dialogProps}
          ref={ref}
          className={twMerge(riskBorder({ risk: riskLevel }), className)}
          data-testid="mcp-approval-dialog"
        >
          {/* Title */}
          <div className="flex items-center justify-between mb-4">
            <h2
              {...titleProps}
              className="text-lg font-semibold text-text-primary"
              data-testid="mcp-approval-title"
            >
              Tool Approval Required
            </h2>
            <Badge
              intent={riskBadgeIntent[riskLevel]}
              size="sm"
              data-testid="mcp-approval-risk-badge"
            >
              {riskLabel[riskLevel]}
            </Badge>
          </div>

          {/* Tool info */}
          <div className="space-y-3 text-sm">
            <div>
              <h3 className="text-xs font-medium text-text-secondary mb-1">Tool</h3>
              <p className="font-mono text-text-primary" data-testid="mcp-approval-tool-name">
                {call.name}
              </p>
              {call.serverName && (
                <p className="text-xs text-text-secondary mt-0.5" data-testid="mcp-approval-server">
                  Server: {call.serverName}
                </p>
              )}
            </div>

            {/* Arguments */}
            {Object.keys(call.arguments).length > 0 && (
              <div>
                <h3 className="text-xs font-medium text-text-secondary mb-1">Arguments</h3>
                <dl
                  className="space-y-1 bg-neutral-100 rounded p-2"
                  data-testid="mcp-approval-arguments"
                >
                  {Object.entries(call.arguments).map(([key, value]) => (
                    <div key={key} className="flex gap-2">
                      <dt className="text-xs font-mono text-text-secondary shrink-0">{key}:</dt>
                      <dd className="text-xs font-mono text-text-primary break-all">
                        {formatValue(value)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="mt-6 flex justify-end gap-3">
            <Button
              intent="secondary"
              onPress={onDeny}
              aria-label="Deny tool execution"
            >
              Deny
            </Button>
            <Button
              intent="primary"
              onPress={onApprove}
              aria-label="Approve tool execution"
            >
              Approve
            </Button>
          </div>
        </div>
      </FocusScope>
    </div>
  )
}

export { MCPApprovalDialog }
