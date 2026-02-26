import type { Preview } from '@storybook/react'
import { ThemeProvider } from '@surf-kit/theme'
import React from 'react'
import './preview.css'

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const colorMode = context.globals.colorMode || 'light'
      return (
        <ThemeProvider colorMode={colorMode as 'light' | 'dark'}>
          <Story />
        </ThemeProvider>
      )
    },
  ],
  globalTypes: {
    colorMode: {
      description: 'Color mode',
      toolbar: {
        title: 'Color Mode',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    colorMode: 'light',
  },
}
export default preview
