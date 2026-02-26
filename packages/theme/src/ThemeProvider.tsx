import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type {
  ColorMode,
  ColorModePreference,
  Theme,
  ThemeContextValue,
} from './types'

const DEFAULT_THEME: Theme = {
  name: 'default',
  cssVars: {},
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

function getSystemPreference(): ColorMode {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export interface ThemeProviderProps {
  /** Color mode preference. Defaults to 'system'. */
  colorMode?: ColorModePreference
  /** Theme object (from createTheme). Defaults to the built-in default theme. */
  theme?: Theme
  children: React.ReactNode
}

export function ThemeProvider({
  colorMode: colorModeProp = 'system',
  theme = DEFAULT_THEME,
  children,
}: ThemeProviderProps) {
  const [preference, setPreference] =
    useState<ColorModePreference>(colorModeProp)
  const [systemPref, setSystemPref] = useState<ColorMode>(getSystemPreference)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Sync prop changes into state
  useEffect(() => {
    setPreference(colorModeProp)
  }, [colorModeProp])

  // Listen for OS color-scheme changes
  useEffect(() => {
    if (typeof window === 'undefined') return

    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => {
      setSystemPref(e.matches ? 'dark' : 'light')
    }
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  const resolvedMode: ColorMode =
    preference === 'system' ? systemPref : preference

  // Apply data attributes and CSS variable overrides to wrapper div
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    el.setAttribute('data-color-mode', resolvedMode)
    el.setAttribute('data-theme', theme.name)

    // Apply any CSS variable overrides from the theme
    for (const [key, value] of Object.entries(theme.cssVars)) {
      const varName = key.startsWith('--') ? key : `--surf-${key}`
      el.style.setProperty(varName, value)
    }
  }, [resolvedMode, theme])

  const setColorMode = useCallback((mode: ColorModePreference) => {
    setPreference(mode)
  }, [])

  const contextValue = useMemo<ThemeContextValue>(
    () => ({
      theme,
      colorMode: resolvedMode,
      colorModePreference: preference,
      setColorMode,
    }),
    [theme, resolvedMode, preference, setColorMode],
  )

  return (
    <ThemeContext.Provider value={contextValue}>
      <div ref={wrapperRef} data-color-mode={resolvedMode} data-theme={theme.name}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}
