import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import * as vitestAxe from 'vitest-axe/matchers'
import { axe } from 'vitest-axe'

import { Table } from '../Table'

expect.extend(vitestAxe)

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role', sortable: true },
]

const rows = [
  { name: 'Alice', email: 'alice@example.com', role: 'Admin' },
  { name: 'Bob', email: 'bob@example.com', role: 'User' },
]

describe('Table', () => {
  it('renders column headers', () => {
    render(<Table columns={columns} rows={rows} />)
    expect(screen.getByText('Name')).toBeDefined()
    expect(screen.getByText('Email')).toBeDefined()
    expect(screen.getByText('Role')).toBeDefined()
  })

  it('renders row data', () => {
    render(<Table columns={columns} rows={rows} />)
    expect(screen.getByText('Alice')).toBeDefined()
    expect(screen.getByText('bob@example.com')).toBeDefined()
  })

  it('renders column headers with columnheader role', () => {
    render(<Table columns={columns} rows={rows} />)
    expect(screen.getAllByRole('columnheader')).toHaveLength(3)
  })

  it('renders grid cells', () => {
    render(<Table columns={columns} rows={rows} />)
    expect(screen.getAllByRole('gridcell')).toHaveLength(6)
  })

  it('calls onSortChange when sortable column header is clicked', async () => {
    const onSortChange = vi.fn()
    const user = userEvent.setup()
    render(<Table columns={columns} rows={rows} onSortChange={onSortChange} />)
    await user.click(screen.getByText('Name'))
    expect(onSortChange).toHaveBeenCalledWith({
      column: 'name',
      direction: 'ascending',
    })
  })

  it('toggles sort direction', async () => {
    const onSortChange = vi.fn()
    const user = userEvent.setup()
    render(
      <Table
        columns={columns}
        rows={rows}
        sortDescriptor={{ column: 'name', direction: 'ascending' }}
        onSortChange={onSortChange}
      />,
    )
    await user.click(screen.getByText('Name'))
    expect(onSortChange).toHaveBeenCalledWith({
      column: 'name',
      direction: 'descending',
    })
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Table columns={columns} rows={rows} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
