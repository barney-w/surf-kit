import type { Meta, StoryObj } from '@storybook/react'
import { Table } from '@surf-kit/core'
import React, { useState } from 'react'

const meta: Meta<typeof Table> = {
  title: 'Core/Table',
  component: Table,
}
export default meta
type Story = StoryObj<typeof Table>

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role', sortable: true },
]

const rows = [
  { name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
  { name: 'Bob Smith', email: 'bob@example.com', role: 'User' },
  { name: 'Carol White', email: 'carol@example.com', role: 'Editor' },
]

export const Default: Story = {
  render: () => <Table columns={columns} rows={rows} />,
}

export const Sortable: Story = {
  render: () => {
    const [sort, setSort] = useState<{ column: string; direction: 'ascending' | 'descending' }>({
      column: 'name',
      direction: 'ascending',
    })
    return (
      <Table columns={columns} rows={rows} sortDescriptor={sort} onSortChange={setSort} />
    )
  },
}
