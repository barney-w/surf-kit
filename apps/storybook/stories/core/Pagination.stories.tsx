import type { Meta, StoryObj } from '@storybook/react'
import { Pagination } from '@surf-kit/core'
import React, { useState } from 'react'

const meta: Meta<typeof Pagination> = {
  title: 'Core/Navigation/Pagination',
  component: Pagination,
}
export default meta
type Story = StoryObj<typeof Pagination>

export const Default: Story = {
  render: () => {
    const [page, setPage] = useState(1)
    return <Pagination totalPages={10} currentPage={page} onPageChange={setPage} />
  },
}

export const ManyPages: Story = {
  render: () => {
    const [page, setPage] = useState(5)
    return <Pagination totalPages={20} currentPage={page} onPageChange={setPage} />
  },
}

export const FewPages: Story = {
  args: { totalPages: 3, currentPage: 1, onPageChange: () => {} },
}
