import type { Preview } from '@storybook/react'
import { ThemeProvider } from '@surf-kit/theme'
import './preview.css'

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const colorMode = context.globals.colorMode || 'brand'
      return (
        <ThemeProvider colorMode={colorMode as 'light' | 'dark' | 'brand'}>
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
          { value: 'brand', title: 'Brand Dark', icon: 'paintbrush' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    colorMode: 'brand',
  },
}
export default preview
