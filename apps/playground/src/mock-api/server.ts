import { http, HttpResponse } from 'msw'
import { setupWorker } from 'msw/browser'
import { selectResponse } from './responses'
import { createSSEStream } from './streaming'

const handlers = [
  // POST /api/v1/chat - SSE streaming response
  http.post('/api/v1/chat', async ({ request }) => {
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
  }),

  // GET /api/v1/conversations - return conversation list
  http.get('/api/v1/conversations', () => {
    return HttpResponse.json([
      {
        id: 'conv-1',
        title: 'Leave Policy Questions',
        lastMessage: 'How many days of annual leave do I get?',
        updatedAt: new Date().toISOString(),
        messageCount: 4,
      },
      {
        id: 'conv-2',
        title: 'Password Reset Help',
        lastMessage: 'How do I reset my password?',
        updatedAt: new Date(Date.now() - 86400000).toISOString(),
        messageCount: 2,
      },
      {
        id: 'conv-3',
        title: 'Upcoming Board Meetings',
        lastMessage: 'When is the next board meeting?',
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
