<div align="center">
  <img src="./surf.png" alt="surf-kit mascot" width="280" />
  <h1>surf-kit</h1>
  <strong>The AI-first design system for agent interfaces</strong>
  <br />
  <em>73 accessible React components for conversational AI</em>
  <br /><br />

[![npm](https://img.shields.io/npm/v/@surf-kit/core?color=0091A5&label=npm)](https://www.npmjs.com/package/@surf-kit/core)
[![CI](https://img.shields.io/github/actions/workflow/status/barney-w/surf-kit/ci.yml?branch=main&label=CI)](https://github.com/barney-w/surf-kit/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6)](https://www.typescriptlang.org)
[![WCAG 2.1 AA](https://img.shields.io/badge/a11y-WCAG_2.1_AA-0091A5)](https://www.w3.org/TR/WCAG21/)
[![License: 0BSD](https://img.shields.io/badge/License-0BSD-blue.svg)](./LICENSE)

[Storybook](https://barney-w.github.io/surf-kit/storybook) · [Quick Start](#quick-start) · [Packages](#packages) · [Contributing](./CONTRIBUTING.md)

</div>

---

## Why surf-kit?

Every design system gives you buttons and inputs. Only surf-kit gives you the components AI apps actually need:

| Need               | Generic UI library | surf-kit                   |
| ------------------ | ------------------ | -------------------------- |
| Chat interface     | Build from scratch | `<AgentChat />`            |
| Streaming text     | Parse SSE yourself | `<StreamingMessage />`     |
| Tool execution UI  | No concept of this | `<ToolExecution />`        |
| Confidence display | Not applicable     | `<ConfidenceBadge />`      |
| Source citations   | Build from scratch | `<SourceCard />`           |
| Thinking state     | A spinner          | `<ThinkingIndicator />`    |
| Agent handoffs     | Not applicable     | `<AgentHandoff />`         |
| Accessibility      | Varies             | WCAG 2.1 AA via React Aria |

---

## Quick Start

```bash
npm install @surf-kit/core @surf-kit/agent @surf-kit/theme @surf-kit/tokens
```

### 1. Set Up the Provider

```tsx
import { ThemeProvider } from "@surf-kit/theme";
import "@surf-kit/tokens/css";
import "@surf-kit/tokens/css/dark";

function App() {
  return (
    <ThemeProvider defaultColorMode="system">
      <MyApp />
    </ThemeProvider>
  );
}
```

### 2. Build an Agent Chat

```tsx
import { AgentChat } from "@surf-kit/agent";
import { useState } from "react";

function MyApp() {
  const [messages, setMessages] = useState([
    { id: "1", role: "agent", content: "How can I help you today?" },
  ]);

  const handleSend = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: "user", content: text },
    ]);
    // Send to your AI backend...
  };

  return (
    <AgentChat agentName="Assistant" messages={messages} onSend={handleSend} />
  );
}
```

---

## Component Showcase

### Core Primitives

| Category       | Components                                                                                 |
| -------------- | ------------------------------------------------------------------------------------------ |
| **Layout**     | Box, Stack, Grid, Separator, Card, Accordion                                               |
| **Inputs**     | Button, IconButton, TextInput, TextArea, Select, Checkbox, RadioGroup, Switch, SearchInput |
| **Feedback**   | Badge, Spinner, Skeleton, Alert, Toast, ProgressBar, AvatarGenerationLoader, AvatarRings   |
| **Overlays**   | Dialog, Popover, Tooltip, Sheet, DropdownMenu                                              |
| **Navigation** | Tabs, Breadcrumb, Sidebar                                                                  |
| **Data**       | Table, DataList                                                                            |
| **Typography** | Text, VisuallyHidden                                                                       |

### Agent Components

| Category      | Components                                                                                                  |
| ------------- | ----------------------------------------------------------------------------------------------------------- |
| **Chat**      | AgentChat, MessageThread, MessageBubble, MessageComposer, ConversationList, WelcomeScreen                   |
| **Streaming** | StreamingMessage, ThinkingIndicator, ToolExecution, TypewriterText, RetrievalProgress, VerificationProgress |
| **Trust**     | ConfidenceBadge, ConfidenceMeter, ConfidenceBreakdown, VerificationBadge, VerificationDetail                |
| **Sources**   | SourceCard, SourceList, SourceInline, SourceDrawer, SourceBadge                                             |
| **Identity**  | AgentAvatar, AgentLabel, AgentHandoff, RoutingIndicator                                                     |
| **Feedback**  | ThumbsFeedback, FeedbackDialog, FeedbackConfirmation                                                        |
| **Response**  | AgentResponse, ResponseMessage, StructuredResponse, FollowUpChips, ErrorResponse                            |
| **Layout**    | AgentFullPage, AgentPanel, AgentWidget, AgentEmbed                                                          |

[Browse all components in Storybook →](https://barney-w.github.io/surf-kit/storybook)

---

## Packages

| Package                                 | Version                                                                                                              | Description                                                  |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| [`@surf-kit/core`](./packages/core)     | [![npm](https://img.shields.io/npm/v/@surf-kit/core?color=0091A5)](https://www.npmjs.com/package/@surf-kit/core)     | UI primitives — Button, Input, Card, Table, Dialog, and more |
| [`@surf-kit/agent`](./packages/agent)   | [![npm](https://img.shields.io/npm/v/@surf-kit/agent?color=0091A5)](https://www.npmjs.com/package/@surf-kit/agent)   | AI agent components — chat, streaming, confidence, sources   |
| [`@surf-kit/tokens`](./packages/tokens) | [![npm](https://img.shields.io/npm/v/@surf-kit/tokens?color=0091A5)](https://www.npmjs.com/package/@surf-kit/tokens) | Design tokens as CSS, JSON, and TypeScript                   |
| [`@surf-kit/theme`](./packages/theme)   | [![npm](https://img.shields.io/npm/v/@surf-kit/theme?color=0091A5)](https://www.npmjs.com/package/@surf-kit/theme)   | ThemeProvider with light, dark, and brand modes              |
| [`@surf-kit/hooks`](./packages/hooks)   | [![npm](https://img.shields.io/npm/v/@surf-kit/hooks?color=0091A5)](https://www.npmjs.com/package/@surf-kit/hooks)   | Shared hooks — clipboard, keyboard shortcuts, media queries  |
| [`@surf-kit/icons`](./packages/icons)   | [![npm](https://img.shields.io/npm/v/@surf-kit/icons?color=0091A5)](https://www.npmjs.com/package/@surf-kit/icons)   | Custom agent icons + Lucide re-exports                       |

---

## Feature Highlights

### Three Themes

Light, dark, and a distinctive teal/gold brand theme. Switch modes at runtime with `useColorMode()` or let `system` auto-detect from OS preference.

### Accessibility First

Every interactive component uses [React Aria](https://react-spectrum.adobe.com/react-aria/) for keyboard navigation, focus management, and screen reader support. Automated [axe](https://www.deque.com/axe/) testing in CI ensures WCAG 2.1 AA compliance.

### Streaming Native

Built for LLM response patterns. `StreamingMessage` renders token-by-token, `ThinkingIndicator` shows reasoning state, and `ToolExecution` visualises function calls — all with smooth transitions.

### Design Token Architecture

[Style Dictionary v4](https://styledictionary.com/) with the [DTCG](https://www.designtokens.org/) format. Import tokens as CSS custom properties, JSON, or TypeScript. Three CSS builds ship out of the box (light, dark, brand).

### TypeScript Strict

Full type safety across all packages. Every component exports its prop interface for extension and composition.

---

## Documentation & Resources

| Resource        | Link                                                                                     |
| --------------- | ---------------------------------------------------------------------------------------- |
| Storybook       | [barney-w.github.io/surf-kit/storybook](https://barney-w.github.io/surf-kit/storybook)   |
| Playground      | [barney-w.github.io/surf-kit/playground](https://barney-w.github.io/surf-kit/playground) |
| Contributing    | [CONTRIBUTING.md](./CONTRIBUTING.md)                                                     |
| Code of Conduct | [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)                                               |
| Security        | [SECURITY.md](./SECURITY.md)                                                             |
| Changelog       | [Releases](https://github.com/barney-w/surf-kit/releases)                                |

---

## Development

```bash
git clone https://github.com/barney-w/surf-kit.git
cd surf-kit
pnpm install
pnpm build        # Build all packages
pnpm dev           # Dev mode with hot reload
pnpm test          # Run all tests
pnpm typecheck     # Type-check all packages
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed development guidelines.

---

## Tech Stack

- **React 18+** with server component compatibility
- **TypeScript 5.5+** in strict mode
- **Tailwind CSS 4** for utility-first styling
- **React Aria 3** for WCAG 2.1 AA accessible primitives
- **CVA** (class-variance-authority) for component variants
- **Style Dictionary 4** for design token compilation
- **Vitest** + **Testing Library** + **axe-core** for testing
- **Turborepo** for fast, cached monorepo builds
- **Changesets** for versioning and changelog management

---

Have ideas? [Open a discussion](https://github.com/barney-w/surf-kit/discussions) or [file an issue](https://github.com/barney-w/surf-kit/issues).

---

## License

[0BSD](./LICENSE)

---

<div align="center">
  <a href="https://dev.to/barney-w">
    <img src="https://img.shields.io/badge/DEV.to-barney--w-0A0A0A?logo=devdotto" alt="DEV.to" />
  </a>
</div>
