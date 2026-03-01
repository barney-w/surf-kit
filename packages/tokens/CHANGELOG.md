# @surf-kit/tokens

## 0.1.3

### Patch Changes

- 44e9673: Fix colour contrast in brand theme by replacing hardcoded Tailwind colours with semantic tokens

## 0.1.2

### Patch Changes

- baa7b33: Add MCP components and subpath exports, fix token ts export, move deps to catalog

## Unreleased

### Patch Changes

- Add `status.info-subtle` token to light, dark, and brand themes for consistent info badge styling
- Wrap all generated token CSS output in `@layer surf.tokens` for predictable cascade ordering
- Fix `./ts` export pointing to `.ts` instead of `.js` — resolves module-not-found errors for consumers

## 0.1.2

### Patch Changes

- Add `[data-color-mode="light"]` token CSS file (`variables-light.css`) and `./css/light` export so light mode can override inherited dark/brand values in nested ThemeProviders

## 0.1.1

### Patch Changes

- 2007903: Prepare packages for npm publishing: add descriptions, keywords, LICENSE, and per-package READMEs
