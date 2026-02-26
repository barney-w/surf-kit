import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import * as vitestAxe from 'vitest-axe/matchers'
import { axe } from 'vitest-axe'

import { Breadcrumb } from '../Breadcrumb'

expect.extend(vitestAxe)

const items = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Current Page' },
]

describe('Breadcrumb', () => {
  it('renders as nav with aria-label', () => {
    render(<Breadcrumb items={items} />)
    const nav = screen.getByRole('navigation')
    expect(nav).toBeDefined()
    expect(nav.getAttribute('aria-label')).toBe('Breadcrumb')
  })

  it('renders all item labels', () => {
    render(<Breadcrumb items={items} />)
    expect(screen.getByText('Home')).toBeDefined()
    expect(screen.getByText('Products')).toBeDefined()
    expect(screen.getByText('Current Page')).toBeDefined()
  })

  it('renders links for non-current items', () => {
    render(<Breadcrumb items={items} />)
    const homeLink = screen.getByText('Home')
    expect(homeLink.tagName).toBe('A')
    expect(homeLink.getAttribute('href')).toBe('/')
  })

  it('renders current item as not a link', () => {
    render(<Breadcrumb items={items} />)
    const current = screen.getByText('Current Page')
    expect(current.tagName).toBe('SPAN')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Breadcrumb items={items} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
