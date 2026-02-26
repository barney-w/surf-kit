import React from 'react'
import type { AgentResponse } from '../../types/agent'

type StructuredResponseProps = {
  uiHint: AgentResponse['ui_hint']
  data: Record<string, unknown> | null
  className?: string
}

function renderTable(data: Record<string, unknown>) {
  // If data has a 'rows' and 'columns' shape, use that; otherwise render key-value pairs
  const rows = Array.isArray(data.rows) ? data.rows as Record<string, unknown>[] : null
  const columns = Array.isArray(data.columns) ? data.columns as string[] : null

  if (rows && columns) {
    return (
      <table role="table" className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="text-left px-4 py-2 font-medium text-text-primary border-b border-border"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {columns.map((col) => (
                <td key={col} className="px-4 py-2 text-text-secondary border-b border-border">
                  {String(row[col] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  // Fallback: render as key-value table
  const entries = Object.entries(data)
  return (
    <table role="table" className="w-full border-collapse text-sm">
      <thead>
        <tr>
          <th className="text-left px-4 py-2 font-medium text-text-primary border-b border-border">
            Key
          </th>
          <th className="text-left px-4 py-2 font-medium text-text-primary border-b border-border">
            Value
          </th>
        </tr>
      </thead>
      <tbody>
        {entries.map(([key, value]) => (
          <tr key={key}>
            <td className="px-4 py-2 text-text-secondary border-b border-border font-medium">
              {key}
            </td>
            <td className="px-4 py-2 text-text-secondary border-b border-border">
              {typeof value === 'object' ? JSON.stringify(value) : String(value ?? '')}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function StructuredResponse({ uiHint, data, className }: StructuredResponseProps) {
  if (!data) {
    return null
  }

  let content: React.ReactNode

  switch (uiHint) {
    case 'text':
      content = (
        <p data-testid="structured-text">
          {typeof data.text === 'string'
            ? data.text
            : JSON.stringify(data, null, 2)}
        </p>
      )
      break
    case 'table':
      content = renderTable(data)
      break
    default:
      content = (
        <pre data-testid="structured-json" className="text-sm overflow-auto p-4 bg-surface-raised rounded-lg">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      )
      break
  }

  return (
    <div className={className} data-testid="structured-response">
      {content}
    </div>
  )
}

export { StructuredResponse }
export type { StructuredResponseProps }
