import type { Config } from 'tailwindcss'
import { surfKitPreset } from '@surf-kit/theme'

export default {
  content: [
    './app/**/*.{ts,tsx}',
    '../../packages/core/src/**/*.native.tsx',
    '../../packages/agent/src/**/*.native.tsx',
    '../../packages/theme/src/**/*.native.tsx',
  ],
  presets: [surfKitPreset],
} satisfies Config
