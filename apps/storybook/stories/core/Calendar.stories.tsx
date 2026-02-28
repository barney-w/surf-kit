import type { Meta, StoryObj } from '@storybook/react'
import { Calendar } from '@surf-kit/core'

const meta: Meta<typeof Calendar> = {
  title: 'Core/Inputs/Calendar',
  component: Calendar,
  argTypes: {
    isDisabled: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof Calendar>

export const Default: Story = {
  args: {},
}

export const WithDefaultDate: Story = {
  args: {
    defaultValue: new Date(2024, 5, 15),
  },
}
