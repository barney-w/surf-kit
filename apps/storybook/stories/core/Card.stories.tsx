import type { Meta, StoryObj } from '@storybook/react'
import { Card } from '@surf-kit/core'
import React from 'react'

const meta: Meta<typeof Card> = {
  title: 'Core/Card',
  component: Card,
  argTypes: {
    variant: { control: 'select', options: ['default', 'elevated', 'outlined'] },
  },
}
export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: () => (
    <Card>
      <Card.Header>Card Title</Card.Header>
      <Card.Body>This is the card body content.</Card.Body>
      <Card.Footer>Card Footer</Card.Footer>
    </Card>
  ),
}

export const Elevated: Story = {
  render: () => (
    <Card variant="elevated">
      <Card.Header>Elevated Card</Card.Header>
      <Card.Body>This card has a shadow instead of a border.</Card.Body>
    </Card>
  ),
}

export const Outlined: Story = {
  render: () => (
    <Card variant="outlined">
      <Card.Header>Outlined Card</Card.Header>
      <Card.Body>This card has a thicker border and transparent background.</Card.Body>
    </Card>
  ),
}
