import { useState, useCallback } from "react";
import {
  useClipboard,
  useMediaQuery,
  useLocalStorage,
  useKeyboardShortcut,
} from "@surf-kit/hooks";
import { Stack, Text, Separator, Button, Badge, TextInput } from "@surf-kit/core";
import { SectionWrapper } from "./SectionWrapper";

export function HooksSection() {
  // useClipboard
  const { copy, copied } = useClipboard();

  // useMediaQuery
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isDark = useMediaQuery("(prefers-color-scheme: dark)");
  const isReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  // useLocalStorage
  const [storedName, setStoredName] = useLocalStorage("showcase-name", "");

  // useKeyboardShortcut
  const [shortcutCount, setShortcutCount] = useState(0);
  useKeyboardShortcut(
    { key: "k", meta: true },
    useCallback(() => setShortcutCount((c) => c + 1), []),
  );

  return (
    <SectionWrapper title="Hooks">
      <Stack gap={6}>
        {/* useClipboard */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            useClipboard
          </Text>
          <Stack direction="horizontal" gap={2} align="center">
            <Button
              intent="secondary"
              size="sm"
              onPress={() => copy("Hello from surf-kit!")}
            >
              {copied ? "Copied!" : "Copy text"}
            </Button>
            <Text size="xs" color="muted">
              Copies &ldquo;Hello from surf-kit!&rdquo; to clipboard
            </Text>
          </Stack>
        </div>

        <Separator />

        {/* useMediaQuery */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            useMediaQuery
          </Text>
          <Stack gap={1}>
            <Stack direction="horizontal" gap={2} align="center">
              <Badge intent={isMobile ? "success" : "default"} size="sm">
                {isMobile ? "Yes" : "No"}
              </Badge>
              <Text size="xs" color="muted">
                max-width: 640px (mobile)
              </Text>
            </Stack>
            <Stack direction="horizontal" gap={2} align="center">
              <Badge intent={isDark ? "success" : "default"} size="sm">
                {isDark ? "Yes" : "No"}
              </Badge>
              <Text size="xs" color="muted">
                prefers-color-scheme: dark
              </Text>
            </Stack>
            <Stack direction="horizontal" gap={2} align="center">
              <Badge intent={isReducedMotion ? "warning" : "default"} size="sm">
                {isReducedMotion ? "Yes" : "No"}
              </Badge>
              <Text size="xs" color="muted">
                prefers-reduced-motion: reduce
              </Text>
            </Stack>
          </Stack>
        </div>

        <Separator />

        {/* useLocalStorage */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            useLocalStorage
          </Text>
          <Stack gap={2}>
            <TextInput
              label="Stored name"
              placeholder="Type something — it persists in localStorage"
              value={storedName}
              onChange={setStoredName}
            />
            <Text size="xs" color="muted">
              Key: &ldquo;showcase-name&rdquo; — value persists across page reloads.
            </Text>
          </Stack>
        </div>

        <Separator />

        {/* useKeyboardShortcut */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            useKeyboardShortcut
          </Text>
          <Stack gap={1}>
            <Text size="sm">
              Press{" "}
              <kbd className="px-1.5 py-0.5 rounded border border-brand-gold/30 text-xs font-mono">
                ⌘K
              </kbd>{" "}
              — triggered{" "}
              <Badge intent="info" size="sm">
                {shortcutCount}
              </Badge>{" "}
              times
            </Text>
          </Stack>
        </div>
      </Stack>
    </SectionWrapper>
  );
}
