# @surf-kit/hooks

> Shared React hooks for surf-kit — clipboard, keyboard shortcuts, media queries, and more

Part of the [surf-kit](https://github.com/barney-w/surf-kit) design system.

## Install

```bash
npm install @surf-kit/hooks
```

## Quick Example

```tsx
import { useClipboard } from '@surf-kit/hooks';

function CopyButton({ text }: { text: string }) {
  const { copy, copied } = useClipboard();
  return (
    <button onClick={() => copy(text)}>
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}
```

## What's Included

| Hook | Description |
|------|-------------|
| `useClipboard` | Copy text to clipboard with copied state |
| `useMediaQuery` | Subscribe to CSS media query matches |
| `useReducedMotion` | Detect `prefers-reduced-motion` preference |
| `useLocalStorage` | Persistent state backed by localStorage |
| `useKeyboardShortcut` | Register global keyboard shortcuts |
| `useFocusTrap` | Trap focus within a container element |
| `useAnnounce` | Announce messages to screen readers via live regions |

## Docs

- [Storybook](https://barney-w.github.io/surf-kit/storybook)
- [Contributing](https://github.com/barney-w/surf-kit/blob/main/CONTRIBUTING.md)

## License

[Apache-2.0](./LICENSE)
