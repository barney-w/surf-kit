import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(ts|tsx)'],
  framework: '@storybook/react-vite',
  addons: [],
  viteFinal(config) {
    const reactPlugin = config.plugins
      ?.flat()
      .find(
        (p): p is Extract<typeof p, { name: string }> =>
          typeof p === 'object' &&
          p !== null &&
          'name' in p &&
          (p as { name: string }).name === 'vite:react-babel',
      )
    if (reactPlugin && 'api' in reactPlugin) {
      const api = reactPlugin.api as { reactBabel: (config: { plugins: unknown[] }) => void }
      api.reactBabel((babelConfig) => {
        babelConfig.plugins.push('babel-plugin-react-compiler')
      })
    }
    return config
  },
}
export default config
