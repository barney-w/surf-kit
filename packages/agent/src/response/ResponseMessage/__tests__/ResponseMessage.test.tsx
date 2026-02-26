import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import * as vitestAxe from 'vitest-axe/matchers'
import { axe } from 'vitest-axe'

import { ResponseMessage } from '../ResponseMessage'

expect.extend(vitestAxe)

describe('ResponseMessage', () => {
  it('renders plain text content', () => {
    render(<ResponseMessage content="Hello world" />)
    expect(screen.getByText('Hello world')).toBeDefined()
  })

  it('renders markdown bold text', () => {
    render(<ResponseMessage content="This is **bold** text" />)
    expect(screen.getByText('bold').tagName).toBe('STRONG')
  })

  it('renders markdown links', () => {
    render(<ResponseMessage content="[Click here](https://example.com)" />)
    const link = screen.getByText('Click here')
    expect(link.tagName).toBe('A')
    expect(link.getAttribute('href')).toBe('https://example.com')
  })

  it('sanitizes script tags', () => {
    const { container } = render(
      <ResponseMessage content={'Safe content\n\n<script>alert("xss")</script>'} />,
    )
    expect(container.querySelector('script')).toBeNull()
    expect(screen.getByText('Safe content')).toBeDefined()
  })

  it('sanitizes iframe tags', () => {
    const { container } = render(
      <ResponseMessage content={'Safe content\n\n<iframe src="https://evil.com"></iframe>'} />,
    )
    expect(container.querySelector('iframe')).toBeNull()
    expect(screen.getByText('Safe content')).toBeDefined()
  })

  it('renders lists', () => {
    const content = ['- Item 1', '- Item 2', '- Item 3'].join('\n')
    render(<ResponseMessage content={content} />)
    expect(screen.getByText('Item 1')).toBeDefined()
    expect(screen.getByText('Item 2')).toBeDefined()
    expect(screen.getByText('Item 3')).toBeDefined()
    expect(screen.getByRole('list')).toBeDefined()
  })

  it('normalizes compact inline lists from provider responses', () => {
    const content =
      'Employees are entitled to: - **Four weeks** (20 days) - Pro-rata for part-time staff'
    render(<ResponseMessage content={content} />)
    expect(screen.getByRole('list')).toBeDefined()
    expect(screen.getByText(/Four weeks/)).toBeDefined()
    expect(screen.getByText(/Pro-rata/)).toBeDefined()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <ResponseMessage content="This is a **test** with a [link](https://example.com)" />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
