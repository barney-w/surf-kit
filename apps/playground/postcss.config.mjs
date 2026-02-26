import { fileURLToPath } from 'url'

// Pin @source resolution to this package's root, regardless of CWD.
// (The @tailwindcss/postcss `base` defaults to CWD, which varies when
// running from the monorepo root vs from apps/playground directly.)
const base = fileURLToPath(new URL('.', import.meta.url))

export default {
  plugins: {
    '@tailwindcss/postcss': { base },
  },
}
