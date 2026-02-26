import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import * as vitestAxe from 'vitest-axe/matchers'
import { axe } from 'vitest-axe'

import { ConfidenceMeter } from '../ConfidenceMeter'

expect.extend(vitestAxe)

describe('ConfidenceMeter', () => {
  it('renders label', () => {
    render(<ConfidenceMeter value={0.75} label="Retrieval Quality" />)
    expect(screen.getByText('Retrieval Quality')).toBeDefined()
  })

  it('renders percentage', () => {
    render(<ConfidenceMeter value={0.75} label="Quality" />)
    expect(screen.getByText('75%')).toBeDefined()
  })

  it('has progressbar role', () => {
    render(<ConfidenceMeter value={0.6} label="Quality" />)
    expect(screen.getByRole('progressbar')).toBeDefined()
  })

  it('sets aria-valuenow correctly', () => {
    render(<ConfidenceMeter value={0.85} label="Quality" />)
    const bar = screen.getByRole('progressbar')
    expect(bar.getAttribute('aria-valuenow')).toBe('85')
  })

  it('clamps value above 1', () => {
    render(<ConfidenceMeter value={1.5} label="Quality" />)
    expect(screen.getByText('100%')).toBeDefined()
  })

  it('clamps value below 0', () => {
    render(<ConfidenceMeter value={-0.5} label="Quality" />)
    expect(screen.getByText('0%')).toBeDefined()
  })

  it('has descriptive aria-label', () => {
    render(<ConfidenceMeter value={0.6} label="Quality" />)
    const bar = screen.getByRole('progressbar')
    expect(bar.getAttribute('aria-label')).toBe('Quality: 60%')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <ConfidenceMeter value={0.75} label="Retrieval Quality" />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
