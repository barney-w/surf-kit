# @surf-kit/core

> Accessible React UI primitives for the surf-kit design system

Part of the [surf-kit](https://github.com/barney-w/surf-kit) design system.

## Install

```bash
npm install @surf-kit/core @surf-kit/theme @surf-kit/tokens
```

## Quick Example

```tsx
import { Button, Card, Badge } from '@surf-kit/core';

function App() {
  return (
    <Card>
      <Badge intent="info">New</Badge>
      <h2>Hello surf-kit</h2>
      <Button onPress={() => alert('Pressed!')}>Get Started</Button>
    </Card>
  );
}
```

## What's Included

**Primitives** — Box, Text, Stack, Grid, Separator, VisuallyHidden

**Inputs** — Button, IconButton, TextInput, TextArea, Select, Checkbox, RadioGroup, Switch, SearchInput

**Feedback** — Badge, Spinner, Skeleton, Alert, Toast, ProgressBar, AvatarGenerationLoader

**Overlays** — Dialog, Popover, Tooltip, Sheet, DropdownMenu

**Navigation** — Tabs, Breadcrumb, Sidebar

**Data** — Table, DataList, Card, Accordion

All interactive components use [React Aria](https://react-spectrum.adobe.com/react-aria/) for WCAG 2.1 AA accessibility out of the box.

## Docs

- [Storybook](https://barney-w.github.io/surf-kit/storybook)
- [Contributing](https://github.com/barney-w/surf-kit/blob/main/CONTRIBUTING.md)

## License

[0BSD](./LICENSE)
