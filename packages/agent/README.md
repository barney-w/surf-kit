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

**Streaming** — StreamingMessage, ThinkingIndicator, ToolExecution, RetrievalProgress, VerificationProgress, TypewriterText, TypingIndicator, TextGlimmer, StreamingList, StreamingStructure

**Trust & Confidence** — ConfidenceBadge, ConfidenceMeter, ConfidenceBreakdown, VerificationBadge, VerificationDetail

**Sources** — SourceCard, SourceList, SourceInline, SourceDrawer, SourceBadge

**Agent Identity** — AgentAvatar, AgentLabel, AgentHandoff, RoutingIndicator

**Feedback** — ThumbsFeedback, FeedbackDialog, FeedbackConfirmation

**Response** — AgentResponse, ResponseMessage, StructuredResponse, FollowUpChips, ErrorResponse

**Layouts** — AgentFullPage, AgentPanel, AgentWidget, AgentEmbed

**MCP** — MCPToolCall, MCPResourceView, MCPServerStatus, MCPApprovalDialog

**Hooks** (via `@surf-kit/agent/hooks`) — useAgentChat, useStreaming, useConversation, useFeedback, useAgentTheme, useCharacterDrain

## Subpath Exports

Import only what you need for smaller bundles:

```tsx
import { MessageThread } from '@surf-kit/agent/chat'
import { StreamingMessage } from '@surf-kit/agent/streaming'
import { MCPToolCall } from '@surf-kit/agent/mcp'
import { ConfidenceBadge } from '@surf-kit/agent/confidence'
import { SourceCard } from '@surf-kit/agent/sources'
import { AgentAvatar } from '@surf-kit/agent/agent-identity'
import { FollowUpChips } from '@surf-kit/agent/response'
import { AgentFullPage } from '@surf-kit/agent/layouts'
import { ThumbsFeedback } from '@surf-kit/agent/feedback'
```

## Docs

- [Storybook](https://barney-w.github.io/surf-kit/storybook)
- [Contributing](https://github.com/barney-w/surf-kit/blob/main/CONTRIBUTING.md)

## License

[Apache-2.0](./LICENSE)
