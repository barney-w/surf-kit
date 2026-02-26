import { useContext } from 'react'
import { ThemeContext } from './ThemeProvider'
import type { ThemeContextValue } from './types'

/**
 * Returns the current theme and color mode from ThemeProvider.
 *
 * Must be called within a <ThemeProvider>.
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (context === null) {
    throw new Error(
      'useTheme() must be used within a <ThemeProvider>. ' +
        'Wrap your component tree with <ThemeProvider> from @surf-kit/theme.',
    )
  }
  return context
}
