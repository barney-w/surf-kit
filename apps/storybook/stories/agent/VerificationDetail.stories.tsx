import type { Meta, StoryObj } from '@storybook/react'
import { VerificationDetail } from '@surf-kit/agent'

const meta: Meta<typeof VerificationDetail> = {
  title: 'Agent/VerificationDetail',
  component: VerificationDetail,
}
export default meta
type Story = StoryObj<typeof VerificationDetail>

export const PassedCollapsed: Story = {
  args: {
    verification: { status: 'passed', flags: [], claims_checked: 8, claims_verified: 8 },
  },
}

export const FlaggedExpanded: Story = {
  args: {
    verification: {
      status: 'flagged',
      flags: [
        'Claim about 5 weeks leave could not be verified',
        'Source date is older than 12 months',
      ],
      claims_checked: 8,
      claims_verified: 6,
    },
    defaultExpanded: true,
  },
}

export const FailedExpanded: Story = {
  args: {
    verification: {
      status: 'failed',
      flags: ['Primary claim contradicted by policy update'],
      claims_checked: 3,
      claims_verified: 0,
    },
    defaultExpanded: true,
  },
}
