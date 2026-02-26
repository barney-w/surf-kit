import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Text } from '../Text'

describe('Text', () => {
  it('renders children', () => {
    render(<Text>Hello</Text>)
    expect(screen.getByText('Hello')).toBeDefined()
  })

  it('applies className', () => {
    render(<Text className="custom-class">Test</Text>)
    expect(screen.getByText('Test').className).toContain('custom-class')
  })

  it('renders as different element', () => {
    render(
      <Text as="span" data-testid="text">
        Content
      </Text>,
    )
    expect(screen.getByTestId('text').tagName).toBe('SPAN')
  })

  it('renders as p by default', () => {
    render(<Text data-testid="text">Default</Text>)
    expect(screen.getByTestId('text').tagName).toBe('P')
  })

  it('applies size variant', () => {
    render(<Text size="lg">Large</Text>)
    expect(screen.getByText('Large').className).toContain('text-lg')
  })

  it('applies weight variant', () => {
    render(<Text weight="bold">Bold</Text>)
    expect(screen.getByText('Bold').className).toContain('font-bold')
  })

  it('applies color variant', () => {
    render(<Text color="error">Error</Text>)
    expect(screen.getByText('Error').className).toContain('text-status-error')
  })
})
