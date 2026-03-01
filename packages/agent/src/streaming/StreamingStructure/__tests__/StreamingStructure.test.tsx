import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { StreamingStructure } from '../StreamingStructure'

// Mock useReducedMotion
vi.mock('@surf-kit/hooks', () => ({
  useReducedMotion: vi.fn(() => false),
}))

describe('StreamingStructure', () => {
  it('renders key-value pairs', () => {
    render(<StreamingStructure data={{ name: 'Alice', role: 'Admin' }} />)
    expect(screen.getByText('name')).toBeDefined()
    expect(screen.getByText('Alice')).toBeDefined()
    expect(screen.getByText('role')).toBeDefined()
    expect(screen.getByText('Admin')).toBeDefined()
  })

  it('renders string values', () => {
    render(<StreamingStructure data={{ greeting: 'hello world' }} />)
    expect(screen.getByText('hello world')).toBeDefined()
  })

  it('renders number values', () => {
    render(<StreamingStructure data={{ count: 42 }} />)
    expect(screen.getByText('42')).toBeDefined()
  })

  it('handles nested objects', () => {
    render(<StreamingStructure data={{ address: { city: 'Sydney', country: 'Australia' } }} />)
    expect(screen.getByText('city')).toBeDefined()
    expect(screen.getByText('Sydney')).toBeDefined()
    expect(screen.getByTestId('streaming-structure-nested')).toBeDefined()
  })

  it('handles arrays', () => {
    render(<StreamingStructure data={{ tags: ['a', 'b', 'c'] }} />)
    expect(screen.getByText('a')).toBeDefined()
    expect(screen.getByText('b')).toBeDefined()
    expect(screen.getByText('c')).toBeDefined()
  })

  it('handles null and undefined values', () => {
    render(<StreamingStructure data={{ empty: null }} />)
    expect(screen.getByText('null')).toBeDefined()
  })

  it('shows TextGlimmer when isStreaming', () => {
    render(<StreamingStructure data={{ key: 'val' }} isStreaming={true} />)
    expect(screen.getByTestId('streaming-structure-loading')).toBeDefined()
    expect(screen.getByTestId('text-glimmer')).toBeDefined()
  })

  it('does not show TextGlimmer when not streaming', () => {
    render(<StreamingStructure data={{ key: 'val' }} isStreaming={false} />)
    expect(screen.queryByTestId('streaming-structure-loading')).toBeNull()
  })

  it('merges className', () => {
    render(<StreamingStructure data={{ a: 1 }} className="custom-class" />)
    const el = screen.getByTestId('streaming-structure')
    expect(el.className).toContain('custom-class')
  })
})
