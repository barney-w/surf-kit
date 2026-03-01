# playground

## 0.1.3

### Patch Changes

- Updated dependencies [44e9673]
  - @surf-kit/tokens@0.1.3
  - @surf-kit/theme@0.1.3
  - @surf-kit/core@0.1.3
  - @surf-kit/agent@0.2.1

## 0.1.2

### Patch Changes

- Updated dependencies [baa7b33]
  - @surf-kit/agent@0.2.0
  - @surf-kit/tokens@0.1.2
  - @surf-kit/core@0.1.2
  - @surf-kit/theme@0.1.2

## 0.1.3

### Patch Changes

- Fix showcase page: add missing dark mode token import and semantic color mappings (surface, text, accent, border, status, confidence, verification) to Tailwind v4 `@theme` block
- Fix showcase layout height chain by passing `className="h-full"` to nested ThemeProvider
- Fix showcase theme switcher: add `bg-canvas text-text-primary` to root container and `bg-surface` to sections panel so backgrounds and text respond to theme changes
- Fix text color resolving to light-mode grey instead of theme-appropriate color: move semantic color mappings from `@theme` to `@theme inline` so `var(--surf-*)` references resolve at element scope (respecting `[data-color-mode]` overrides) instead of being locked to `:root` values by `@property` registration
- Import `@surf-kit/tokens/css/light` so light theme works in nested ThemeProviders

## 0.1.2

### Minor Changes

- Add "Showcase" page with two-column layout: rebuilt chat using library components (MessageThread, MessageBubble, MessageComposer, WelcomeScreen, StreamingMessage, FollowUpChips, ErrorResponse, AgentAvatar, AgentLabel) and tabbed component gallery showcasing all 100+ surf-kit components across 12 sections (Primitives, Buttons & Inputs, Feedback, Overlays, Navigation, Data Display, Layout, Agent Components, Agent Streaming, MCP, Icons, Hooks)
- Add @surf-kit/hooks and @surf-kit/icons as dependencies
- Add Chat/Showcase tab navigation to the header

## 0.1.1

### Patch Changes

- Updated dependencies [2007903]
  - @surf-kit/core@0.1.1
  - @surf-kit/agent@0.1.1
  - @surf-kit/tokens@0.1.1
  - @surf-kit/theme@0.1.1
