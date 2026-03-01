import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ProgressBar } from '../ProgressBar'

describe('ProgressBar', () => {
  it('renders without crashing', () => {
    render(<ProgressBar value={50} label="Loading" />)
    expect(screen.getByRole('progressbar')).toBeDefined()
  })

  it('displays label and percentage', () => {
    render(<ProgressBar value={75} label="Upload" />)
    expect(screen.getByText('Upload')).toBeDefined()
    expect(screen.getByText('75%')).toBeDefined()
  })

  it('clamps value between 0 and 100', () => {
    const { container: _container } = render(<ProgressBar value={150} label="Over" />)
    expect(screen.getByText('100%')).toBeDefined()
  })
})
