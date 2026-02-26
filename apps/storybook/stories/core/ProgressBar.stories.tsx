import type { Meta, StoryObj } from '@storybook/react'
import { ProgressBar } from '@surf-kit/core'

const meta: Meta<typeof ProgressBar> = {
  title: 'Core/ProgressBar',
  component: ProgressBar,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    value: { control: { type: 'range', min: 0, max: 100 } },
  },
}
export default meta
type Story = StoryObj<typeof ProgressBar>

export const Default: Story = {
  args: { value: 50, label: 'Loading' },
}

export const Small: Story = {
  args: { value: 70, label: 'Upload', size: 'sm' },
}

export const Complete: Story = {
  args: { value: 100, label: 'Done' },
}

export const Empty: Story = {
  args: { value: 0, label: 'Waiting' },
}
