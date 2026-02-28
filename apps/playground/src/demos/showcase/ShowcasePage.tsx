import { useCallback, useEffect, useState } from "react";
import { useAgentChat, useCharacterDrain } from "@surf-kit/agent/hooks";
import {
  MessageBubble,
  MessageComposer,
  WelcomeScreen,
  StreamingMessage,
  ThinkingIndicator,
  VerificationProgress,
  FollowUpChips,
  ErrorResponse,
  AgentAvatar,
  AgentLabel,
  type StreamState,
} from "@surf-kit/agent";
import { Badge, Tabs } from "@surf-kit/core";
import { ThemeProvider, type ColorMode } from "@surf-kit/theme";
import { LIVE_API_URL } from "../full-page/FullPageDemo";

import { PrimitivesSection } from "./sections/PrimitivesSection";
import { ButtonsInputsSection } from "./sections/ButtonsInputsSection";
import { FeedbackSection } from "./sections/FeedbackSection";
import { OverlaysSection } from "./sections/OverlaysSection";
import { NavigationSection } from "./sections/NavigationSection";
import { DataDisplaySection } from "./sections/DataDisplaySection";
import { LayoutSection } from "./sections/LayoutSection";
import { AgentComponentsSection } from "./sections/AgentComponentsSection";
import { AgentStreamingSection } from "./sections/AgentStreamingSection";
import { MCPSection } from "./sections/MCPSection";
import { IconsSection } from "./sections/IconsSection";
import { HooksSection } from "./sections/HooksSection";

const CHAT_CONFIG = {
  apiUrl: LIVE_API_URL ?? "/api/v1",
  streamPath: "/chat/stream",
  feedbackPath: "/feedback",
  conversationsPath: "/conversations",
  timeout: 60000,
};

const WELCOME_QUESTIONS = [
  "What pricing plans are available?",
  "How do I get started with the API?",
  "What are the rate limits for the Pro plan?",
];

/* ------------------------------------------------------------------ */
/*  Streaming bubble — uses library's character drain                   */
/* ------------------------------------------------------------------ */

function ShowcaseStreamingBubble({
  streamingContent,
  streamPhase,
  onDrainingChange,
}: {
  streamingContent: string;
  streamPhase: string;
  onDrainingChange: (isDraining: boolean) => void;
}) {
  const { displayed, isDraining } = useCharacterDrain(streamingContent);

  useEffect(() => {
    onDrainingChange(isDraining);
  }, [isDraining, onDrainingChange]);

  // Build a StreamState to pass to StreamingMessage
  const streamState: StreamState = {
    active: true,
    phase: streamPhase as StreamState["phase"],
    content: displayed,
    sources: [],
    agent: null,
    agentLabel: null,
  };

  if (!displayed && streamPhase === "idle") return null;

  return <StreamingMessage stream={streamState} showPhases />;
}

/* ------------------------------------------------------------------ */
/*  Rebuilt chat using library components                               */
/* ------------------------------------------------------------------ */

function ShowcaseChat() {
  const { state, actions } = useAgentChat(CHAT_CONFIG);
  const [isDraining, setIsDraining] = useState(false);

  const handleDrainingChange = useCallback((draining: boolean) => {
    setIsDraining(draining);
  }, []);

  const isEmpty = state.messages.length === 0 && !state.isLoading;

  // Filter messages for display (hide last assistant while draining)
  const visibleMessages = state.messages.filter((msg, i) => {
    const isLastAssistant =
      i === state.messages.length - 1 && msg.role === "assistant";
    return !(isLastAssistant && isDraining);
  });

  // Get last message's follow-up suggestions
  const lastMsg = state.messages[state.messages.length - 1];
  const suggestions =
    lastMsg?.role === "assistant" && !isDraining
      ? lastMsg.response?.follow_up_suggestions ?? []
      : [];

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border shrink-0">
        <AgentAvatar
          agent={{ id: "surf", label: "Surf" }}
          size="sm"
        />
        <AgentLabel agent={{ id: "surf", label: "Surf Agent" }} />
        <Badge intent={LIVE_API_URL ? "success" : "default"} size="sm">
          {LIVE_API_URL ? "Live" : "Mock API"}
        </Badge>
      </div>

      {/* Message area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-4">
        {isEmpty ? (
          <WelcomeScreen
            title="Hi, I'm Surf."
            message="Ask me about any of my knowledge sources, or how to get started. I'll orchestrate your request with my agent team."
            suggestedQuestions={WELCOME_QUESTIONS}
            onQuestionSelect={(q) => actions.setInputValue(q)}
          />
        ) : (
          <div className="flex flex-col gap-1">
            {visibleMessages.map((msg) => (
              <MessageBubble
                key={msg.id}
                message={msg}
                showAgent
                showSources
              />
            ))}
          </div>
        )}

        {/* Phase indicators using library components */}
        {state.isLoading && !state.streamingContent && (
          <div className="mt-2">
            {state.streamPhase === "thinking" && <ThinkingIndicator />}
            {state.streamPhase === "retrieving" && (
              <ThinkingIndicator label="Searching knowledge base..." />
            )}
            {state.streamPhase === "generating" && (
              <ThinkingIndicator label="Writing response..." />
            )}
            {state.streamPhase === "waiting" && (
              <ThinkingIndicator label="Still working, please wait..." />
            )}
          </div>
        )}

        {/* Streaming bubble */}
        {(state.streamingContent || isDraining) && (
          <ShowcaseStreamingBubble
            streamingContent={state.streamingContent}
            streamPhase={state.streamPhase}
            onDrainingChange={handleDrainingChange}
          />
        )}

        {/* Verification in-progress */}
        {state.streamPhase === "verifying" && state.streamingContent && (
          <div className="mt-2">
            <VerificationProgress isActive label="Checking accuracy..." />
          </div>
        )}

        {/* Error display */}
        {state.error && (
          <div className="mt-2">
            <ErrorResponse
              error={state.error}
              onRetry={state.error.retryable ? () => actions.retry() : undefined}
            />
          </div>
        )}

        {/* Follow-up chips */}
        {suggestions.length > 0 && (
          <div className="mt-3">
            <FollowUpChips
              suggestions={suggestions}
              onSelect={(text) => actions.setInputValue(text)}
            />
          </div>
        )}
      </div>

      {/* Composer */}
      <div className="shrink-0 border-t border-border px-4 py-3">
        <MessageComposer
          onSend={(text) => actions.sendMessage(text)}
          isLoading={state.isLoading}
          placeholder="Ask a question..."
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Theme switcher                                                      */
/* ------------------------------------------------------------------ */

const THEME_OPTIONS: { label: string; value: ColorMode }[] = [
  { label: "Brand", value: "brand" },
  { label: "Dark", value: "dark" },
  { label: "Light", value: "light" },
];

function ThemeSwitcher({
  value,
  onChange,
}: {
  value: ColorMode;
  onChange: (mode: ColorMode) => void;
}) {
  return (
    <div className="inline-flex rounded-lg border border-border p-0.5 gap-0.5" role="radiogroup" aria-label="Theme">
      {THEME_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="radio"
          aria-checked={value === opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-3 py-1 rounded-md text-xs font-medium transition-colors duration-150 ${
            value === opt.value
              ? "bg-accent text-white"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Showcase sections — tabbed                                          */
/* ------------------------------------------------------------------ */

function ShowcaseSections({
  colorMode,
  onColorModeChange,
}: {
  colorMode: ColorMode;
  onColorModeChange: (mode: ColorMode) => void;
}) {
  const tabItems = [
    { key: "primitives", title: "Primitives", content: <PrimitivesSection /> },
    { key: "inputs", title: "Buttons & Inputs", content: <ButtonsInputsSection /> },
    { key: "feedback", title: "Feedback", content: <FeedbackSection /> },
    { key: "overlays", title: "Overlays", content: <OverlaysSection /> },
    { key: "navigation", title: "Navigation", content: <NavigationSection /> },
    { key: "data", title: "Data Display", content: <DataDisplaySection /> },
    { key: "layout", title: "Layout", content: <LayoutSection /> },
    { key: "agent", title: "Agent", content: <AgentComponentsSection /> },
    { key: "streaming", title: "Streaming", content: <AgentStreamingSection /> },
    { key: "mcp", title: "MCP", content: <MCPSection /> },
    { key: "icons", title: "Icons", content: <IconsSection /> },
    { key: "hooks", title: "Hooks", content: <HooksSection /> },
  ];

  return (
    <div className="h-full overflow-y-auto p-4 bg-surface">
      <div className="flex justify-end mb-3">
        <ThemeSwitcher value={colorMode} onChange={onColorModeChange} />
      </div>
      <Tabs items={tabItems} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main showcase page — two-column layout                              */
/* ------------------------------------------------------------------ */

export function ShowcasePage() {
  const [colorMode, setColorMode] = useState<ColorMode>("brand");

  return (
    <ThemeProvider colorMode={colorMode} className="h-full">
      <div className="flex h-full bg-canvas text-text-primary">
        {/* Left: rebuilt chat */}
        <div className="w-[420px] min-w-[360px] border-r border-border flex flex-col">
          <ShowcaseChat />
        </div>

        {/* Right: component showcase tabs */}
        <div className="flex-1 min-w-0">
          <ShowcaseSections
            colorMode={colorMode}
            onColorModeChange={setColorMode}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}
