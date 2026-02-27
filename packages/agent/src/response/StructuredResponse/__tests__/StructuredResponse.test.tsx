import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import * as vitestAxe from 'vitest-axe/matchers'
import { axe } from 'vitest-axe'

import { StructuredResponse } from '../StructuredResponse'

expect.extend(vitestAxe)

describe('StructuredResponse', () => {
  it('renders null when data is null', () => {
    const { container } = render(
      <StructuredResponse uiHint="text" data={null} />,
    )
    expect(container.firstChild).toBeNull()
  })

  it('renders text hint as paragraph', () => {
    render(
      <StructuredResponse uiHint="text" data={{ text: 'Hello world' }} />,
    )
    expect(screen.getByTestId('structured-text')).toBeDefined()
    expect(screen.getByText('Hello world')).toBeDefined()
  })

  it('renders table hint with key-value data', () => {
    render(
      <StructuredResponse
        uiHint="table"
        data={{ name: 'John', age: 30 }}
      />,
    )
    expect(screen.getByRole('table')).toBeDefined()
    expect(screen.getByText('name')).toBeDefined()
    expect(screen.getByText('John')).toBeDefined()
  })

  it('renders table hint with rows and columns', () => {
    render(
      <StructuredResponse
        uiHint="table"
        data={{
          columns: ['Name', 'Age'],
          rows: [
            { Name: 'Alice', Age: 25 },
            { Name: 'Bob', Age: 30 },
          ],
        }}
      />,
    )
    expect(screen.getByRole('table')).toBeDefined()
    expect(screen.getByText('Alice')).toBeDefined()
    expect(screen.getByText('Bob')).toBeDefined()
  })

  it('renders nothing for unknown hints', () => {
    const { container } = render(
      <StructuredResponse
        uiHint={'unknown' as any}
        data={{ key: 'value' }}
      />,
    )
    expect(container.firstChild).toBeNull()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <StructuredResponse
        uiHint="table"
        data={{ name: 'John', age: 30 }}
      />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
