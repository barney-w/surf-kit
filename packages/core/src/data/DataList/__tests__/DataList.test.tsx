import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import * as vitestAxe from 'vitest-axe/matchers'
import { axe } from 'vitest-axe'

import { DataList } from '../DataList'

expect.extend(vitestAxe)

const items = [
  { label: 'Name', value: 'Alice Johnson' },
  { label: 'Email', value: 'alice@example.com' },
  { label: 'Role', value: 'Administrator' },
]

describe('DataList', () => {
  it('renders as a dl element', () => {
    const { container } = render(<DataList items={items} />)
    const dl = container.querySelector('dl')
    expect(dl).toBeDefined()
    expect(dl).not.toBeNull()
  })

  it('renders dt and dd for each item', () => {
    const { container } = render(<DataList items={items} />)
    const dts = container.querySelectorAll('dt')
    const dds = container.querySelectorAll('dd')
    expect(dts).toHaveLength(3)
    expect(dds).toHaveLength(3)
  })

  it('renders label and value text', () => {
    render(<DataList items={items} />)
    expect(screen.getByText('Name')).toBeDefined()
    expect(screen.getByText('Alice Johnson')).toBeDefined()
    expect(screen.getByText('Email')).toBeDefined()
    expect(screen.getByText('alice@example.com')).toBeDefined()
  })

  it('applies orientation horizontal by default', () => {
    const { container } = render(<DataList items={items} />)
    const dl = container.querySelector('dl')
    expect(dl?.className).toContain('grid-cols-[auto_1fr]')
  })

  it('applies orientation vertical', () => {
    const { container } = render(<DataList items={items} orientation="vertical" />)
    const dl = container.querySelector('dl')
    expect(dl?.className).toContain('grid-cols-1')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<DataList items={items} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
