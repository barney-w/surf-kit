import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Stack } from '../Stack'

describe('Stack', () => {
  it('renders children', () => {
    render(<Stack>Hello</Stack>)
    expect(screen.getByText('Hello')).toBeDefined()
  })

  it('applies className', () => {
    render(<Stack className="custom-class">Test</Stack>)
    expect(screen.getByText('Test').className).toContain('custom-class')
  })

  it('applies flex class by default', () => {
    render(<Stack data-testid="stack">Content</Stack>)
    expect(screen.getByTestId('stack').className).toContain('flex')
  })

  it('applies vertical direction by default', () => {
    render(<Stack data-testid="stack">Content</Stack>)
    expect(screen.getByTestId('stack').className).toContain('flex-col')
  })

  it('applies horizontal direction', () => {
    render(
      <Stack direction="horizontal" data-testid="stack">
        Content
      </Stack>,
    )
    expect(screen.getByTestId('stack').className).toContain('flex-row')
  })

  it('applies gap variant', () => {
    render(
      <Stack gap={6} data-testid="stack">
        Content
      </Stack>,
    )
    expect(screen.getByTestId('stack').className).toContain('gap-6')
  })

  it('applies align variant', () => {
    render(
      <Stack align="center" data-testid="stack">
        Content
      </Stack>,
    )
    expect(screen.getByTestId('stack').className).toContain('items-center')
  })

  it('applies justify variant', () => {
    render(
      <Stack justify="between" data-testid="stack">
        Content
      </Stack>,
    )
    expect(screen.getByTestId('stack').className).toContain('justify-between')
  })
})
