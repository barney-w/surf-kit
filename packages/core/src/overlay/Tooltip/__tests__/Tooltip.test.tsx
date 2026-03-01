import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Tooltip } from '../Tooltip'

describe('Tooltip', () => {
  it('renders trigger without crashing', () => {
    render(
      <Tooltip content="Help text">
        <button type="button">Hover me</button>
      </Tooltip>,
    )
    expect(screen.getByText('Hover me')).toBeDefined()
  })

  it('does not show tooltip content by default', () => {
    render(
      <Tooltip content="Help text">
        <button type="button">Hover me</button>
      </Tooltip>,
    )
    expect(screen.queryByText('Help text')).toBeNull()
  })
})
