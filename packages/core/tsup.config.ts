import { defineConfig } from 'tsup'
export default defineConfig((options) => ({
  entry: [
    'src/index.ts',
    'src/primitives/index.ts',
    'src/inputs/index.ts',
    'src/feedback/index.ts',
    'src/overlay/index.ts',
    'src/navigation/index.ts',
    'src/data/index.ts',
    'src/layout/index.ts',
  ],
  format: ['esm', 'cjs'],
  dts: !options.watch,
  splitting: true,
  sourcemap: true,
  clean: !options.watch,
  external: ['react', 'react-dom', /^@surf-kit\//],
}))
