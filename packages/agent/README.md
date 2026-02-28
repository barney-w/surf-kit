# @surf-kit/agent

> AI agent interface components — the building blocks no other design system has

Part of the [surf-kit](https://github.com/barney-w/surf-kit) design system.

## Install

```bash
npm install @surf-kit/agent @surf-kit/core @surf-kit/theme @surf-kit/tokens
```

## Quick Example

```tsx
import { ThemeProvider } from '@surf-kit/theme';
import { AgentChat } from '@surf-kit/agent';
import '@surf-kit/tokens/css';

function App() {
  return (
    <ThemeProvider>
      <AgentChat
        agentName="Assistant"
        messages={messages}
        onSend={handleSend}
      />
    </ThemeProvider>
  );
}
```

## What's Included

**Chat** — AgentChat, MessageThread, MessageBubble, MessageComposer, WelcomeScreen, ConversationList

**Streaming** — StreamingMessage, ThinkingIndicator, ToolExecution, RetrievalProgress, VerificationProgress, TypewriterText

**Trust & Confidence** — ConfidenceBadge, ConfidenceMeter, ConfidenceBreakdown, VerificationBadge, VerificationDetail

**Sources** — SourceCard, SourceList, SourceInline, SourceDrawer, SourceBadge

**Agent Identity** — AgentAvatar, AgentLabel, AgentHandoff, RoutingIndicator

**Feedback** — ThumbsFeedback, FeedbackDialog, FeedbackConfirmation

**Response** — AgentResponse, ResponseMessage, StructuredResponse, FollowUpChips, ErrorResponse

**Layouts** — AgentFullPage, AgentPanel, AgentWidget, AgentEmbed

**Hooks** (via `@surf-kit/agent/hooks`) — useAgentChat, useStreaming, useConversation, useFeedback, useAgentTheme, useCharacterDrain

## Docs

- [Storybook](https://barney-w.github.io/surf-kit/storybook)
- [Contributing](https://github.com/barney-w/surf-kit/blob/main/CONTRIBUTING.md)

## License

[0BSD](./LICENSE)
