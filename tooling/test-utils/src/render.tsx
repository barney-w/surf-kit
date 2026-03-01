import { ThemeProvider } from '@surf-kit/theme'
import { type RenderOptions, type RenderResult, render as rtlRender } from '@testing-library/react'
import type React from 'react'

function render(
  ui: React.ReactElement,
  options?: RenderOptions & { colorMode?: 'light' | 'dark' },
): RenderResult {
  const { colorMode = 'light', ...renderOptions } = options ?? {}
  return rtlRender(ui, {
    wrapper: ({ children }) => <ThemeProvider colorMode={colorMode}>{children}</ThemeProvider>,
    ...renderOptions,
  })
}

export { render }
