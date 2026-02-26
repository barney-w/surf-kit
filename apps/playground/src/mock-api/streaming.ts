import type { AgentResponse } from '@surf-kit/agent'

interface StreamConfig {
  response: AgentResponse
  agent: string
}

/**
 * Creates a ReadableStream that emits SSE-formatted events simulating
 * a realistic agent response lifecycle:
 *   phase(thinking) -> phase(retrieving) -> phase(generating) -> deltas -> sources ->
 *   phase(verifying) -> confidence -> verification -> done
 */
export function createSSEStream(config: StreamConfig): ReadableStream<Uint8Array> {
  const { response, agent } = config
  const encoder = new TextEncoder()

  function sseEvent(data: unknown): Uint8Array {
    return encoder.encode(`data: ${JSON.stringify(data)}\n\n`)
  }

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        // 1. Agent assignment
        controller.enqueue(sseEvent({ type: 'agent', agent }))

        // 2. Thinking phase
        controller.enqueue(sseEvent({ type: 'phase', phase: 'thinking' }))
        await delay(500)

        // 3. Retrieving phase
        controller.enqueue(sseEvent({ type: 'phase', phase: 'retrieving' }))
        await delay(1000)

        // 4. Generating phase - stream content character by character (in chunks)
        controller.enqueue(sseEvent({ type: 'phase', phase: 'generating' }))

        const message = response.message
        const chunkSize = 3 // Send a few characters at a time for realistic feel
        for (let i = 0; i < message.length; i += chunkSize) {
          const chunk = message.slice(i, i + chunkSize)
          controller.enqueue(sseEvent({ type: 'delta', content: chunk }))
          // Spread 2 seconds across the full message
          await delay(Math.max(5, 2000 / (message.length / chunkSize)))
        }

        // 5. Send sources one by one
        for (const source of response.sources) {
          controller.enqueue(sseEvent({ type: 'source', source }))
          await delay(100)
        }

        // 6. Verifying phase
        controller.enqueue(sseEvent({ type: 'phase', phase: 'verifying' }))
        await delay(500)

        // 7. Confidence breakdown
        controller.enqueue(sseEvent({ type: 'confidence', breakdown: response.confidence }))
        await delay(100)

        // 8. Verification result
        controller.enqueue(sseEvent({ type: 'verification', result: response.verification }))
        await delay(100)

        // 9. Done event with full response
        controller.enqueue(sseEvent({ type: 'done', response }))
        controller.enqueue(encoder.encode('data: [DONE]\n\n'))

        controller.close()
      } catch (err) {
        controller.error(err)
      }
    },
  })
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
