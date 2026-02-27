import React from 'react'
import type { AgentResponse } from '../../types/agent'

type StructuredResponseProps = {
  uiHint: AgentResponse['ui_hint']
  data: Record<string, unknown> | null
  className?: string
}

/** Parse a value that may be a JSON-encoded string or already parsed. */
function tryParse<T>(value: unknown): T | null {
  if (value === undefined || value === null) return null
  if (typeof value === 'string') {
    try {
      return JSON.parse(value) as T
    } catch {
      return null
    }
  }
  return value as T
}

function renderSteps(data: Record<string, unknown>) {
  const steps = tryParse<string[]>(data.steps)
  if (!steps || !Array.isArray(steps)) return null
  return (
    <ol className="flex flex-col gap-2" data-testid="structured-steps">
      {steps.map((step, i) => (
        <li key={i} className="flex items-start gap-3">
          <span
            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-[11px] font-semibold text-white"
            aria-hidden="true"
          >
            {i + 1}
          </span>
          <span className="text-sm text-text-primary leading-relaxed">{step}</span>
        </li>
      ))}
    </ol>
  )
}

function renderTable(data: Record<string, unknown>) {
  const columns = tryParse<string[]>(data.columns)
  // rows may be array-of-arrays or array-of-objects; normalise to array-of-arrays
  const rawRows = tryParse<unknown[]>(data.rows)

  if (columns && rawRows && Array.isArray(columns) && Array.isArray(rawRows)) {
    return (
      <div className="overflow-x-auto rounded-lg border border-border" data-testid="structured-table">
        <table role="table" className="w-full border-collapse text-sm">
          <thead className="bg-surface-raised">
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  className="text-left px-4 py-2.5 font-semibold text-text-primary border-b border-border"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rawRows.map((row, i) => {
              const cells = Array.isArray(row)
                ? row
                : columns.map((col) => (row as Record<string, unknown>)[col])
              return (
                <tr key={i} className="even:bg-surface-raised/40">
                  {cells.map((cell, j) => (
                    <td key={j} className="px-4 py-2 text-text-secondary border-b border-border">
                      {String(cell ?? '')}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

  // Fallback: key-value table
  const entries = Object.entries(data)
  return (
    <div className="overflow-x-auto rounded-lg border border-border" data-testid="structured-table">
      <table role="table" className="w-full border-collapse text-sm">
        <tbody>
          {entries.map(([key, value]) => (
            <tr key={key} className="even:bg-surface-raised/40">
              <td className="px-4 py-2 text-text-primary font-medium border-b border-border w-1/3">
                {key}
              </td>
              <td className="px-4 py-2 text-text-secondary border-b border-border">
                {typeof value === 'object' ? JSON.stringify(value) : String(value ?? '')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function renderCard(data: Record<string, unknown>) {
  const title = typeof data.title === 'string' ? data.title : null
  const body = typeof data.body === 'string' ? data.body : null
  const link = typeof data.link === 'string' ? data.link : null
  const linkLabel = typeof data.link_label === 'string' ? data.link_label : 'Learn more'

  return (
    <div
      className="rounded-xl border border-border bg-surface-raised p-4 flex flex-col gap-2"
      data-testid="structured-card"
    >
      {title && <p className="text-sm font-semibold text-text-primary">{title}</p>}
      {body && <p className="text-sm text-text-secondary leading-relaxed">{body}</p>}
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-accent hover:text-accent/80 underline-offset-2 hover:underline transition-colors"
        >
          {linkLabel}
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      )}
    </div>
  )
}

function renderList(data: Record<string, unknown>) {
  const items = tryParse<string[]>(data.items)
  const title = typeof data.title === 'string' ? data.title : null
  if (!items || !Array.isArray(items)) return null

  return (
    <div className="flex flex-col gap-1.5" data-testid="structured-list">
      {title && (
        <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1">{title}</p>
      )}
      <ul className="flex flex-col gap-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
            <span className="text-sm text-text-primary leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function renderWarning(data: Record<string, unknown>) {
  const severity = typeof data.severity === 'string' ? data.severity : 'medium'
  const action = typeof data.action === 'string' ? data.action : null
  const details = typeof data.details === 'string' ? data.details : null
  const isHigh = severity === 'high'

  return (
    <div
      role="alert"
      className={`rounded-xl border p-4 flex gap-3 ${
        isHigh
          ? 'border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/30'
          : 'border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-950/30'
      }`}
      data-testid="structured-warning"
    >
      <svg
        className={`mt-0.5 h-5 w-5 shrink-0 ${isHigh ? 'text-red-500' : 'text-amber-500'}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
      <div className="flex flex-col gap-1">
        {action && (
          <p className={`text-sm font-semibold ${isHigh ? 'text-red-700 dark:text-red-300' : 'text-amber-700 dark:text-amber-300'}`}>
            {action}
          </p>
        )}
        {details && (
          <p className={`text-sm ${isHigh ? 'text-red-600 dark:text-red-400' : 'text-amber-600 dark:text-amber-400'}`}>
            {details}
          </p>
        )}
      </div>
    </div>
  )
}

function StructuredResponse({ uiHint, data, className }: StructuredResponseProps) {
  if (!data) return null

  let content: React.ReactNode

  switch (uiHint) {
    case 'steps':
      content = renderSteps(data)
      break
    case 'table':
      content = renderTable(data)
      break
    case 'card':
      content = renderCard(data)
      break
    case 'list':
      content = renderList(data)
      break
    case 'warning':
      content = renderWarning(data)
      break
    case 'text':
      content = typeof data.text === 'string'
        ? <p data-testid="structured-text">{data.text}</p>
        : null
      break
    default:
      content = null
  }

  if (!content) return null

  return (
    <div className={className} data-testid="structured-response">
      {content}
    </div>
  )
}

export { StructuredResponse }
export type { StructuredResponseProps }
