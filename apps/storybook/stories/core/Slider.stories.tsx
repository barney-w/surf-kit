import type { Meta, StoryObj } from '@storybook/react'
import { Slider } from '@surf-kit/core'

const meta: Meta<typeof Slider> = {
  title: 'Core/Inputs/Slider',
  component: Slider,
  argTypes: {
    label: { control: 'text' },
    minValue: { control: 'number' },
    maxValue: { control: 'number' },
    step: { control: 'number' },
    defaultValue: { control: 'number' },
    isDisabled: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof Slider>

export const Default: Story = {
  args: { label: 'Volume', defaultValue: 50 },
}

export const Range: Story = {
  args: { label: 'Price', minValue: 0, maxValue: 1000, step: 10, defaultValue: 500 },
}

export const Disabled: Story = {
  args: { label: 'Brightness', defaultValue: 75, isDisabled: true },
}
