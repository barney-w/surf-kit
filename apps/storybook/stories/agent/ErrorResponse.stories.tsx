import type { Meta, StoryObj } from '@storybook/react'
import { ErrorResponse } from '@surf-kit/agent'

const meta: Meta<typeof ErrorResponse> = {
  title: 'Agent/ErrorResponse',
  component: ErrorResponse,
}
export default meta
type Story = StoryObj<typeof ErrorResponse>

export const RetryableError: Story = {
  args: {
    error: {
      code: 'NETWORK_ERROR',
      message: 'Failed to connect to the server. Please check your network connection.',
      retryable: true,
    },
    onRetry: () => {},
  },
}

export const NonRetryableError: Story = {
  args: {
    error: {
      code: 'API_ERROR',
      message: 'Invalid API key. Please contact your administrator.',
      retryable: false,
    },
  },
}

export const TimeoutError: Story = {
  args: {
    error: {
      code: 'TIMEOUT',
      message: 'The request timed out. The server may be experiencing high load.',
      retryable: true,
    },
    onRetry: () => {},
  },
}
