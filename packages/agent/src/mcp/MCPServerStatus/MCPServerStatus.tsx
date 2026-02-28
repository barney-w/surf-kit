import React, { useState } from 'react'
import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import type { MCPServerInfo } from '../../types/mcp'

export type MCPServerStatusProps = {
  server: MCPServerInfo
  className?: string
}

const statusDot = cva('inline-block h-2 w-2 rounded-full shrink-0', {
  variants: {
    status: {
      connected: 'bg-status-success',
      disconnected: 'bg-neutral-400',
      error: 'bg-status-error',
    },
  },
  defaultVariants: { status: 'disconnected' },
})

const statusLabel: Record<MCPServerInfo['status'], string> = {
  connected: 'Connected',
  disconnected: 'Disconnected',
  error: 'Error',
}

function formatLastPing(date?: Date): string | null {
  if (!date) return null
  return date.toLocaleTimeString()
}

function MCPServerStatus({ server, className }: MCPServerStatusProps) {
  const [showTools, setShowTools] = useState(false)
  const [showResources, setShowResources] = useState(false)
  const lastPing = formatLastPing(server.lastPing)

  return (
    <div
      className={twMerge('rounded-lg border border-border bg-surface p-3 text-sm', className)}
      data-testid="mcp-server-status"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <span
          className={statusDot({ status: server.status })}
          role="status"
          aria-label={statusLabel[server.status]}
          data-testid="mcp-server-status-dot"
        />
        <span className="font-medium text-text-primary" data-testid="mcp-server-name">
          {server.name}
        </span>
        {server.version && (
          <span className="text-xs text-text-secondary" data-testid="mcp-server-version">
            v{server.version}
          </span>
        )}
      </div>

      {lastPing && (
        <p className="text-xs text-text-secondary ml-4 mb-2" data-testid="mcp-server-last-ping">
          Last ping: {lastPing}
        </p>
      )}

      {/* Tools list */}
      {server.tools.length > 0 && (
        <div className="mt-2">
          <button
            type="button"
            className="flex items-center gap-1 text-xs font-medium text-text-secondary hover:text-text-primary w-full"
            onClick={() => setShowTools((prev) => !prev)}
            aria-expanded={showTools}
            data-testid="mcp-server-tools-toggle"
          >
            <svg
              className={`h-3 w-3 transition-transform ${showTools ? 'rotate-90' : ''}`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clipRule="evenodd"
              />
            </svg>
            Tools ({server.tools.length})
          </button>
          {showTools && (
            <ul className="mt-1 ml-4 space-y-1" data-testid="mcp-server-tools-list">
              {server.tools.map((tool) => (
                <li key={tool.name} className="text-xs text-text-primary">
                  <span className="font-mono">{tool.name}</span>
                  {tool.description && (
                    <span className="text-text-secondary ml-1">— {tool.description}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Resources list */}
      {server.resources.length > 0 && (
        <div className="mt-2">
          <button
            type="button"
            className="flex items-center gap-1 text-xs font-medium text-text-secondary hover:text-text-primary w-full"
            onClick={() => setShowResources((prev) => !prev)}
            aria-expanded={showResources}
            data-testid="mcp-server-resources-toggle"
          >
            <svg
              className={`h-3 w-3 transition-transform ${showResources ? 'rotate-90' : ''}`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clipRule="evenodd"
              />
            </svg>
            Resources ({server.resources.length})
          </button>
          {showResources && (
            <ul className="mt-1 ml-4 space-y-1" data-testid="mcp-server-resources-list">
              {server.resources.map((res) => (
                <li key={res.uri} className="text-xs text-text-primary">
                  <span className="font-mono">{res.name}</span>
                  <span className="text-text-secondary ml-1">({res.uri})</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

export { MCPServerStatus }
