import { AspectRatio, ScrollArea, Resizable, Stack, Text } from "@surf-kit/core";
import { SectionWrapper } from "./SectionWrapper";

export function LayoutSection() {
  return (
    <SectionWrapper title="Layout">
      <Stack gap={6}>
        {/* AspectRatio */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            AspectRatio (16:9)
          </Text>
          <div className="max-w-xs">
            <AspectRatio ratio={16 / 9}>
              <div className="w-full h-full rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center">
                <Text size="sm" color="muted">
                  16 : 9
                </Text>
              </div>
            </AspectRatio>
          </div>
        </div>

        {/* ScrollArea */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            ScrollArea
          </Text>
          <ScrollArea maxHeight={150}>
            <Stack gap={1} className="p-2">
              {Array.from({ length: 20 }, (_, i) => (
                <Text key={i} size="sm" color="secondary">
                  Scrollable item {i + 1}
                </Text>
              ))}
            </Stack>
          </ScrollArea>
        </div>

        {/* Resizable */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            Resizable (drag the divider)
          </Text>
          <div className="h-32">
            <Resizable defaultSize={40} minSize={20} maxSize={80}>
              <div className="h-full rounded-l-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center">
                <Text size="sm">Left pane</Text>
              </div>
              <div className="h-full rounded-r-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center">
                <Text size="sm">Right pane</Text>
              </div>
            </Resizable>
          </div>
        </div>
      </Stack>
    </SectionWrapper>
  );
}
