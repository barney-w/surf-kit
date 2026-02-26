import type { Meta, StoryObj } from '@storybook/react'
import { VerificationProgress } from '@surf-kit/agent'

const meta: Meta<typeof VerificationProgress> = {
  title: 'Agent/VerificationProgress',
  component: VerificationProgress,
}
export default meta
type Story = StoryObj<typeof VerificationProgress>

export const Active: Story = {
  args: { isActive: true },
}

export const CustomLabel: Story = {
  args: { isActive: true, label: 'Verifying claims...' },
}

export const Inactive: Story = {
  args: { isActive: false },
}
