import type { Meta, StoryObj } from '@storybook/react'
import { WelcomeScreen } from '@surf-kit/agent'

const meta: Meta<typeof WelcomeScreen> = {
  title: 'Agent/WelcomeScreen',
  component: WelcomeScreen,
}
export default meta
type Story = StoryObj<typeof WelcomeScreen>

export const Default: Story = {
  args: {},
}

export const WithSuggestions: Story = {
  args: {
    title: 'Research Assistant',
    message: 'I can help you find and analyze information.',
    suggestedQuestions: [
      'What are the latest trends?',
      'Summarize this document',
      'Compare these two topics',
    ],
    onQuestionSelect: () => {},
  },
}

export const Custom: Story = {
  args: {
    title: 'Support Bot',
    message: 'Need help? I am here for you.',
    suggestedQuestions: ['Reset password', 'Billing question', 'Report a bug'],
    onQuestionSelect: () => {},
  },
}
