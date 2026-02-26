/** Resolved color mode applied to the DOM */
export type ColorMode = 'light' | 'dark'

/** User-facing color mode preference (includes 'system') */
export type ColorModePreference = ColorMode | 'system'

/** Theme configuration input for createTheme */
export interface ThemeConfig {
  /** Unique theme name */
  name: string
  /** Optional CSS variable overrides keyed by variable name (without --surf- prefix) */
  overrides?: Record<string, string>
}

/** Resolved theme object */
export interface Theme {
  /** Unique theme name */
  name: string
  /** CSS variable overrides to apply */
  cssVars: Record<string, string>
}

/** Shape of the ThemeContext value */
export interface ThemeContextValue {
  /** The active theme */
  theme: Theme
  /** The resolved color mode ('light' | 'dark') */
  colorMode: ColorMode
  /** The user's color mode preference ('light' | 'dark' | 'system') */
  colorModePreference: ColorModePreference
  /** Update the color mode preference */
  setColorMode: (mode: ColorModePreference) => void
}
