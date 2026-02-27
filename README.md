# surf-kit

[![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![React Aria](https://img.shields.io/badge/React_Aria-3-E1251B?logo=adobe&logoColor=white)](https://react-spectrum.adobe.com/react-aria/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

**AI-first design system for agent interfaces.**

surf-kit provides accessible, themeable React components purpose-built for conversational AI experiences. From chat interfaces and status dashboards to form wizards and document viewers, surf-kit delivers the building blocks for trustworthy, human-centered agent UIs.

---

## Quick Start

```bash
pnpm add @surf-kit/core @surf-kit/agent @surf-kit/theme
```

### Drop-in Agent Chat

```tsx
import { ThemeProvider } from '@surf-kit/theme';
import { AgentChat } from '@surf-kit/agent';

export default function App() {
  return (
    <ThemeProvider>
      <AgentChat
        agentName="Citizen Assistant"
        messages={messages}
        onSend={handleSend}
      />
    </ThemeProvider>
  );
}
```

---

## Packages

| Package | Description |
| --- | --- |
| [`@surf-kit/core`](./packages/core) | Primitive UI components — Button, Input, Badge, Card, and more |
| [`@surf-kit/agent`](./packages/agent) | AI-specific components — AgentChat, MessageBubble, ToolCallCard, StatusBanner |
| [`@surf-kit/tokens`](./packages/tokens) | Design tokens (colors, spacing, typography) as CSS, JSON, and TypeScript |
| [`@surf-kit/theme`](./packages/theme) | ThemeProvider with light/dark mode and system preference detection |
| [`@surf-kit/hooks`](./packages/hooks) | Shared React hooks — useMediaQuery, useTheme, useReducedMotion |
| [`@surf-kit/icons`](./packages/icons) | Curated icon set wrapped for consistent sizing and accessibility |

---

## Documentation

- **Docs site** -- coming soon
- **Storybook** -- `pnpm dev:storybook` (local) or see the hosted version (coming soon)
- **Playground** -- coming soon

---

## Development

```bash
git clone https://github.com/your-org/surf-kit.git
cd surf-kit
pnpm install
pnpm build
pnpm dev
pnpm test
pnpm lint
pnpm typecheck
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed development guidelines.

---

## Tech Stack

- **React 18+** with server component compatibility
- **TypeScript** in strict mode across all packages
- **Tailwind CSS 4** for utility-first styling
- **React Aria** for WCAG 2.1 AA accessible primitives
- **CVA** (class-variance-authority) for component variants
- **Vitest** + **Testing Library** + **axe-core** for unit and accessibility testing
- **Turborepo** for fast, cached monorepo builds
- **Changesets** for versioning and changelog management

---

## License

MIT
