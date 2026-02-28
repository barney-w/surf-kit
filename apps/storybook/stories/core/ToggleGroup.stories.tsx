import type { Meta, StoryObj } from '@storybook/react'
import { Toggle, ToggleGroup } from '@surf-kit/core'
import React from 'react'

const meta: Meta<typeof ToggleGroup> = {
  title: 'Core/ToggleGroup',
  component: ToggleGroup,
}
export default meta
type Story = StoryObj<typeof ToggleGroup>

export const SingleSelect: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="bold">
      <Toggle value="bold">Bold</Toggle>
      <Toggle value="italic">Italic</Toggle>
      <Toggle value="underline">Underline</Toggle>
    </ToggleGroup>
  ),
}

export const MultipleSelect: Story = {
  render: () => (
    <ToggleGroup type="multiple" defaultValue={['bold']}>
      <Toggle value="bold">Bold</Toggle>
      <Toggle value="italic">Italic</Toggle>
      <Toggle value="underline">Underline</Toggle>
    </ToggleGroup>
  ),
}
