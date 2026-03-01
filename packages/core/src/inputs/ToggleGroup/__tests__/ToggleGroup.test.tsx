import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Toggle } from '../../Toggle/Toggle'
import { ToggleGroup } from '../ToggleGroup'

describe('ToggleGroup', () => {
  it('renders children in a group', () => {
    render(
      <ToggleGroup type="single">
        <Toggle value="bold">Bold</Toggle>
        <Toggle value="italic">Italic</Toggle>
      </ToggleGroup>,
    )
    expect(screen.getByRole('group')).toBeDefined()
    expect(screen.getByRole('button', { name: 'Bold' })).toBeDefined()
    expect(screen.getByRole('button', { name: 'Italic' })).toBeDefined()
  })

  it('single select mode allows only one at a time', async () => {
    const user = userEvent.setup()
    render(
      <ToggleGroup type="single" defaultValue="bold">
        <Toggle value="bold">Bold</Toggle>
        <Toggle value="italic">Italic</Toggle>
      </ToggleGroup>,
    )
    const bold = screen.getByRole('button', { name: 'Bold' })
    const italic = screen.getByRole('button', { name: 'Italic' })

    expect(bold.getAttribute('aria-pressed')).toBe('true')
    expect(italic.getAttribute('aria-pressed')).toBe('false')

    await user.click(italic)
    expect(bold.getAttribute('aria-pressed')).toBe('false')
    expect(italic.getAttribute('aria-pressed')).toBe('true')
  })

  it('multiple select mode allows many selections', async () => {
    const user = userEvent.setup()
    render(
      <ToggleGroup type="multiple" defaultValue={[]}>
        <Toggle value="bold">Bold</Toggle>
        <Toggle value="italic">Italic</Toggle>
        <Toggle value="underline">Underline</Toggle>
      </ToggleGroup>,
    )
    const bold = screen.getByRole('button', { name: 'Bold' })
    const italic = screen.getByRole('button', { name: 'Italic' })

    await user.click(bold)
    await user.click(italic)
    expect(bold.getAttribute('aria-pressed')).toBe('true')
    expect(italic.getAttribute('aria-pressed')).toBe('true')

    await user.click(bold)
    expect(bold.getAttribute('aria-pressed')).toBe('false')
    expect(italic.getAttribute('aria-pressed')).toBe('true')
  })

  it('supports controlled mode (value + onValueChange)', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    const { rerender } = render(
      <ToggleGroup type="single" value="bold" onValueChange={onValueChange}>
        <Toggle value="bold">Bold</Toggle>
        <Toggle value="italic">Italic</Toggle>
      </ToggleGroup>,
    )
    const italic = screen.getByRole('button', { name: 'Italic' })
    await user.click(italic)
    expect(onValueChange).toHaveBeenCalledWith('italic')

    rerender(
      <ToggleGroup type="single" value="italic" onValueChange={onValueChange}>
        <Toggle value="bold">Bold</Toggle>
        <Toggle value="italic">Italic</Toggle>
      </ToggleGroup>,
    )
    expect(italic.getAttribute('aria-pressed')).toBe('true')
  })

  it('disables all toggles when group isDisabled', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <ToggleGroup type="single" isDisabled onValueChange={onValueChange}>
        <Toggle value="bold">Bold</Toggle>
        <Toggle value="italic">Italic</Toggle>
      </ToggleGroup>,
    )
    await user.click(screen.getByRole('button', { name: 'Bold' }))
    expect(onValueChange).not.toHaveBeenCalled()
  })
})
