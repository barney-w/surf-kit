import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '@surf-kit/core'

const meta: Meta<typeof Badge> = {
  title: 'Core/Badge',
  component: Badge,
  argTypes: {
    intent: { control: 'select', options: ['default', 'success', 'warning', 'error', 'info'] },
    size: { control: 'select', options: ['sm', 'md'] },
  },
}
export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = { args: { children: 'Default' } }
export const Success: Story = { args: { children: 'Success', intent: 'success' } }
export const Warning: Story = { args: { children: 'Warning', intent: 'warning' } }
export const Error: Story = { args: { children: 'Error', intent: 'error' } }
export const Info: Story = { args: { children: 'Info', intent: 'info' } }
export const Small: Story = { args: { children: 'Small', size: 'sm' } }
