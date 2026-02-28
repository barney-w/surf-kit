# @surf-kit/agent

## Unreleased

### Minor Changes

- Add MCP components: MCPToolCall, MCPResourceView, MCPServerStatus, MCPApprovalDialog
- Add MCP type definitions and `./mcp` subpath export
- Add per-category subpath exports: `./chat`, `./response`, `./sources`, `./confidence`, `./agent-identity`, `./streaming`, `./layouts`, `./feedback`
- Move `react-aria` from devDependencies to dependencies (required at runtime by MCPApprovalDialog)

## 0.3.0

### Minor Changes

- Polish component styling to match full-page demo quality
- MessageBubble: use cream text on user bubbles, entry animations, `animated` prop, bg-surface for assistant bubbles
- MessageComposer: auto-resize textarea, transparent bg, glow hover on send button, removed hardcoded border/bg wrapper
- FollowUpChips: transparent bg, muted text, warm accent hover, flex-wrap layout
- WelcomeScreen: larger title, `icon` prop, entry animation, updated chip styling
- StreamingMessage: wrap content in assistant-style bubble with entry animation
- ThinkingIndicator: add entry animation, friendlier phase labels with "..." suffix

## 0.2.0

### Minor Changes

- Add TypingIndicator streaming component
- Add TextGlimmer loading skeleton component
- Add StreamingList incremental list component
- Add StreamingStructure incremental key-value component

## 0.1.1

### Patch Changes

- 2007903: Prepare packages for npm publishing: add descriptions, keywords, LICENSE, and per-package READMEs
- Updated dependencies [2007903]
  - @surf-kit/core@0.1.1
  - @surf-kit/theme@0.1.1
  - @surf-kit/hooks@0.1.1
  - @surf-kit/icons@0.1.1
