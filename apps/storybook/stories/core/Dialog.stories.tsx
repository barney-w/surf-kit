import type { Meta, StoryObj } from '@storybook/react'
import { Dialog } from '@surf-kit/core'
import { useState } from 'react'

const meta: Meta<typeof Dialog> = {
  title: 'Core/Dialog',
  component: Dialog,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'full'] },
  },
}
export default meta
type Story = StoryObj<typeof Dialog>

function DialogDemo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' | 'full' }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Open Dialog
      </button>
      <Dialog
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Example Dialog"
        size={size}
        footer={
          <>
            <button type="button" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button type="button" onClick={() => setOpen(false)}>
              Confirm
            </button>
          </>
        }
      >
        This is the dialog body content. You can put any React content here.
      </Dialog>
    </>
  )
}

export const Default: Story = {
  render: () => <DialogDemo />,
}

export const Small: Story = {
  render: () => <DialogDemo size="sm" />,
}

export const Large: Story = {
  render: () => <DialogDemo size="lg" />,
}
