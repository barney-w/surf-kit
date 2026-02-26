import type { Meta, StoryObj } from '@storybook/react'
import { FollowUpChips } from '@surf-kit/agent'

const meta: Meta<typeof FollowUpChips> = {
  title: 'Agent/FollowUpChips',
  component: FollowUpChips,
}
export default meta
type Story = StoryObj<typeof FollowUpChips>

export const Default: Story = {
  args: {
    suggestions: [
      'How do I apply for annual leave?',
      'What happens to unused annual leave?',
      'Can I cash out my annual leave?',
    ],
    onSelect: () => {},
  },
}

export const ManySuggestions: Story = {
  args: {
    suggestions: [
      'Suggestion 1',
      'Suggestion 2',
      'Suggestion 3',
      'Suggestion 4',
      'Suggestion 5',
      'Suggestion 6',
      'A much longer suggestion that tests overflow behavior',
    ],
    onSelect: () => {},
  },
}
