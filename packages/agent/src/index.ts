// Types

export type { AgentAvatarProps } from './agent-identity/AgentAvatar'
// Agent Identity Components
export { AgentAvatar } from './agent-identity/AgentAvatar'
export type { AgentHandoffProps } from './agent-identity/AgentHandoff'
export { AgentHandoff } from './agent-identity/AgentHandoff'
export type { AgentLabelProps } from './agent-identity/AgentLabel'
export { AgentLabel } from './agent-identity/AgentLabel'
export type { RoutingIndicatorProps } from './agent-identity/RoutingIndicator'
export { RoutingIndicator } from './agent-identity/RoutingIndicator'
export type { AgentChatProps } from './chat/AgentChat'
// Chat Components
export { AgentChat } from './chat/AgentChat'
export type { ConversationListProps } from './chat/ConversationList'
// Conversation Components
export { ConversationList } from './chat/ConversationList'
export type { MessageBubbleProps } from './chat/MessageBubble'
export { MessageBubble } from './chat/MessageBubble'
export type { MessageComposerProps } from './chat/MessageComposer'
export { MessageComposer } from './chat/MessageComposer'
export type { MessageThreadProps } from './chat/MessageThread'
export { MessageThread } from './chat/MessageThread'
export type { WelcomeScreenProps } from './chat/WelcomeScreen'

export { WelcomeScreen } from './chat/WelcomeScreen'
export type { ConfidenceBadgeProps } from './confidence/ConfidenceBadge'
// Confidence Components
export { ConfidenceBadge } from './confidence/ConfidenceBadge'
export type { ConfidenceBreakdownProps } from './confidence/ConfidenceBreakdown'
export { ConfidenceBreakdown as ConfidenceBreakdownView } from './confidence/ConfidenceBreakdown'
export type { ConfidenceMeterProps } from './confidence/ConfidenceMeter'
export { ConfidenceMeter } from './confidence/ConfidenceMeter'
export type { VerificationBadgeProps } from './confidence/VerificationBadge'
// Verification Components
export { VerificationBadge } from './confidence/VerificationBadge'
export type { VerificationDetailProps } from './confidence/VerificationDetail'
export { VerificationDetail } from './confidence/VerificationDetail'
export type { FeedbackConfirmationProps } from './feedback/FeedbackConfirmation'
export { FeedbackConfirmation } from './feedback/FeedbackConfirmation'
export type { FeedbackDialogProps } from './feedback/FeedbackDialog'
export { FeedbackDialog } from './feedback/FeedbackDialog'
export type { FeedbackRating, ThumbsFeedbackProps } from './feedback/ThumbsFeedback'
// Feedback Components
export { ThumbsFeedback } from './feedback/ThumbsFeedback'
// Hook types (runtime hooks available via '@surf-kit/agent/hooks')
export type { AgentChatActions, AgentChatState } from './hooks/useAgentChat'
export type { AgentThemeResult } from './hooks/useAgentTheme'
export type { CharacterDrainResult } from './hooks/useCharacterDrain'
export type { Conversation, UseConversationOptions } from './hooks/useConversation'
export type { FeedbackPayload, FeedbackState, UseFeedbackOptions } from './hooks/useFeedback'
export type { UseStreamingOptions } from './hooks/useStreaming'
export type { AgentEmbedProps } from './layouts/AgentEmbed'
export { AgentEmbed } from './layouts/AgentEmbed'
export type { AgentFullPageProps } from './layouts/AgentFullPage'
// Layout Components
export { AgentFullPage } from './layouts/AgentFullPage'
export type { AgentPanelProps } from './layouts/AgentPanel'
export { AgentPanel } from './layouts/AgentPanel'
export type { AgentWidgetProps } from './layouts/AgentWidget'
export { AgentWidget } from './layouts/AgentWidget'
export type { MCPApprovalDialogProps } from './mcp/MCPApprovalDialog'
export { MCPApprovalDialog } from './mcp/MCPApprovalDialog'
export type { MCPResourceViewProps } from './mcp/MCPResourceView'
export { MCPResourceView } from './mcp/MCPResourceView'
export type { MCPServerStatusProps } from './mcp/MCPServerStatus'
export { MCPServerStatus } from './mcp/MCPServerStatus'
export type { MCPToolCallProps } from './mcp/MCPToolCall'
// MCP Components
export { MCPToolCall } from './mcp/MCPToolCall'
export type { AgentResponseProps } from './response/AgentResponse'
// Response Components
export { AgentResponse as AgentResponseView } from './response/AgentResponse'
export type { ErrorResponseProps } from './response/ErrorResponse'
export { ErrorResponse } from './response/ErrorResponse'
export type { FollowUpChipsProps } from './response/FollowUpChips'
export { FollowUpChips } from './response/FollowUpChips'
export type { ResponseMessageProps } from './response/ResponseMessage'
export { ResponseMessage } from './response/ResponseMessage'
export type { StructuredResponseProps } from './response/StructuredResponse'
export { StructuredResponse } from './response/StructuredResponse'
export type { SourceBadgeProps } from './sources/SourceBadge'
export { SourceBadge } from './sources/SourceBadge'
export type { SourceCardProps } from './sources/SourceCard'
// Source Components
export { SourceCard } from './sources/SourceCard'
export type { SourceDrawerProps } from './sources/SourceDrawer'
export { SourceDrawer } from './sources/SourceDrawer'
export type { SourceInlineProps } from './sources/SourceInline'
export { SourceInline } from './sources/SourceInline'
export type { SourceListProps } from './sources/SourceList'
export { SourceList } from './sources/SourceList'
export type { RetrievalProgressProps } from './streaming/RetrievalProgress'
export { RetrievalProgress } from './streaming/RetrievalProgress'
export type { StreamingListProps } from './streaming/StreamingList'
export { StreamingList } from './streaming/StreamingList'
export type { StreamingMessageProps } from './streaming/StreamingMessage'
// Streaming Components
export { StreamingMessage } from './streaming/StreamingMessage'
export type { StreamingStructureProps } from './streaming/StreamingStructure'
export { StreamingStructure } from './streaming/StreamingStructure'
export type { TextGlimmerProps } from './streaming/TextGlimmer'
export { TextGlimmer } from './streaming/TextGlimmer'
export type { ThinkingIndicatorProps } from './streaming/ThinkingIndicator'
export { ThinkingIndicator } from './streaming/ThinkingIndicator'
export type { ToolExecutionProps } from './streaming/ToolExecution'
export { ToolExecution } from './streaming/ToolExecution'
export type { TypewriterTextProps } from './streaming/TypewriterText'
export { TypewriterText } from './streaming/TypewriterText'
export type { TypingIndicatorProps } from './streaming/TypingIndicator'
export { TypingIndicator } from './streaming/TypingIndicator'
export type { VerificationProgressProps } from './streaming/VerificationProgress'
export { VerificationProgress } from './streaming/VerificationProgress'
export type {
  AgentInfo,
  AgentResponse,
  ConfidenceBreakdown,
  Source,
  VerificationResult,
} from './types/agent'
export type { ChatError, ChatMessage, ConversationSummary } from './types/chat'
export type { AgentChatConfig } from './types/config'
export type {
  MCPResource,
  MCPServerInfo,
  MCPToolCallData,
  MCPToolStatus,
} from './types/mcp'
export type { StreamEvent, StreamState } from './types/streaming'
