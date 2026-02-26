import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import * as vitestAxe from 'vitest-axe/matchers'
import { axe } from 'vitest-axe'

import { Card } from '../Card'

expect.extend(vitestAxe)

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Card Content</Card>)
    expect(screen.getByText('Card Content')).toBeDefined()
  })

  it('renders with default variant', () => {
    const { container } = render(<Card>Content</Card>)
    const card = container.firstElementChild as HTMLElement
    expect(card.className).toContain('bg-surface')
    expect(card.className).toContain('border')
  })

  it('renders with elevated variant', () => {
    const { container } = render(<Card variant="elevated">Content</Card>)
    const card = container.firstElementChild as HTMLElement
    expect(card.className).toContain('shadow-lg')
  })

  it('renders with outlined variant', () => {
    const { container } = render(<Card variant="outlined">Content</Card>)
    const card = container.firstElementChild as HTMLElement
    expect(card.className).toContain('border-2')
  })

  it('renders compound Header, Body, Footer', () => {
    render(
      <Card>
        <Card.Header>Header</Card.Header>
        <Card.Body>Body</Card.Body>
        <Card.Footer>Footer</Card.Footer>
      </Card>,
    )
    expect(screen.getByText('Header')).toBeDefined()
    expect(screen.getByText('Body')).toBeDefined()
    expect(screen.getByText('Footer')).toBeDefined()
  })

  it('applies custom className', () => {
    const { container } = render(<Card className="custom-class">Content</Card>)
    const card = container.firstElementChild as HTMLElement
    expect(card.className).toContain('custom-class')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Card>
        <Card.Header>Header</Card.Header>
        <Card.Body>Body</Card.Body>
        <Card.Footer>Footer</Card.Footer>
      </Card>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
