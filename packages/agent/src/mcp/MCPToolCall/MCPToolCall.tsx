import React from 'react'
import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import { Badge, Spinner } from '@surf-kit/core'
import type { MCPToolCallData, MCPToolStatus } from '../../types/mcp'

export type MCPToolCallProps = {
  call: MCPToolCallData
  isExpanded?: boolean
  onToggleExpand?: () => void
  className?: string
}

const statusBadgeIntent: Record<MCPToolStatus, 'default' | 'info' | 'success' | 'error'> = {
  pending: 'default',
  running: 'info',
  success: 'success',
  error: 'error',
}

const statusLabel: Record<MCPToolStatus, string> = {
  pending: 'Pending',
  running: 'Running',
  success: 'Success',
  error: 'Error',
}

const container = cva(
  'rounded-lg border text-sm',
  {
    variants: {
      status: {
        pending: 'border-neutral-200 bg-neutral-50',
        running: 'border-sky-200 bg-sky-50',
        success: 'border-status-success-subtle bg-status-success-subtle/30',
        error: 'border-status-error-subtle bg-status-error-subtle/30',
      },
    },
    defaultVariants: { status: 'pending' },
  },
)

function formatDuration(start?: Date, end?: Date): string | null {
  if (!start || !end) return null
  const ms = end.getTime() - start.getTime()
  if (ms < 1000) return `${ms}ms`
  return `${(ms / 1000).toFixed(1)}s`
}

function formatValue(value: unknown): string {
  if (typeof value === 'string') return value
  return JSON.stringify(value, null, 2)
}

function MCPToolCall({ call, isExpanded = false, onToggleExpand, className }: MCPToolCallProps) {
  const duration = formatDuration(call.startedAt, call.completedAt)

  return (
    <div
      className={twMerge(container({ status: call.status }), className)}
      data-testid="mcp-tool-call"
    >
      {/* Header */}
      <button
        type="button"
        className="flex w-full items-center justify-between gap-2 px-3 py-2"
        onClick={onToggleExpand}
        aria-expanded={isExpanded}
        data-testid="mcp-tool-call-header"
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-medium text-text-primary truncate" data-testid="mcp-tool-name">
            {call.name}
          </span>
          {call.serverName && (
            <span className="text-xs text-text-secondary truncate">
              {call.serverName}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {call.status === 'running' && (
            <span aria-hidden="true">
              <Spinner size="sm" />
            </span>
          )}
          <Badge
            intent={statusBadgeIntent[call.status]}
            size="sm"
            role="status"
            aria-label={`Status: ${statusLabel[call.status]}`}
            data-testid="mcp-tool-status"
          >
            {statusLabel[call.status]}
          </Badge>
          {duration && (
            <span className="text-xs text-text-secondary" data-testid="mcp-tool-duration">
              {duration}
            </span>
          )}
          <svg
            className={`h-4 w-4 text-text-secondary transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </button>

      {/* Expandable body */}
      {isExpanded && (
        <div className="border-t border-inherit px-3 py-2 space-y-3" data-testid="mcp-tool-call-body">
          {/* Arguments */}
          {Object.keys(call.arguments).length > 0 && (
            <div>
              <h4 className="text-xs font-medium text-text-secondary mb-1">Arguments</h4>
              <dl className="space-y-1" data-testid="mcp-tool-arguments">
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

          {/* Result */}
          {call.result !== undefined && (
            <div>
              <h4 className="text-xs font-medium text-text-secondary mb-1">Result</h4>
              <pre
                className="text-xs font-mono text-text-primary bg-neutral-100 rounded p-2 overflow-x-auto whitespace-pre-wrap"
                data-testid="mcp-tool-result"
              >
                {typeof call.result === 'string' ? call.result : JSON.stringify(call.result, null, 2)}
              </pre>
            </div>
          )}

          {/* Error */}
          {call.error && (
            <div>
              <h4 className="text-xs font-medium text-status-error mb-1">Error</h4>
              <p
                className="text-xs text-status-error bg-status-error-subtle/30 rounded p-2"
                data-testid="mcp-tool-error"
              >
                {call.error}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export { MCPToolCall }
