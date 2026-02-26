import React, { useState } from 'react'
import { ThemeProvider } from '@surf-kit/theme'
import { FullPageDemo } from './demos/full-page/FullPageDemo'
import { LayoutDemos } from './demos/layouts/LayoutDemos'

type ColorMode = 'light' | 'dark'
type DemoView = 'full-page' | 'layouts'

export function App() {
  const [colorMode, setColorMode] = useState<ColorMode>('light')
  const [view, setView] = useState<DemoView>('full-page')

  const toggleTheme = () => {
    setColorMode((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeProvider colorMode={colorMode}>
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: colorMode === 'dark' ? '#111827' : '#ffffff',
          color: colorMode === 'dark' ? '#f3f4f6' : '#111827',
          transition: 'background-color 0.2s, color 0.2s',
          // CSS custom properties for child components
          ['--border-color' as string]: colorMode === 'dark' ? '#374151' : '#e5e7eb',
          ['--user-bubble' as string]: '#2563eb',
          ['--assistant-bubble' as string]: colorMode === 'dark' ? '#1f2937' : '#f3f4f6',
          ['--input-bg' as string]: colorMode === 'dark' ? '#1f2937' : '#ffffff',
          ['--text-color' as string]: colorMode === 'dark' ? '#f3f4f6' : '#111827',
        }}
      >
        {/* Header */}
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 24px',
            borderBottom: '1px solid var(--border-color, #e5e7eb)',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 20 }}>🏄</span>
            <h1 style={{ fontSize: 16, fontWeight: 700 }}>Surf Kit Playground</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <select
              value={view}
              onChange={(e) => setView(e.target.value as DemoView)}
              style={{
                padding: '6px 14px',
                borderRadius: 8,
                border: '1px solid var(--border-color, #e5e7eb)',
                background: 'transparent',
                cursor: 'pointer',
                fontSize: 14,
                color: 'inherit',
              }}
              aria-label="Select demo view"
            >
              <option value="full-page">Full Page Chat</option>
              <option value="layouts">Layout Components</option>
            </select>
            <button
              onClick={toggleTheme}
              style={{
                padding: '6px 14px',
                borderRadius: 8,
                border: '1px solid var(--border-color, #e5e7eb)',
                background: 'transparent',
                cursor: 'pointer',
                fontSize: 14,
                color: 'inherit',
              }}
              aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
            >
              {colorMode === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
          </div>
        </header>

        {/* Main content */}
        <main style={{ flex: 1, overflow: 'hidden' }}>
          {view === 'full-page' ? <FullPageDemo /> : <LayoutDemos />}
        </main>
      </div>

      {/* Phase spinner animation */}
      <style>{`
        .phase-spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid currentColor;
          border-right-color: transparent;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </ThemeProvider>
  )
}
