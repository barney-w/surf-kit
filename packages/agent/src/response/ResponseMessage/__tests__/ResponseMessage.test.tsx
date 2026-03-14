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

  it('renders markdown italic text', () => {
    render(<ResponseMessage content="This is *italic* text" />)
    expect(screen.getByText('italic').tagName).toBe('EM')
  })

  it('renders horizontal rules', () => {
    const { container } = render(
      <ResponseMessage content={'Section one\n\n---\n\nSection two'} />,
    )
    expect(container.querySelector('hr')).not.toBeNull()
    expect(screen.getByText('Section one')).toBeDefined()
    expect(screen.getByText('Section two')).toBeDefined()
  })

  it('renders numbered lists', () => {
    const content = ['1. First step', '2. Second step', '3. Third step'].join('\n')
    render(<ResponseMessage content={content} />)
    expect(screen.getByText('First step')).toBeDefined()
    expect(screen.getByText('Second step')).toBeDefined()
    const lists = screen.getAllByRole('list')
    expect(lists.length).toBeGreaterThan(0)
  })

  it('renders headings', () => {
    render(<ResponseMessage content={'### My Heading\n\nSome content'} />)
    const heading = screen.getByText('My Heading')
    expect(heading.tagName).toBe('H3')
  })

  it('renders mixed formatting in a realistic agent response', () => {
    const content = [
      'To book a community venue:',
      '',
      '1. **Choose a room** — view photos and floorplans',
      '2. **Review fees** — check the fees and charges documents',
      '3. **Submit an enquiry** — complete the online form',
      '',
      'All bookings must be paid *before* confirmation.',
    ].join('\n')
    render(<ResponseMessage content={content} />)
    expect(screen.getByText(/Choose a room/).tagName).toBe('STRONG')
    expect(screen.getByText('before').tagName).toBe('EM')
    expect(screen.getByText(/All bookings/)).toBeDefined()
  })

  it('strips duplicate leading numbers from ordered list items', () => {
    // Some AI responses produce "1. 1. Step" where the first number becomes
    // the ol counter and the second stays as text — we strip the redundant one.
    const content = [
      '1. 1. Choose your event type',
      '2. 2. For attending events',
      '3. 3. For organising on council land',
    ].join('\n')
    render(<ResponseMessage content={content} />)
    expect(screen.getByText(/Choose your event type/)).toBeDefined()
    // Ensure the text does NOT start with "1."
    const item = screen.getByText(/Choose your event type/)
    expect(item.textContent).not.toMatch(/^\d+\./)
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <ResponseMessage content="This is a **test** with a [link](https://example.com)" />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
