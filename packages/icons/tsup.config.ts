import { defineConfig } from 'tsup'
export default defineConfig((options) => ({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: !options.watch,
  splitting: true,
  treeshake: true,
  sourcemap: true,
  clean: !options.watch,
  external: ['react', 'react-dom'],
}))
