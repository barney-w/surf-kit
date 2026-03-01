import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">surf-kit</h1>
      <p className="mb-2 text-xl text-fd-muted-foreground">AI-First Design System</p>
      <p className="mb-8 max-w-xl text-fd-muted-foreground">
        Purpose-built components for agent interfaces. Trust through transparency, accessible by
        default, enterprise-grade theming, and a composable architecture.
      </p>
      <div className="flex gap-4">
        <Link
          href="/docs/getting-started"
          className="rounded-lg bg-fd-primary px-6 py-3 text-sm font-medium text-fd-primary-foreground transition-colors hover:bg-fd-primary/90"
        >
          Get Started
        </Link>
        <Link
          href="/docs/components/core/button"
          className="rounded-lg border border-fd-border px-6 py-3 text-sm font-medium transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
        >
          Components
        </Link>
      </div>

      <div className="mt-16 grid max-w-3xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          title="AI-First"
          description="Purpose-built for agent interfaces, not an afterthought."
        />
        <FeatureCard
          title="Transparent"
          description="Every response shows sources, confidence, and verification."
        />
        <FeatureCard
          title="Accessible"
          description="WCAG 2.2 AA, screen readers, keyboard, reduced motion."
        />
        <FeatureCard
          title="Themeable"
          description="Token-based, multi-theme, dark and light mode."
        />
        <FeatureCard
          title="Composable"
          description="Use the full page layout or individual components."
        />
        <FeatureCard
          title="Enterprise"
          description="Production-ready with comprehensive test coverage."
        />
      </div>
    </main>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-lg border border-fd-border p-4 text-left">
      <h3 className="mb-1 font-semibold">{title}</h3>
      <p className="text-sm text-fd-muted-foreground">{description}</p>
    </div>
  )
}
