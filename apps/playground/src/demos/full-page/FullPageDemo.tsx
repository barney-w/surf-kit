import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  useAgentChat,
  AgentResponseView,
  TypewriterText,
  type ChatMessage,
} from "@surf-kit/agent";
import { motion, AnimatePresence } from "framer-motion";

export const LIVE_API_URL = import.meta.env.VITE_SURF_API_URL as
  | string
  | undefined;

const BG_IMAGES = [
  "/branding/bg.jpg",
  "/branding/bg2.jpg",
  "/branding/bg3.jpg",
];

const CHAT_CONFIG = {
  apiUrl: LIVE_API_URL ?? "/api/v1",
  streamPath: "/chat/stream",
  feedbackPath: "/feedback",
  conversationsPath: "/conversations",
  timeout: 60000,
};

/* ------------------------------------------------------------------ */
/*  Phase indicator                                                      */
/* ------------------------------------------------------------------ */

function PhaseIndicator({ phase }: { phase: string }) {
  if (phase === "idle") return null;

  const labels: Record<string, string> = {
    thinking: "Thinking...",
    retrieving: "Searching knowledge base...",
    generating: "Writing response...",
    waiting: "Still working, please wait...",
  };

  return (
    <div className="flex items-center gap-3 py-3 px-1 step-enter">
      {phase === "verifying" ? (
        <>
          <div className="brand-spinner brand-spinner-sm" aria-hidden="true" />
          <span className="text-sm text-brand-cyan/70 font-body animate-pulse">
            Checking accuracy...
          </span>
        </>
      ) : (
        <>
          <div className="brand-spinner brand-spinner-sm" aria-hidden="true" />
          <span className="text-sm text-brand-cream/50 font-body animate-pulse">
            {labels[phase] ?? phase}
          </span>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Message bubble                                                      */
/* ------------------------------------------------------------------ */

function MessageBubble({
  msg,
  onFollowUp,
  noEntryAnimation = false,
}: {
  msg: ChatMessage;
  onFollowUp: (text: string) => void;
  noEntryAnimation?: boolean;
}) {
  const isUser = msg.role === "user";
  const suggestions = msg.response?.follow_up_suggestions ?? [];

  if (isUser) {
    return (
      <motion.div
        className="flex justify-end mb-1 mt-4"
        initial={{ opacity: 0, x: 20, y: 4 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <div className="max-w-[70%] px-4 py-2.5 rounded-[18px] rounded-br-[4px] bg-brand-blue text-brand-cream text-sm leading-relaxed whitespace-pre-wrap break-words">
          {msg.content}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="flex flex-col items-start gap-1.5 mb-1"
      initial={noEntryAnimation ? false : { opacity: 0, x: -16, y: 8 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ type: "spring", damping: 28, stiffness: 220 }}
    >
      {msg.agent && (
        <div className="text-[11px] font-display font-semibold uppercase tracking-[0.08em] text-brand-gold/55 px-1">
          {msg.agent.replace("_agent", "").replace("_", " ")}
        </div>
      )}

      <div className="w-full max-w-[88%] px-4 py-3 rounded-[18px] rounded-tl-[4px] bg-brand-dark-panel border border-brand-gold/15">
        {msg.response ? (
          <AgentResponseView response={msg.response} showSources />
        ) : (
          <p className="text-sm text-brand-cream leading-relaxed m-0">
            {msg.content}
          </p>
        )}
      </div>

      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => onFollowUp(s)}
              className="px-4 py-1.5 rounded-full text-sm border border-brand-gold/20 bg-transparent text-brand-cream/65 hover:bg-brand-gold/10 hover:border-brand-gold/40 hover:text-brand-cream transition-colors duration-200 cursor-pointer"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Background slideshow — isolated so state changes don't re-render  */
/*  the chat UI and re-trigger framer-motion animations.              */
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

export function FullPageDemo() {
  const { state, actions } = useAgentChat(CHAT_CONFIG);
  const threadRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const prevIsLoadingRef = useRef(state.isLoading);
  const justStoppedLoading = prevIsLoadingRef.current && !state.isLoading;
  prevIsLoadingRef.current = state.isLoading;

  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [state.messages, state.streamPhase]);

  const handleSend = useCallback(() => {
    const text = state.inputValue.trim();
    if (!text || state.isLoading) return;
    actions.sendMessage(text);
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }
  }, [state.inputValue, state.isLoading, actions]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  const isEmpty = state.messages.length === 0 && !state.isLoading;

  return (
    <div className="flex flex-col h-full max-w-[860px] mx-auto px-4 relative">
      <BackgroundSlideshow />

      {/* Message thread */}
      <div ref={threadRef} className="flex-1 overflow-y-auto overflow-x-hidden py-6">
        <AnimatePresence mode="wait">
          {isEmpty ? (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-1 flex-col items-center justify-center gap-8 text-center h-full"
            >
              {/* Pulsing icon */}
              <img
                src="/surf.png"
                alt="Surf Kit"
                className="w-32 h-30 rounded-md"
              />

              <div className="flex flex-col gap-3">
                <h2 className="font-display text-3xl font-bold text-brand-cream">
                  Surf
                </h2>
                <p className="text-brand-cream/60 text-base max-w-md leading-relaxed">
                  <TypewriterText
                    text="Ask about pricing plans, getting started, or API rate limits."
                    speed={22}
                    delay={500}
                  />
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {[
                  "What pricing plans are available?",
                  "How do I get started with the API?",
                  "What are the rate limits for the Pro plan?",
                ].map((chip) => (
                  <button
                    key={chip}
                    onClick={() => {
                      actions.setInputValue(chip);
                      inputRef.current?.focus();
                    }}
                    className="px-4 py-2 rounded-full text-sm border border-brand-gold/20 bg-transparent text-brand-cream/70 hover:bg-brand-gold/10 hover:border-brand-gold/40 hover:text-brand-cream focus-visible:outline-2 focus-visible:outline-brand-cyan transition-colors duration-200 cursor-pointer"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="thread"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {state.messages.map((msg, i) => (
                <MessageBubble
                  key={msg.id}
                  msg={msg}
                  noEntryAnimation={
                    justStoppedLoading &&
                    i === state.messages.length - 1 &&
                    msg.role === "assistant"
                  }
                  onFollowUp={(text) => {
                    actions.setInputValue(text);
                    inputRef.current?.focus();
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {state.isLoading && state.streamPhase !== "generating" && !state.streamingContent && (
            <motion.div
              key="phase"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <PhaseIndicator phase={state.streamPhase} />
            </motion.div>
          )}
          {state.error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="px-4 py-3 rounded-xl bg-brand-watermelon/10 border border-brand-watermelon/30 text-sm mb-4"
            >
              <span className="font-display font-semibold text-brand-watermelon">
                Error:{" "}
              </span>
              <span className="text-brand-watermelon/80">{state.error.message}</span>
              {state.error.retryable && (
                <button
                  onClick={() => actions.retry()}
                  className="ml-3 px-3 py-1 rounded-lg text-sm border border-brand-watermelon/40 text-brand-watermelon hover:bg-brand-watermelon/10 transition-colors duration-200"
                >
                  Retry
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {state.streamingContent && (
          <motion.div
            className="flex flex-col items-start gap-1.5 mb-1"
            initial={{ opacity: 0, x: -16, y: 8 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
          >
            <div className="w-full max-w-[88%] px-4 py-3 rounded-[18px] rounded-tl-[4px] bg-brand-dark-panel border border-brand-gold/15">
              <p className="text-sm text-brand-cream leading-relaxed m-0">
                {state.streamingContent}
                <span className="typewriter-cursor" aria-hidden="true" />
              </p>
            </div>
          </motion.div>
        )}

      </div>

      {/* Composer */}
      <div className="flex items-end gap-3 border-t border-brand-gold/12 py-3 shrink-0">
        <textarea
          ref={inputRef}
          value={state.inputValue}
          onChange={(e) => {
            actions.setInputValue(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = Math.min(e.target.scrollHeight, 128) + "px";
          }}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question..."
          rows={1}
          className="flex-1 px-4 py-2.5 rounded-xl resize-none text-sm font-body bg-brand-dark-panel/80 border border-brand-gold/15 text-brand-cream placeholder:text-brand-cream/40 outline-none focus:border-transparent focus:ring-2 focus:ring-brand-gold/40 disabled:opacity-50 disabled:cursor-not-allowed overflow-x-hidden overflow-y-auto transition-all duration-200"
          style={{ colorScheme: "dark" }}
          disabled={state.isLoading}
        />
        <button
          onClick={handleSend}
          disabled={!state.inputValue.trim() || state.isLoading}
          className={`px-5 py-2.5 rounded-xl text-sm font-display font-semibold text-brand-cream transition-all duration-200 shrink-0 focus-visible:outline-2 focus-visible:outline-brand-cyan ${
            state.inputValue.trim() && !state.isLoading
              ? "hover:shadow-glow-cyan hover:scale-[1.02] active:scale-[0.98]"
              : "text-brand-cream/40 cursor-not-allowed"
          }`}
          style={{
            backgroundColor: state.inputValue.trim() && !state.isLoading
              ? "var(--color-brand-cyan)"
              : "rgba(56,189,208,0.3)",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
