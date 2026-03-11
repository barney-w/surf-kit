import { createContext, useCallback, useContext, useState } from "react";
import { ThemeProvider } from "@surf-kit/theme";
import type { ColorMode } from "@surf-kit/theme";
import { Button } from "@surf-kit/core";
import { FullPageDemo, LIVE_API_URL } from "./demos/full-page/FullPageDemo";
import { ShowcasePage } from "./demos/showcase/ShowcasePage";

const STORAGE_KEY = "surf-color-mode";

function getSavedColorMode(): ColorMode {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark" || saved === "brand") return saved;
  } catch {
    /* SSR / private browsing */
  }
  return "brand";
}

const ColorModeContext = createContext<{
  colorMode: ColorMode;
  toggleColorMode: () => void;
}>({ colorMode: "brand", toggleColorMode: () => {} });

function ThemeToggle() {
  const { colorMode, toggleColorMode } = useContext(ColorModeContext);

  return (
    <button
      onClick={toggleColorMode}
      aria-label={`Switch to ${colorMode === "brand" ? "light" : "brand"} theme`}
      className="p-1.5 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface transition-colors cursor-pointer"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {colorMode === "brand" ? (
          <>
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </>
        ) : (
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        )}
      </svg>
    </button>
  );
}

function NewChatIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13.5 2.5l-1-1a1.41 1.41 0 0 0-2 0L3 9l-1 4 4-1 7.5-7.5a1.41 1.41 0 0 0 0-2z" />
      <path d="M10 4l2 2" />
    </svg>
  );
}

type Page = "chat" | "showcase";

export function App() {
  const [colorMode, setColorMode] = useState<ColorMode>(getSavedColorMode);
  const [page, setPage] = useState<Page>("chat");
  const [chatKey, setChatKey] = useState(0);
  const [hasMessages, setHasMessages] = useState(false);
  const handleHasMessages = useCallback(
    (has: boolean) => setHasMessages(has),
    [],
  );

  const toggleColorMode = useCallback(() => {
    setColorMode((prev) => {
      const next: ColorMode = prev === "brand" ? "light" : "brand";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* noop */
      }
      return next;
    });
  }, []);

  return (
    <ColorModeContext.Provider value={{ colorMode, toggleColorMode }}>
      <ThemeProvider colorMode={colorMode}>
        <div
          className="h-screen flex flex-col bg-canvas"
          style={
            colorMode === "brand"
              ? {
                  background:
                    "radial-gradient(ellipse at top center, #0a030f 0%, #041F26 70%)",
                }
              : undefined
          }
        >
          {/* Header */}
          <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 bg-canvas/80 backdrop-blur-[12px] border-b border-border shrink-0">
            {/* Left — logo */}
            <div className="flex items-center gap-3">
              <img
                src={`${import.meta.env.BASE_URL}surf.png`}
                alt="Surf Kit"
                className="w-7 h-7 rounded-md"
              />
              <span className="font-display font-bold text-base text-text-primary">
                Surf
              </span>
              <span className="text-border-strong">/</span>
              <span className="text-text-secondary font-body text-sm">
                Playground
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${
                  LIVE_API_URL
                    ? "border-accent/40 text-accent"
                    : "border-border-strong text-text-muted"
                }`}
              >
                {LIVE_API_URL ? `Live: ${LIVE_API_URL}` : "Mock API"}
              </span>
            </div>

            {/* Right — actions + page tabs */}
            <div className="flex items-center gap-2">
              {page === "chat" && (
                <Button
                  intent="secondary"
                  size="sm"
                  aria-label="New chat"
                  isDisabled={!hasMessages}
                  onPress={() => {
                    setChatKey((k) => k + 1);
                    setHasMessages(false);
                  }}
                >
                  <NewChatIcon />
                  <span className="hidden sm:inline text-sm font-medium ml-1.5">
                    New chat
                  </span>
                </Button>
              )}

              <ThemeToggle />

              <div className="w-px h-5 bg-border mx-2" />

              <nav className="flex items-center gap-1">
                <Button
                  intent={page === "chat" ? "tonal" : "ghost"}
                  size="sm"
                  onPress={() => setPage("chat")}
                >
                  Chat
                </Button>
                <Button
                  intent={page === "showcase" ? "tonal" : "ghost"}
                  size="sm"
                  onPress={() => setPage("showcase")}
                >
                  Showcase
                </Button>
              </nav>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 overflow-hidden">
            {page === "chat" ? (
              <FullPageDemo
                key={chatKey}
                onHasMessages={handleHasMessages}
              />
            ) : (
              <ShowcasePage />
            )}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
