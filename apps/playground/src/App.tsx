import { ThemeProvider } from '@surf-kit/theme'
import { useState } from 'react'
import { FullPageDemo, LIVE_API_URL } from './demos/full-page/FullPageDemo'
import { ShowcasePage } from './demos/showcase/ShowcasePage'

type Page = 'chat' | 'showcase'

export function App() {
  const [page, setPage] = useState<Page>('chat')

  return (
    <ThemeProvider colorMode="brand">
      <div
        className="h-screen flex flex-col bg-brand-dark"
        style={{
          background: 'radial-gradient(ellipse at top center, #0a030f 0%, #041F26 70%)',
        }}
      >
        {/* Header */}
        <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 bg-brand-dark/80 backdrop-blur-[12px] border-b border-brand-gold/15 shrink-0">
          {/* Left — logo */}
          <div className="flex items-center gap-3">
            <img
              src={`${import.meta.env.BASE_URL}surf.png`}
              alt="Surf Kit"
              className="w-7 h-7 rounded-md"
            />
            <span className="font-display font-bold text-base text-brand-cream">Surf</span>
            <span className="text-brand-gold/30">/</span>
            <span className="text-brand-cream/50 font-body text-sm">Playground</span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${
                LIVE_API_URL
                  ? 'border-brand-cyan/40 text-brand-cyan'
                  : 'border-brand-gold/30 text-brand-gold/70'
              }`}
            >
              {LIVE_API_URL ? `Live: ${LIVE_API_URL}` : 'Mock API'}
            </span>
          </div>

          {/* Right — page tabs */}
          <nav className="flex items-center gap-1">
            <PageTab label="Chat" isActive={page === 'chat'} onClick={() => setPage('chat')} />
            <PageTab
              label="Showcase"
              isActive={page === 'showcase'}
              onClick={() => setPage('showcase')}
            />
          </nav>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-hidden">
          {page === 'chat' ? <FullPageDemo /> : <ShowcasePage />}
        </main>
      </div>
    </ThemeProvider>
  )
}

function PageTab({
  label,
  isActive,
  onClick,
}: {
  label: string
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-1.5 rounded-lg text-sm font-display font-medium transition-all duration-200 ${
        isActive
          ? 'bg-brand-gold/15 text-brand-gold border border-brand-gold/30'
          : 'text-brand-cream/50 hover:text-brand-cream/80 hover:bg-brand-gold/5 border border-transparent'
      }`}
    >
      {label}
    </button>
  )
}
