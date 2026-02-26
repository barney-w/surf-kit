import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { DropdownMenu } from '../DropdownMenu'

const items = [
  { key: 'edit', label: 'Edit' },
  { key: 'delete', label: 'Delete' },
]

describe('DropdownMenu', () => {
  it('renders trigger without crashing', () => {
    render(
      <DropdownMenu trigger={<button>Menu</button>} items={items} />,
    )
    expect(screen.getByText('Menu')).toBeDefined()
  })

  it('opens menu on trigger click and shows items', async () => {
    render(
      <DropdownMenu
        trigger={<button>Menu</button>}
        items={items}
        aria-label="Actions"
      />,
    )
    await userEvent.click(screen.getByText('Menu'))
    expect(screen.getByText('Edit')).toBeDefined()
    expect(screen.getByText('Delete')).toBeDefined()
  })
})
