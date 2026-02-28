import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { MessageComposer, WelcomeScreen } from '@surf-kit/agent'

/**
 * `AIChat` from `@surf-kit/ai` is a drop-in chat component powered by Vercel AI SDK v6.
 *
 * These stories demonstrate the visual layout using the underlying `@surf-kit/agent`
 * components. In production, `AIChat` connects to a `/api/chat` endpoint and handles
 * streaming automatically.
 *
 * ```tsx
 * import { AIChat } from '@surf-kit/ai'
 *
 * <AIChat api="/api/chat" title="Assistant" />
 * ```
 */
const meta: Meta = {
  title: 'AI/AIChat',
}
export default meta
type Story = StoryObj

function AIChatShell({
  title = 'Chat',
  welcomeMessage = 'How can I help you today?',
  suggestedQuestions = [] as string[],
  showHeader = true,
}: {
  title?: string
  welcomeMessage?: string
  suggestedQuestions?: string[]
  showHeader?: boolean
}) {
  return (
    <div className="flex flex-col h-[500px] bg-canvas border border-border rounded-xl overflow-hidden">
      {showHeader && (
        <div className="flex items-center justify-between border-b border-border px-4 py-3 bg-surface-raised shrink-0">
          <h1 className="text-base font-semibold text-text-primary">{title}</h1>
        </div>
      )}

      <WelcomeScreen
        title={title}
        message={welcomeMessage}
        suggestedQuestions={suggestedQuestions}
        onQuestionSelect={() => {}}
      />

      <MessageComposer onSend={() => {}} isLoading={false} />
    </div>
  )
}

export const Default: Story = {
  render: () => (
    <AIChatShell
      suggestedQuestions={[
        'What can you help me with?',
        'Tell me about your capabilities',
        'How do I get started?',
      ]}
    />
  ),
}

export const WithTitle: Story = {
  render: () => (
    <AIChatShell
      title="Research Assistant"
      welcomeMessage="I can help you find and summarize information."
      suggestedQuestions={[
        'Summarize recent papers on transformers',
        'Compare React and Vue',
      ]}
    />
  ),
}

export const MinimalConfig: Story = {
  render: () => <AIChatShell showHeader={false} />,
}
