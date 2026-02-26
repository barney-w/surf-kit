import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import * as vitestAxe from 'vitest-axe/matchers'
import { axe } from 'vitest-axe'

import { SourceBadge } from '../SourceBadge'

expect.extend(vitestAxe)

describe('SourceBadge', () => {
  it('renders "N sources" text', () => {
    render(<SourceBadge count={3} />)
    expect(screen.getByText('3 sources')).toBeDefined()
  })

  it('renders singular "source" for count of 1', () => {
    render(<SourceBadge count={1} />)
    expect(screen.getByText('1 source')).toBeDefined()
  })

  it('renders nothing when count is 0', () => {
    const { container } = render(<SourceBadge count={0} />)
    expect(container.firstChild).toBeNull()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<SourceBadge count={5} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
