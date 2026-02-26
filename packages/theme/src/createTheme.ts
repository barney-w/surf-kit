import type { Theme, ThemeConfig } from './types'

/**
 * Creates a Theme object from configuration.
 *
 * The returned Theme can be passed to <ThemeProvider theme={myTheme}>.
 * Override CSS custom properties by providing an `overrides` map keyed
 * by token name (without the `--surf-` prefix).
 */
export function createTheme(config: ThemeConfig): Theme {
  const cssVars: Record<string, string> = {}

  if (config.overrides) {
    for (const [key, value] of Object.entries(config.overrides)) {
      // Store with the full custom-property name
      const varName = key.startsWith('--') ? key : `--surf-${key}`
      cssVars[varName] = value
    }
  }

  return {
    name: config.name,
    cssVars,
  }
}
