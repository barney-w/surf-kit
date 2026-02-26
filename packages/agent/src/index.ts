// Types
export type {
  Source,
  ConfidenceBreakdown,
  VerificationResult,
  AgentResponse,
  AgentInfo,
} from './types/agent'

export type { ChatMessage, ConversationSummary, ChatError } from './types/chat'

export type { StreamEvent, StreamState } from './types/streaming'

export type { AgentChatConfig } from './types/config'

// Hooks
export { useAgentChat } from './hooks/useAgentChat'
export type { AgentChatState, AgentChatActions } from './hooks/useAgentChat'

export { useStreaming } from './hooks/useStreaming'
export type { UseStreamingOptions } from './hooks/useStreaming'

export { useConversation } from './hooks/useConversation'
export type { Conversation, UseConversationOptions } from './hooks/useConversation'

export { useFeedback } from './hooks/useFeedback'
export type { FeedbackState, UseFeedbackOptions, FeedbackPayload } from './hooks/useFeedback'

export { useAgentTheme } from './hooks/useAgentTheme'
export type { AgentThemeResult } from './hooks/useAgentTheme'

// Chat Components
export { AgentChat } from './chat/AgentChat'
export type { AgentChatProps } from './chat/AgentChat'

export { MessageThread } from './chat/MessageThread'
export type { MessageThreadProps } from './chat/MessageThread'

export { MessageBubble } from './chat/MessageBubble'
export type { MessageBubbleProps } from './chat/MessageBubble'

export { MessageComposer } from './chat/MessageComposer'
export type { MessageComposerProps } from './chat/MessageComposer'

export { WelcomeScreen } from './chat/WelcomeScreen'
export type { WelcomeScreenProps } from './chat/WelcomeScreen'

// Response Components
export { AgentResponse as AgentResponseView } from './response/AgentResponse'
export type { AgentResponseProps } from './response/AgentResponse'

export { ResponseMessage } from './response/ResponseMessage'
export type { ResponseMessageProps } from './response/ResponseMessage'

export { StructuredResponse } from './response/StructuredResponse'
export type { StructuredResponseProps } from './response/StructuredResponse'

export { FollowUpChips } from './response/FollowUpChips'
export type { FollowUpChipsProps } from './response/FollowUpChips'

export { ErrorResponse } from './response/ErrorResponse'
export type { ErrorResponseProps } from './response/ErrorResponse'

// Source Components
export { SourceCard } from './sources/SourceCard'
export type { SourceCardProps } from './sources/SourceCard'

export { SourceList } from './sources/SourceList'
export type { SourceListProps } from './sources/SourceList'

export { SourceInline } from './sources/SourceInline'
export type { SourceInlineProps } from './sources/SourceInline'

export { SourceDrawer } from './sources/SourceDrawer'
export type { SourceDrawerProps } from './sources/SourceDrawer'

export { SourceBadge } from './sources/SourceBadge'
export type { SourceBadgeProps } from './sources/SourceBadge'
