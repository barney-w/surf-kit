import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/surf-kit/playground/',
  plugins: [tailwindcss(), react()],
  server: {
    port: 3000,
    open: true,
  },
})
