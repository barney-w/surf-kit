import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Button } from '../Button'

describe('Button', () => {
  it('renders without crashing', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeDefined()
  })

  it('applies className prop', () => {
    render(<Button className="custom">Test</Button>)
    expect(screen.getByRole('button').className).toContain('custom')
  })

  it('renders all intent variants', () => {
    const { unmount: u1 } = render(<Button intent="primary">P</Button>)
    expect(screen.getByRole('button')).toBeDefined()
    u1()

    const { unmount: u2 } = render(<Button intent="secondary">S</Button>)
    expect(screen.getByRole('button')).toBeDefined()
    u2()

    const { unmount: u3 } = render(<Button intent="ghost">G</Button>)
    expect(screen.getByRole('button')).toBeDefined()
    u3()

    render(<Button intent="danger">D</Button>)
    expect(screen.getByRole('button')).toBeDefined()
  })

  it('renders all size variants', () => {
    const { unmount: u1 } = render(<Button size="sm">S</Button>)
    expect(screen.getByRole('button')).toBeDefined()
    u1()

    const { unmount: u2 } = render(<Button size="md">M</Button>)
    expect(screen.getByRole('button')).toBeDefined()
    u2()

    render(<Button size="lg">L</Button>)
    expect(screen.getByRole('button')).toBeDefined()
  })

  it('handles disabled state', () => {
    render(<Button isDisabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('fires onPress', async () => {
    const handler = vi.fn()
    render(<Button onPress={handler}>Press</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(handler).toHaveBeenCalledTimes(1)
  })
})
