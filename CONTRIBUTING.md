# Contributing to surf-kit

Thank you for your interest in contributing to surf-kit! This guide covers the development setup, coding standards, and PR process.

---

## Development Setup

### Prerequisites

- **Node.js** >= 20
- **pnpm** >= 9 (`corepack enable` to use the version pinned in `package.json`)

### Getting Started

```bash
git clone https://github.com/your-org/surf-kit.git
cd surf-kit
pnpm install
pnpm build
pnpm test
```

### Common Commands

| Command | Description |
| --- | --- |
| `pnpm build` | Build all packages (via Turborepo) |
| `pnpm test` | Run all tests |
| `pnpm typecheck` | Type-check all packages |
| `pnpm dev` | Start dev mode with hot reload |
| `pnpm storybook` | Launch Storybook locally |

---

## Pull Request Guidelines

1. **Branch from `main`** -- create a feature branch with a descriptive name (e.g., `feat/combobox`, `fix/button-focus-ring`).
2. **Keep PRs focused** -- one feature or fix per PR. Smaller PRs are reviewed faster.
3. **Add a changeset** -- run `pnpm changeset` and follow the prompts to describe your change. This is required for any change that affects published packages.
4. **Write tests** -- every component should have unit tests and at least one accessibility test using `vitest-axe`.
5. **Pass CI** -- make sure `pnpm build`, `pnpm test`, and `pnpm typecheck` all pass before requesting review.
6. **Update stories** -- if you add or modify a component, add or update the corresponding Storybook story.

---

## Coding Standards

### TypeScript

- Strict mode is enabled across all packages.
- Export explicit types for all public component props (e.g., `ButtonProps`, `AgentChatProps`).
- Prefer `interface` for component props, `type` for unions and utility types.

### Accessibility

- Use **React Aria** hooks and components for interactive primitives (buttons, menus, dialogs, etc.).
- All components must meet **WCAG 2.1 AA** standards.
- Every component test file should include at least one `expect(results).toHaveNoViolations()` assertion using `vitest-axe`.

### Styling

- Use **class-variance-authority (CVA)** to define component variants.
- Use **tailwind-merge** (`twMerge`) to merge class names and allow consumer overrides.
- Design tokens come from `@surf-kit/tokens` -- never hard-code color or spacing values.

### Testing

- Test framework: **Vitest** with **jsdom** environment.
- Rendering: **@testing-library/react** with the custom `render` wrapper from `@surf-kit/test-utils` (includes `ThemeProvider`).
- Accessibility: **vitest-axe** for automated a11y checks.
- Aim for meaningful assertions that test behaviour, not implementation details.

### File Structure

Each component lives in its own directory under the relevant package:

```
packages/core/src/inputs/Button/
  Button.tsx        # Component implementation
  Button.test.tsx   # Tests
  index.ts          # Public re-export
```

---

## Adding a New Component

1. Create the component directory under the appropriate category (`inputs/`, `feedback/`, `overlay/`, `layout/`).
2. Implement the component using React Aria for accessibility and CVA for variants.
3. Export it from the package `src/index.ts`.
4. Write tests (unit + a11y).
5. Add a Storybook story under `apps/storybook/stories/`.
6. Run `pnpm changeset` to record the change.

---

## Questions?

Open an issue or start a discussion on GitHub. We are happy to help!
