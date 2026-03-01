import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { IconButton } from '../IconButton'

describe('IconButton', () => {
  it('renders without crashing', () => {
    render(<IconButton aria-label="Close">X</IconButton>)
    expect(screen.getByRole('button', { name: 'Close' })).toBeDefined()
  })

  it('applies className prop', () => {
    render(
      <IconButton aria-label="Close" className="custom">
        X
      </IconButton>,
    )
    expect(screen.getByRole('button').className).toContain('custom')
  })

  it('renders all intent variants', () => {
    const intents = ['primary', 'secondary', 'ghost', 'danger'] as const
    for (const intent of intents) {
      const { unmount } = render(
        <IconButton aria-label="Action" intent={intent}>
          X
        </IconButton>,
      )
      expect(screen.getByRole('button')).toBeDefined()
      unmount()
    }
  })

  it('renders all size variants', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const size of sizes) {
      const { unmount } = render(
        <IconButton aria-label="Action" size={size}>
          X
        </IconButton>,
      )
      expect(screen.getByRole('button')).toBeDefined()
      unmount()
    }
  })

  it('handles disabled state', () => {
    render(
      <IconButton aria-label="Close" isDisabled>
        X
      </IconButton>,
    )
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('fires onPress', async () => {
    const handler = vi.fn()
    render(
      <IconButton aria-label="Close" onPress={handler}>
        X
      </IconButton>,
    )
    await userEvent.click(screen.getByRole('button'))
    expect(handler).toHaveBeenCalledTimes(1)
  })
})
