import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { DropdownMenu } from '../DropdownMenu'

const items = [
  { key: 'edit', label: 'Edit' },
  { key: 'delete', label: 'Delete' },
]

describe('DropdownMenu', () => {
  it('renders trigger without crashing', () => {
    render(<DropdownMenu trigger={<button type="button">Menu</button>} items={items} />)
    expect(screen.getByText('Menu')).toBeDefined()
  })

  it('opens menu on trigger click and shows items', async () => {
    render(
      <DropdownMenu
        trigger={<button type="button">Menu</button>}
        items={items}
        aria-label="Actions"
      />,
    )
    await userEvent.click(screen.getByText('Menu'))
    expect(screen.getByText('Edit')).toBeDefined()
    expect(screen.getByText('Delete')).toBeDefined()
  })
})
