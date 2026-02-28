import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeAll } from 'vitest'
import * as vitestAxe from 'vitest-axe/matchers'
import { axe } from 'vitest-axe'

import { MCPResourceView } from '../MCPResourceView'
import type { MCPResource } from '../../../types/mcp'

expect.extend(vitestAxe)

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
})

const textResource: MCPResource = {
  uri: 'file:///src/index.ts',
  name: 'index.ts',
  mimeType: 'text/typescript',
  content: 'export const hello = "world"',
}

describe('MCPResourceView', () => {
  it('renders resource name and URI', () => {
    render(<MCPResourceView resource={textResource} />)
    expect(screen.getByTestId('mcp-resource-name').textContent).toBe('index.ts')
    expect(screen.getByTestId('mcp-resource-uri').textContent).toBe('file:///src/index.ts')
  })

  it('renders text content as a code block', () => {
    render(<MCPResourceView resource={textResource} />)
    const code = screen.getByTestId('mcp-resource-code')
    expect(code).toBeDefined()
    expect(code.textContent).toBe('export const hello = "world"')
  })

  it('renders image content as an img element', () => {
    const imageResource: MCPResource = {
      uri: 'file:///assets/logo.png',
      name: 'logo.png',
      mimeType: 'image/png',
      content: 'data:image/png;base64,abc123',
    }
    render(<MCPResourceView resource={imageResource} />)
    const img = screen.getByTestId('mcp-resource-image') as HTMLImageElement
    expect(img.tagName).toBe('IMG')
    expect(img.src).toBe('data:image/png;base64,abc123')
    expect(img.alt).toBe('logo.png')
  })

  it('renders URL content as a link', () => {
    const urlResource: MCPResource = {
      uri: 'web://docs',
      name: 'Documentation',
      mimeType: 'text/plain',
      content: 'https://docs.example.com/api',
    }
    render(<MCPResourceView resource={urlResource} />)
    const link = screen.getByTestId('mcp-resource-link') as HTMLAnchorElement
    expect(link.tagName).toBe('A')
    expect(link.href).toBe('https://docs.example.com/api')
    expect(link.target).toBe('_blank')
    expect(link.rel).toBe('noopener noreferrer')
  })

  it('renders description when provided', () => {
    const resourceWithDesc: MCPResource = {
      ...textResource,
      description: 'Main entry point',
    }
    render(<MCPResourceView resource={resourceWithDesc} />)
    expect(screen.getByTestId('mcp-resource-description').textContent).toBe('Main entry point')
  })

  it('does not render content section when content is undefined', () => {
    const noContent: MCPResource = {
      uri: 'file:///empty',
      name: 'empty.txt',
    }
    render(<MCPResourceView resource={noContent} />)
    expect(screen.queryByTestId('mcp-resource-content')).toBeNull()
  })

  it('applies custom className', () => {
    render(<MCPResourceView resource={textResource} className="custom-class" />)
    const root = screen.getByTestId('mcp-resource-view')
    expect(root.className).toContain('custom-class')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<MCPResourceView resource={textResource} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
