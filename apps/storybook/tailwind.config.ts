import { surfKitPreset } from '@surf-kit/theme'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './stories/**/*.{ts,tsx}',
    './.storybook/**/*.{ts,tsx}',
    '../../packages/core/src/**/*.{ts,tsx}',
    '../../packages/agent/src/**/*.{ts,tsx}',
  ],
  presets: [surfKitPreset],
}

export default config
