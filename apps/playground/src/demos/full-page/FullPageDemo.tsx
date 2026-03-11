import { useCallback, useEffect, useRef, useState } from "react";
import { useAgentChat } from "@surf-kit/agent/hooks";
import {
  MessageThread,
  MessageComposer,
  WelcomeScreen,
} from "@surf-kit/agent/chat";
import { StreamingMessage } from "@surf-kit/agent/streaming";
import { ErrorResponse } from "@surf-kit/agent/response";

export const LIVE_API_URL = import.meta.env.VITE_SURF_API_URL as
  | string
  | undefined;

const base = import.meta.env.BASE_URL;

const CHAT_CONFIG = {
  apiUrl: LIVE_API_URL ?? "/api/v1",
  streamPath: "/chat/stream",
  feedbackPath: "/feedback",
  conversationsPath: "/conversations",
  timeout: 60000,
};

const SUGGESTED_QUESTIONS = [
  "What pricing plans are available?",
  "How do I get started?",
  "What are the rate limits?",
];

const BG_IMAGES = [
  `${base}branding/bg.jpg`,
  `${base}branding/bg2.jpg`,
  `${base}branding/bg3.jpg`,
];

/* ------------------------------------------------------------------ */
/*  Background slideshow                                               */
/* ------------------------------------------------------------------ */

function BackgroundSlideshow() {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    BG_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % BG_IMAGES.length);
    }, 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {BG_IMAGES.map((src, i) => (
        <div
          key={src}
          className="fixed inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-[2000ms] ease-in-out pointer-events-none"
          style={{
            backgroundImage: `url(${src})`,
            opacity: i === bgIndex ? 0.09 : 0,
          }}
        />
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  FullPageDemo                                                        */
/* ------------------------------------------------------------------ */

export function FullPageDemo({
  onHasMessages,
}: {
  onHasMessages?: (has: boolean) => void;
}) {
  const { state, actions } = useAgentChat(CHAT_CONFIG);
  const [isDraining, setIsDraining] = useState(false);
  const hasMessages = state.messages.length > 0;
  const showStreaming = state.isLoading || isDraining;
  const threadWrapperRef = useRef<HTMLDivElement>(null);
  const shouldScrollRef = useRef(false);

  useEffect(() => {
    onHasMessages?.(hasMessages);
  }, [hasMessages, onHasMessages]);

  useEffect(() => {
    if (!shouldScrollRef.current) return;
    shouldScrollRef.current = false;
    requestAnimationFrame(() => {
      const scrollEl = threadWrapperRef.current?.querySelector('[role="log"]');
      if (scrollEl) scrollEl.scrollTop = scrollEl.scrollHeight;
    });
  }, [state.messages.length]);

  const handleSend = useCallback(
    (content: string) => {
      shouldScrollRef.current = true;
      void actions.sendMessage(content);
    },
    [actions],
  );

  return (
    <div className="flex flex-col h-full max-w-[860px] mx-auto px-4 relative overflow-hidden">
      <BackgroundSlideshow />

      {hasMessages ? (
        <div className="flex flex-col flex-1 min-h-0" ref={threadWrapperRef}>
          <MessageThread
            messages={state.messages}
            showAgent
            showSources
            showConfidence={false}
            showVerification={false}
            hideLastAssistant={isDraining}
            streamingSlot={
              showStreaming ? (
                <StreamingMessage
                  stream={{
                    active: state.isLoading,
                    phase: state.streamPhase,
                    content: state.streamingContent,
                    sources: [],
                    agent: state.streamingAgent,
                    agentLabel: null,
                  }}
                  onDraining={setIsDraining}
                />
              ) : undefined
            }
          />

          {state.error && (
            <ErrorResponse
              error={state.error}
              onRetry={() => actions.retry()}
            />
          )}

          <div className="shrink-0 py-3">
            <MessageComposer
              onSend={handleSend}
              isLoading={state.isLoading}
              placeholder="Ask a question..."
            />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center">
          <div className="flex-[3]" />
          <WelcomeScreen
            title="Hi, I'm Surf."
            message="Ask me about any of my knowledge sources, or how to get started. I'll orchestrate your request with my agent team."
            icon={
              <img
                src={`${base}surf.png`}
                alt="Surf"
                className="w-32 h-30 rounded-md"
              />
            }
            suggestedQuestions={SUGGESTED_QUESTIONS}
            onQuestionSelect={handleSend}
            className="flex-none mb-6"
          />
          <div className="w-full max-w-[640px]">
            <MessageComposer
              onSend={handleSend}
              isLoading={state.isLoading}
              placeholder="Ask a question..."
            />
          </div>
          <div className="flex-[2]" />
        </div>
      )}
    </div>
  );
}
