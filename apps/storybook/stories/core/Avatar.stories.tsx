import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from '@surf-kit/core'
import React from 'react'

const meta: Meta<typeof Avatar> = {
  title: 'Core/Feedback/Avatar',
  component: Avatar,
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  },
}
export default meta
type Story = StoryObj<typeof Avatar>

export const WithImage: Story = {
  args: { src: 'https://i.pravatar.cc/150', alt: 'User avatar', size: 'lg' },
}
export const WithInitials: Story = {
  args: { name: 'John Doe', size: 'lg' },
}
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Avatar name="AB" size="xs" />
      <Avatar name="AB" size="sm" />
      <Avatar name="AB" size="md" />
      <Avatar name="AB" size="lg" />
      <Avatar name="AB" size="xl" />
    </div>
  ),
}
export const Fallback: Story = { args: { size: 'lg' } }
