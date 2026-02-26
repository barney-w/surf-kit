import { render as rtlRender, type RenderOptions, type RenderResult } from '@testing-library/react'
import { ThemeProvider } from '@surf-kit/theme'
import React from 'react'

function render(
  ui: React.ReactElement,
  options?: RenderOptions & { colorMode?: 'light' | 'dark' },
): RenderResult {
  const { colorMode = 'light', ...renderOptions } = options ?? {}
  return rtlRender(ui, {
    wrapper: ({ children }) => (
      <ThemeProvider colorMode={colorMode}>{children}</ThemeProvider>
    ),
    ...renderOptions,
  })
}

export { render }
