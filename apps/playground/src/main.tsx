import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './styles.css'

async function bootstrap() {
  // Start MSW only when no live API is configured — when VITE_SURF_API_URL is
  // set, requests go directly to the real backend and MSW must not intercept.
  const useMock = import.meta.env.DEV && !import.meta.env.VITE_SURF_API_URL
  if (useMock) {
    const { worker } = await import('./mock-api/server')
    await worker.start({
      onUnhandledRequest: 'bypass',
      quiet: false,
    })
    console.log('[MSW] Mock API started')
  } else if (import.meta.env.DEV) {
    console.log(`[Playground] Live API: ${import.meta.env.VITE_SURF_API_URL}`)
  }

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}

bootstrap()
