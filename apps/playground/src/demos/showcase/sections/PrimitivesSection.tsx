import {
  Box,
  Text,
  Stack,
  Grid,
  Separator,
  VisuallyHidden,
} from "@surf-kit/core";
import { SectionWrapper } from "./SectionWrapper";

export function PrimitivesSection() {
  return (
    <SectionWrapper title="Primitives">
      <Stack gap={6}>
        {/* Text sizes */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            Text — sizes &amp; weights
          </Text>
          <Stack gap={1}>
            <Text size="2xl" weight="bold">
              2xl Bold heading
            </Text>
            <Text size="xl" weight="semibold">
              xl Semibold subheading
            </Text>
            <Text size="lg">lg Regular text</Text>
            <Text size="base">base Default body copy</Text>
            <Text size="sm" color="secondary">
              sm Secondary caption
            </Text>
            <Text size="xs" color="muted">
              xs Muted fine print
            </Text>
          </Stack>
        </div>

        <Separator />

        {/* Text colors */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            Text — colors
          </Text>
          <Stack direction="horizontal" gap={4}>
            <Text color="primary">Primary</Text>
            <Text color="secondary">Secondary</Text>
            <Text color="muted">Muted</Text>
            <Text color="accent">Accent</Text>
            <Text color="error">Error</Text>
            <Text color="success">Success</Text>
          </Stack>
        </div>

        <Separator />

        {/* Stack */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            Stack — horizontal &amp; vertical
          </Text>
          <Stack direction="horizontal" gap={4}>
            <Box className="px-4 py-2 rounded-lg bg-brand-cyan/10 border border-brand-cyan/30">
              <Text size="sm">Item 1</Text>
            </Box>
            <Box className="px-4 py-2 rounded-lg bg-brand-cyan/10 border border-brand-cyan/30">
              <Text size="sm">Item 2</Text>
            </Box>
            <Box className="px-4 py-2 rounded-lg bg-brand-cyan/10 border border-brand-cyan/30">
              <Text size="sm">Item 3</Text>
            </Box>
          </Stack>
        </div>

        <Separator />

        {/* Grid */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            Grid — 3 columns
          </Text>
          <Grid columns={3} gap={3}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <Box
                key={n}
                className="px-4 py-3 rounded-lg bg-brand-gold/10 border border-brand-gold/20 text-center"
              >
                <Text size="sm">{n}</Text>
              </Box>
            ))}
          </Grid>
        </div>

        <Separator />

        {/* Separator + VisuallyHidden */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            Separator (above) &amp; VisuallyHidden
          </Text>
          <Text size="sm">
            There is a{" "}
            <VisuallyHidden>screen-reader-only text here saying: secret message</VisuallyHidden>
            VisuallyHidden element in this sentence (inspect the DOM to see it).
          </Text>
        </div>
      </Stack>
    </SectionWrapper>
  );
}
