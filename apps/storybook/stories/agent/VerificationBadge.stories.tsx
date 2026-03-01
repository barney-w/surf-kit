import type { Meta, StoryObj } from '@storybook/react'
import { VerificationBadge } from '@surf-kit/agent'

const meta: Meta<typeof VerificationBadge> = {
  title: 'Agent/VerificationBadge',
  component: VerificationBadge,
}
export default meta
type Story = StoryObj<typeof VerificationBadge>

export const Passed: Story = {
  args: {
    verification: { status: 'passed', flags: [], claims_checked: 5, claims_verified: 5 },
  },
}

export const Flagged: Story = {
  args: {
    verification: {
      status: 'flagged',
      flags: ['Outdated source'],
      claims_checked: 5,
      claims_verified: 3,
    },
  },
}

export const Failed: Story = {
  args: {
    verification: {
      status: 'failed',
      flags: ['Could not verify claim'],
      claims_checked: 5,
      claims_verified: 1,
    },
  },
}
