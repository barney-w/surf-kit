import type { Meta, StoryObj } from '@storybook/react'
import { ResponseMessage } from '@surf-kit/agent'

const meta: Meta<typeof ResponseMessage> = {
  title: 'Agent/ResponseMessage',
  component: ResponseMessage,
}
export default meta
type Story = StoryObj<typeof ResponseMessage>

export const PlainText: Story = {
  args: { content: 'This is a plain text response from the agent.' },
}

export const WithMarkdown: Story = {
  args: {
    content: `# Annual Leave Policy

Based on the **Enterprise Agreement 2024**, all full-time employees are entitled to:

- **Four weeks** (20 days) of paid annual leave per year
- Pro-rata entitlements for part-time employees
- Leave requests should be submitted **at least two weeks** in advance

> Note: Leave accrues progressively during each year of service.

For more details, visit the [HR Portal](https://example.com).`,
  },
}

export const WithCodeBlock: Story = {
  args: {
    content: `Here is an example configuration:

\`\`\`json
{
  "leave_type": "annual",
  "days_entitled": 20,
  "applicable_to": "full-time"
}
\`\`\`

Apply these settings in your HR profile.`,
  },
}
