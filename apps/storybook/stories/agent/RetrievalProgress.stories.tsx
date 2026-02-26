import type { Meta, StoryObj } from '@storybook/react'
import { RetrievalProgress } from '@surf-kit/agent'

const meta: Meta<typeof RetrievalProgress> = {
  title: 'Agent/RetrievalProgress',
  component: RetrievalProgress,
}
export default meta
type Story = StoryObj<typeof RetrievalProgress>

const sources = [
  {
    title: 'Enterprise Agreement 2024',
    section: 'Section 12',
    document_id: 'ea-2024-001',
    url: 'https://example.com/ea-2024',
    confidence: 0.95,
    snippet: 'Leave entitlements...',
  },
  {
    title: 'HR Policy Manual',
    section: 'Chapter 3',
    document_id: 'hr-001',
    url: 'https://example.com/hr',
    confidence: 0.82,
    snippet: 'Work from home policy...',
  },
  {
    title: 'Staff Handbook 2023',
    section: 'Section 5',
    document_id: 'sh-2023',
    url: 'https://example.com/sh',
    confidence: 0.71,
    snippet: 'Code of conduct...',
  },
]

export const Active: Story = {
  args: { sources: sources.slice(0, 2), isActive: true },
}

export const Completed: Story = {
  args: { sources, isActive: false },
}

export const Empty: Story = {
  args: { sources: [], isActive: true },
}
