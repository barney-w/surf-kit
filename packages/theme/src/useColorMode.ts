import { useCallback, useEffect, useState } from 'react'
import { useTheme } from './useTheme'
import type { ColorMode, ColorModePreference } from './types'

function getSystemPreference(): ColorMode {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export interface UseColorModeReturn {
  /** Resolved color mode ('light' | 'dark') */
  colorMode: ColorMode
  /** Update the color mode preference */
  setColorMode: (mode: ColorModePreference) => void
  /** Toggle between light and dark (ignores 'system') */
  toggleColorMode: () => void
  /** The OS-level color scheme preference */
  systemPreference: ColorMode
}

/**
 * Provides color mode controls. Must be called within a <ThemeProvider>.
 */
export function useColorMode(): UseColorModeReturn {
  const { colorMode, setColorMode } = useTheme()
  const [systemPreference, setSystemPreference] = useState<ColorMode>(
    getSystemPreference,
  )

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => {
      setSystemPreference(e.matches ? 'dark' : 'light')
    }
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  const toggleColorMode = useCallback(() => {
    setColorMode(colorMode === 'light' ? 'dark' : 'light')
  }, [colorMode, setColorMode])

  return {
    colorMode,
    setColorMode,
    toggleColorMode,
    systemPreference,
  }
}
