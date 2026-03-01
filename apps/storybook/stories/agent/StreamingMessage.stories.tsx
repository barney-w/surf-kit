import type { Meta, StoryObj } from '@storybook/react'
import type { StreamState } from '@surf-kit/agent'
import { StreamingMessage } from '@surf-kit/agent'

const meta: Meta<typeof StreamingMessage> = {
  title: 'Agent/StreamingMessage',
  component: StreamingMessage,
}
export default meta
type Story = StoryObj<typeof StreamingMessage>

const _idleStream: StreamState = {
  active: false,
  phase: 'idle',
  content: '',
  sources: [],
  agent: null,
  agentLabel: null,
}

const thinkingStream: StreamState = {
  active: true,
  phase: 'thinking',
  content: '',
  sources: [],
  agent: null,
  agentLabel: null,
}

const generatingStream: StreamState = {
  active: true,
  phase: 'generating',
  content:
    'Based on the Enterprise Agreement 2024, all full-time employees are entitled to four weeks of paid annual leave per year of service.',
  sources: [],
  agent: null,
  agentLabel: null,
}

const verifyingStream: StreamState = {
  active: true,
  phase: 'verifying',
  content:
    'Based on the Enterprise Agreement 2024, all full-time employees are entitled to four weeks of paid annual leave per year of service. Part-time employees receive a pro-rata entitlement based on their ordinary hours.',
  sources: [],
  agent: null,
  agentLabel: null,
}

const completedStream: StreamState = {
  active: false,
  phase: 'idle',
  content:
    'Based on the Enterprise Agreement 2024, all full-time employees are entitled to four weeks of paid annual leave per year of service. Part-time employees receive a pro-rata entitlement based on their ordinary hours.',
  sources: [],
  agent: null,
  agentLabel: null,
}

export const Thinking: Story = {
  args: { stream: thinkingStream, showPhases: true },
}

export const Generating: Story = {
  args: { stream: generatingStream, showPhases: true },
}

export const Verifying: Story = {
  args: { stream: verifyingStream, showPhases: true },
}

export const Completed: Story = {
  args: { stream: completedStream, showPhases: true },
}

export const NoPhasesIndicator: Story = {
  args: { stream: generatingStream, showPhases: false },
}
