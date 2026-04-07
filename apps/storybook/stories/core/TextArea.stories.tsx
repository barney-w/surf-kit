import type { Meta, StoryObj } from '@storybook/react'
import { TextArea } from '@surf-kit/core'

const meta: Meta<typeof TextArea> = {
  title: 'Core/TextArea',
  component: TextArea,
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    errorMessage: { control: 'text' },
    placeholder: { control: 'text' },

    // Optional props
    value: { control: 'text' },
    onChange: { action: 'onChange' }, // logs the value string when user types (for uncontrolled stories)

    isDisabled: { control: 'boolean' },
    isRequired: { control: 'boolean' },

    rows: { control: { type: 'number', min: 1, max: 12, step: 1 } },
    className: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof TextArea>

export const Default: Story = {
  args: {
    label: 'Message',
    placeholder: 'Type your message…',
  },
}

export const WithDescription: Story = {
  args: {
    label: 'Message',
    placeholder: 'Type your message…',
    description: 'Add any extra context you think is helpful.',
  },
}

export const WithError: Story = {
  args: {
    label: 'Message',
    placeholder: 'Type your message…',
    errorMessage: 'Message is required.',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Message',
    placeholder: 'Type your message…',
    isDisabled: true,
  },
}

export const Required: Story = {
  args: {
    label: 'Message',
    placeholder: 'Type your message…',
    isRequired: true,
  },
}

export const MoreRows: Story = {
  args: {
    label: 'Detailed feedback',
    placeholder: 'Write a few paragraphs…',
    rows: 6,
  },
}

/**
 * Controlled example: interactive typing while using `value` prop.
 * This avoids the “can’t type” issue you get when `value` is set but not updated.
 */
export const ControlledValue: Story = {
  args: {
    label: 'Notes',
    placeholder: 'Type here…',
    value: 'Initial value you can edit',
    rows: 4,
  },
  render: (args) => {
    const [val, setVal] = React.useState(args.value ?? '')

    // keep local state in sync if someone edits args in the Controls panel
    React.useEffect(() => {
      setVal(args.value ?? '')
    }, [args.value])

    return <TextArea {...args} value={val} onChange={setVal} />
  },
}