# @surf-kit/tokens

> Design tokens for surf-kit — colors, spacing, typography as CSS, JSON, and TypeScript

Part of the [surf-kit](https://github.com/barney-w/surf-kit) design system.

## Install

```bash
npm install @surf-kit/tokens
```

## Usage

### CSS Custom Properties

```ts
// Light mode (default)
import '@surf-kit/tokens/css';

// Dark mode overrides
import '@surf-kit/tokens/css/dark';

// Brand mode (teal/gold theme)
import '@surf-kit/tokens/css/brand';
```

### TypeScript

```ts
import tokens from '@surf-kit/tokens';
// tokens.color.primary, tokens.spacing.md, etc.
```

### JSON

```ts
import tokens from '@surf-kit/tokens/json';
```

## How It Works

Built with [Style Dictionary v4](https://styledictionary.com/) using the [DTCG](https://www.designtokens.org/) format. Source tokens live in the monorepo under `src/` and are compiled to CSS, JSON, and TypeScript outputs.

Three CSS builds are generated:
- **Light** — `:root` custom properties
- **Dark** — `:root` overrides for dark mode
- **Brand** — `[data-color-mode="brand"]` overrides for the teal/gold brand theme

## Docs

- [Storybook](https://barney-w.github.io/surf-kit/storybook)
- [Contributing](https://github.com/barney-w/surf-kit/blob/main/CONTRIBUTING.md)

## License

[Apache-2.0](./LICENSE)
