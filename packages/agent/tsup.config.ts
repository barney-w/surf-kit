import { defineConfig } from 'tsup'
export default defineConfig((options) => ({
  entry: [
    'src/index.ts',
    'src/hooks.ts',
    'src/chat/index.ts',
    'src/response/index.ts',
    'src/sources/index.ts',
    'src/confidence/index.ts',
    'src/agent-identity/index.ts',
    'src/streaming/index.ts',
    'src/layouts/index.ts',
    'src/feedback/index.ts',
    'src/mcp/index.ts',
  ],
  format: ['esm', 'cjs'],
  dts: !options.watch,
  splitting: false,
  sourcemap: true,
  clean: !options.watch,
  external: ['react', 'react-dom', /^@surf-kit\//],
}))
