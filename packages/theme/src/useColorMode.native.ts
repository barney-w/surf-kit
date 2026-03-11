'use client'

import { useCallback } from 'react'
import { Appearance } from 'react-native'
import { useTheme } from './useTheme'
import type { ColorMode, ColorModePreference } from './types'

export interface UseColorModeReturn {
  colorMode: ColorMode
  setColorMode: (mode: ColorModePreference) => void
  toggleColorMode: () => void
  systemPreference: ColorMode
}

export function useColorMode(): UseColorModeReturn {
  const { colorMode, setColorMode } = useTheme()
  const systemPreference: ColorMode =
    (Appearance.getColorScheme() as ColorMode) ?? 'light'

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
