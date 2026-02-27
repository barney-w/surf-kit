import { http, HttpResponse } from 'msw'
import { setupWorker } from 'msw/browser'
import { selectResponse } from './responses'
import { createSSEStream } from './streaming'

async function streamChatResponse(request: Request) {
  const body = (await request.json()) as { message?: string }
  const message = body.message ?? ''

  const { response, agent } = selectResponse(message)
  const stream = createSSEStream({ response, agent })

  return new HttpResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}

const handlers = [
  // POST /api/v1/chat - SSE streaming response (used by FullPageDemo)
  http.post('/api/v1/chat', async ({ request }) => {
    return streamChatResponse(request)
  }),

  // POST /api/v1/chat/stream - SSE streaming response (default AgentChat path)
  http.post('/api/v1/chat/stream', async ({ request }) => {
    return streamChatResponse(request)
  }),

  // GET /api/v1/conversations - return conversation list
  http.get('/api/v1/conversations', () => {
    return HttpResponse.json([
      {
        id: 'conv-1',
        title: 'Pricing Plans',
        lastMessage: 'What is included in the Pro plan?',
        updatedAt: new Date().toISOString(),
        messageCount: 4,
      },
      {
        id: 'conv-2',
        title: 'Getting Started',
        lastMessage: 'How do I connect my first integration?',
        updatedAt: new Date(Date.now() - 86400000).toISOString(),
        messageCount: 2,
      },
      {
        id: 'conv-3',
        title: 'API Rate Limits',
        lastMessage: 'How do I increase requests per minute?',
        updatedAt: new Date(Date.now() - 172800000).toISOString(),
        messageCount: 6,
      },
    ])
  }),

  // POST /api/v1/feedback - accept feedback
  http.post('/api/v1/feedback', async ({ request }) => {
    const body = await request.json()
    console.log('[MSW] Feedback received:', body)
    return HttpResponse.json({ success: true })
  }),
]

export const worker = setupWorker(...handlers)
