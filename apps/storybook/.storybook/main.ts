import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(ts|tsx)'],
  framework: '@storybook/react-vite',
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
  ],
}
export default config
