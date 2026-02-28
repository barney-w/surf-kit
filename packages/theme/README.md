# @surf-kit/theme

> Theme provider and Tailwind preset for surf-kit — light, dark, and brand color modes

Part of the [surf-kit](https://github.com/barney-w/surf-kit) design system.

## Install

```bash
npm install @surf-kit/theme @surf-kit/tokens
```

## Quick Example

```tsx
import { ThemeProvider, useColorMode } from '@surf-kit/theme';
import '@surf-kit/tokens/css';
import '@surf-kit/tokens/css/dark';

function App() {
  return (
    <ThemeProvider defaultColorMode="system">
      <MyApp />
    </ThemeProvider>
  );
}

function MyApp() {
  const { colorMode, setColorMode } = useColorMode();
  return <button onClick={() => setColorMode('dark')}>Current: {colorMode}</button>;
}
```

## What's Included

- **ThemeProvider** — wraps your app, manages color mode state
- **useTheme** — access the current theme object
- **useColorMode** — read and set the active color mode (`light` | `dark` | `brand`)
- **createTheme** — build a custom theme configuration
- **surfKitPreset** — Tailwind CSS v4 preset with all surf-kit design tokens

## Color Modes

| Mode | Description |
|------|-------------|
| `light` | Default light theme |
| `dark` | Dark theme |
| `brand` | Teal and gold brand theme |
| `system` | Auto-detects `light` or `dark` from OS preference |

## Docs

- [Storybook](https://barney-w.github.io/surf-kit/storybook)
- [Contributing](https://github.com/barney-w/surf-kit/blob/main/CONTRIBUTING.md)

## License

[0BSD](./LICENSE)
