import type { Meta, StoryObj } from '@storybook/react'
import { ToastProvider, useToast } from '@surf-kit/core'
import React from 'react'

function ToastDemo() {
  const toast = useToast()
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <button onClick={() => toast({ message: 'Info toast', intent: 'info' })}>
        Info Toast
      </button>
      <button onClick={() => toast({ message: 'Success!', intent: 'success' })}>
        Success Toast
      </button>
      <button onClick={() => toast({ message: 'Be careful', intent: 'warning' })}>
        Warning Toast
      </button>
      <button onClick={() => toast({ message: 'Something failed', intent: 'error' })}>
        Error Toast
      </button>
    </div>
  )
}

const meta: Meta = {
  title: 'Core/Toast',
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
}
export default meta

export const Default: StoryObj = {
  render: () => <ToastDemo />,
}
