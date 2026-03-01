# @surf-kit/icons

> Icon set for surf-kit — custom agent icons plus Lucide re-exports

Part of the [surf-kit](https://github.com/barney-w/surf-kit) design system.

## Install

```bash
npm install @surf-kit/icons
```

## Quick Example

```tsx
import { Send, AgentCoordinator, ConfidenceHigh } from '@surf-kit/icons';

function Toolbar() {
  return (
    <div>
      <AgentCoordinator size={24} />
      <ConfidenceHigh size={20} />
      <Send size={16} />
    </div>
  );
}
```

## What's Included

**Custom Agent Icons** — AgentCoordinator, AgentFacilities, AgentFinance, AgentGovernance, AgentHr, AgentIt

**Confidence & Verification** — ConfidenceHigh, ConfidenceMedium, ConfidenceLow, VerificationPassed, VerificationFailed, VerificationFlagged

**Lucide Re-exports** — Search, X, ChevronDown, ChevronRight, Copy, Check, AlertTriangle, Info, Send, MessageSquare, ThumbsUp, ThumbsDown, and more — pre-selected for agent UI patterns.

All icons are tree-shakeable React components with consistent sizing props.

## Docs

- [Storybook](https://barney-w.github.io/surf-kit/storybook)
- [Contributing](https://github.com/barney-w/surf-kit/blob/main/CONTRIBUTING.md)

## License

[Apache-2.0](./LICENSE)
