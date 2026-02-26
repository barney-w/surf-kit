import type { Meta, StoryObj } from '@storybook/react'
import { StructuredResponse } from '@surf-kit/agent'

const meta: Meta<typeof StructuredResponse> = {
  title: 'Agent/StructuredResponse',
  component: StructuredResponse,
  argTypes: {
    uiHint: {
      control: 'select',
      options: ['text', 'table', 'card', 'list', 'steps', 'warning'],
    },
  },
}
export default meta
type Story = StoryObj<typeof StructuredResponse>

export const TextHint: Story = {
  args: {
    uiHint: 'text',
    data: { text: 'All full-time employees are entitled to four weeks of paid annual leave.' },
  },
}

export const TableHint: Story = {
  args: {
    uiHint: 'table',
    data: {
      columns: ['Type', 'Days', 'Applicable To'],
      rows: [
        { Type: 'Annual Leave', Days: '20', 'Applicable To': 'Full-time' },
        { Type: 'Personal Leave', Days: '10', 'Applicable To': 'All employees' },
        { Type: 'Parental Leave', Days: '52 weeks', 'Applicable To': 'Primary carer' },
      ],
    },
  },
}

export const KeyValueTable: Story = {
  args: {
    uiHint: 'table',
    data: {
      leave_entitlement_days: 20,
      leave_type: 'annual',
      applicable_to: 'full-time',
    },
  },
}

export const JsonFallback: Story = {
  args: {
    uiHint: 'card',
    data: {
      leave_entitlement_days: 20,
      leave_type: 'annual',
      applicable_to: 'full-time',
    },
  },
}
