import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@surf-kit/core'

const meta: Meta<typeof Button> = {
  title: 'Core/Button',
  component: Button,
  argTypes: {
    intent: { control: 'select', options: ['primary', 'secondary', 'ghost', 'danger'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    isDisabled: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = { args: { children: 'Button' } }
export const Primary: Story = { args: { children: 'Primary', intent: 'primary' } }
export const Secondary: Story = { args: { children: 'Secondary', intent: 'secondary' } }
export const Ghost: Story = { args: { children: 'Ghost', intent: 'ghost' } }
export const Danger: Story = { args: { children: 'Danger', intent: 'danger' } }
export const Disabled: Story = { args: { children: 'Disabled', isDisabled: true } }
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}
