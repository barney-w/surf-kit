'use client'

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { Appearance, View } from 'react-native'
import type {
  ColorMode,
  ColorModePreference,
  Theme,
  ThemeContextValue,
} from './types'
import { ThemeContext } from './ThemeContext'

const DEFAULT_THEME: Theme = {
  name: 'default',
  cssVars: {},
}

function getSystemPreference(): ColorMode {
  return (Appearance.getColorScheme() as ColorMode) ?? 'light'
}

export interface ThemeProviderProps {
  colorMode?: ColorModePreference
  theme?: Theme
  className?: string
  children: React.ReactNode
}

export function ThemeProvider({
  colorMode: colorModeProp = 'system',
  theme = DEFAULT_THEME,
  className,
  children,
}: ThemeProviderProps) {
  const [preference, setPreference] =
    useState<ColorModePreference>(colorModeProp)
  const [systemPref, setSystemPref] = useState<ColorMode>(getSystemPreference)

  useEffect(() => {
    setPreference(colorModeProp)
  }, [colorModeProp])

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemPref((colorScheme as ColorMode) ?? 'light')
    })
    return () => subscription.remove()
  }, [])

  const resolvedMode: ColorMode =
    preference === 'system' ? systemPref : (preference as ColorMode)

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
      <View
        className={className}
        dataSet={{ colorMode: resolvedMode, theme: theme.name }}
        style={{ flex: 1 }}
      >
        {children}
      </View>
    </ThemeContext.Provider>
  )
}
