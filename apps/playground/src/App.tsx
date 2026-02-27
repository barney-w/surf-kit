import React, { useState } from "react";
import { ThemeProvider } from "@surf-kit/theme";
import { FullPageDemo, LIVE_API_URL } from "./demos/full-page/FullPageDemo";
import { LayoutDemos } from "./demos/layouts/LayoutDemos";

type DemoView = "full-page" | "layouts";

export function App() {
  const [view, setView] = useState<DemoView>("full-page");

  return (
    <ThemeProvider colorMode="brand">
      <div
        className="h-screen flex flex-col bg-brand-dark"
        style={{
          background:
            "radial-gradient(ellipse at top center, #0a030f 0%, #041F26 70%)",
        }}
      >
        {/* Header */}
        <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 bg-brand-dark/80 backdrop-blur-[12px] border-b border-brand-gold/15 shrink-0">
          {/* Left — logo */}
          <div className="flex items-center gap-3">
            <img
              src="/surf.png"
              alt="Surf Kit"
              className="w-7 h-7 rounded-md"
            />
            <span className="font-display font-bold text-base text-brand-cream">
              Surf
            </span>
            <span className="text-brand-gold/30">/</span>
            <span className="text-brand-cream/50 font-body text-sm">
              Playground
            </span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${
                LIVE_API_URL
                  ? "border-brand-cyan/40 text-brand-cyan"
                  : "border-brand-gold/30 text-brand-gold/70"
              }`}
            >
              {LIVE_API_URL ? `Live: ${LIVE_API_URL}` : "Mock API"}
            </span>
          </div>

          {/* Right — view selector */}
          <select
            value={view}
            onChange={(e) => setView(e.target.value as DemoView)}
            className="px-3 py-1.5 rounded-xl bg-brand-dark-panel border border-brand-gold/15 text-brand-cream text-sm font-body cursor-pointer focus:ring-2 focus:ring-brand-gold/40 focus:outline-none transition-colors duration-200"
            style={{ colorScheme: "dark" }}
            aria-label="Select demo view"
          >
            <option value="full-page">Full Page Chat</option>
            <option value="layouts">Layout Components</option>
          </select>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-hidden">
          {view === "full-page" ? <FullPageDemo /> : <LayoutDemos />}
        </main>
      </div>
    </ThemeProvider>
  );
}
