import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Box } from '../Box'

describe('Box', () => {
  it('renders children', () => {
    render(<Box>Hello</Box>)
    expect(screen.getByText('Hello')).toBeDefined()
  })

  it('applies className', () => {
    render(<Box className="custom-class">Test</Box>)
    expect(screen.getByText('Test').className).toContain('custom-class')
  })

  it('renders as different element', () => {
    render(
      <Box as="section" data-testid="box">
        Content
      </Box>,
    )
    expect(screen.getByTestId('box').tagName).toBe('SECTION')
  })

  it('renders as div by default', () => {
    render(<Box data-testid="box">Default</Box>)
    expect(screen.getByTestId('box').tagName).toBe('DIV')
  })
})
