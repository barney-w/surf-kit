import type { Meta, StoryObj } from '@storybook/react'
import { Toggle } from '@surf-kit/core'

const meta: Meta<typeof Toggle> = {
  title: 'Core/Toggle',
  component: Toggle,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    isSelected: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof Toggle>

export const Default: Story = {
  args: { children: 'Bold' },
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Toggle size="sm">Small</Toggle>
      <Toggle size="md">Medium</Toggle>
      <Toggle size="lg">Large</Toggle>
    </div>
  ),
}

export const Disabled: Story = {
  args: { children: 'Disabled', isDisabled: true },
}
