import { Text } from '@surf-kit/core'

export function SectionWrapper({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-5 rounded-2xl bg-surface/50 border border-border">
      <Text
        as="h3"
        size="xs"
        weight="bold"
        className="uppercase tracking-[0.12em] text-accent mb-4"
      >
        {title}
      </Text>
      {children}
    </div>
  )
}
