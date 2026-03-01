import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Grid } from '../Grid'

describe('Grid', () => {
  it('renders children', () => {
    render(<Grid>Hello</Grid>)
    expect(screen.getByText('Hello')).toBeDefined()
  })

  it('applies className', () => {
    render(<Grid className="custom-class">Test</Grid>)
    expect(screen.getByText('Test').className).toContain('custom-class')
  })

  it('applies grid class', () => {
    render(<Grid data-testid="grid">Content</Grid>)
    expect(screen.getByTestId('grid').className).toContain('grid')
  })

  it('applies columns as number', () => {
    render(
      <Grid columns={3} data-testid="grid">
        Content
      </Grid>,
    )
    expect(screen.getByTestId('grid').className).toContain('grid-cols-3')
  })

  it('applies responsive columns', () => {
    render(
      <Grid columns={{ default: 1, md: 2, lg: 3 }} data-testid="grid">
        Content
      </Grid>,
    )
    const className = screen.getByTestId('grid').className
    expect(className).toContain('grid-cols-1')
    expect(className).toContain('md:grid-cols-2')
    expect(className).toContain('lg:grid-cols-3')
  })

  it('applies gap', () => {
    render(
      <Grid gap={6} data-testid="grid">
        Content
      </Grid>,
    )
    expect(screen.getByTestId('grid').className).toContain('gap-6')
  })
})
