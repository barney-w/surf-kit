import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: !options.watch,
  splitting: false,
  sourcemap: true,
  clean: !options.watch,
  external: ['react', 'tailwindcss'],
}))
