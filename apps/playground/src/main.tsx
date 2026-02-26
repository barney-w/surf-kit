import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'

async function bootstrap() {
  // Start MSW service worker in development
  if (import.meta.env.DEV) {
    const { worker } = await import('./mock-api/server')
    await worker.start({
      onUnhandledRequest: 'bypass',
      quiet: false,
    })
    console.log('[MSW] Mock API started')
  }

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}

bootstrap()
