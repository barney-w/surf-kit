import { twMerge } from 'tailwind-merge'
import type { MCPResource } from '../../types/mcp'

export type MCPResourceViewProps = {
  resource: MCPResource
  className?: string
}

function isImageMime(mime?: string): boolean {
  return !!mime && mime.startsWith('image/')
}

function isTextMime(mime?: string): boolean {
  if (!mime) return true
  return (
    mime.startsWith('text/') ||
    mime === 'application/json' ||
    mime === 'application/xml' ||
    mime === 'application/javascript' ||
    mime === 'application/typescript'
  )
}

function isUrlContent(content?: string | Uint8Array): boolean {
  if (typeof content !== 'string') return false
  return /^https?:\/\//.test(content.trim())
}

function MCPResourceView({ resource, className }: MCPResourceViewProps) {
  const { uri, name, mimeType, description, content } = resource

  return (
    <div
      className={twMerge('rounded-lg border border-border bg-surface p-3 text-sm', className)}
      data-testid="mcp-resource-view"
    >
      {/* Header */}
      <div className="mb-2">
        <span className="font-medium text-text-primary" data-testid="mcp-resource-name">
          {name}
        </span>
        <span
          className="ml-2 text-xs text-text-secondary font-mono truncate"
          data-testid="mcp-resource-uri"
        >
          {uri}
        </span>
      </div>

      {description && (
        <p className="text-xs text-text-secondary mb-2" data-testid="mcp-resource-description">
          {description}
        </p>
      )}

      {/* Content rendering */}
      {content !== undefined && (
        <div data-testid="mcp-resource-content">
          {isImageMime(mimeType) && typeof content === 'string' ? (
            <img
              src={content}
              alt={name}
              className="max-w-full rounded"
              data-testid="mcp-resource-image"
            />
          ) : isUrlContent(content) ? (
            <a
              href={typeof content === 'string' ? content.trim() : undefined}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-interactive-primary hover:underline break-all"
              data-testid="mcp-resource-link"
            >
              {typeof content === 'string' ? content.trim() : ''}
            </a>
          ) : isTextMime(mimeType) ? (
            <pre
              className="text-xs font-mono text-text-primary bg-surface-sunken rounded p-2 overflow-x-auto whitespace-pre-wrap"
              data-testid="mcp-resource-code"
            >
              {typeof content === 'string' ? content : '[Binary data]'}
            </pre>
          ) : (
            <p className="text-xs text-text-secondary italic">
              Unsupported content type: {mimeType}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export { MCPResourceView }
