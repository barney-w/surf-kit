# @surf-kit/core

## 0.1.2

### Patch Changes

- Updated dependencies [baa7b33]
  - @surf-kit/tokens@0.1.2
  - @surf-kit/theme@0.1.2

## Unreleased

### Minor Changes

- Add per-category subpath exports: `./primitives`, `./inputs`, `./feedback`, `./overlay`, `./navigation`, `./data`, `./layout`

### Patch Changes

- Fix Badge `default` and `info` intents using hardcoded colors that break in brand theme — now use semantic tokens
- Fix Button not forwarding refs or extra props — now uses `forwardRef` and `mergeProps` so overlay components (DropdownMenu, Tooltip) can attach event handlers

## 0.2.0

### Minor Changes

- Add layout components: AspectRatio, ScrollArea, Resizable
- Add input components: Toggle, ToggleGroup, Slider, Calendar
- Add data components: Collapsible, Carousel
- Add feedback component: Avatar
- Add overlay components: HoverCard, Drawer, ContextMenu, Command
- Add navigation components: Pagination, NavigationMenu, Menubar
- Add `@internationalized/date` dependency for Calendar component

## 0.1.1

### Patch Changes

- 2007903: Prepare packages for npm publishing: add descriptions, keywords, LICENSE, and per-package READMEs
- Updated dependencies [2007903]
  - @surf-kit/tokens@0.1.1
  - @surf-kit/theme@0.1.1
  - @surf-kit/hooks@0.1.1
