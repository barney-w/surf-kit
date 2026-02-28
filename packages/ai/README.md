# @surf-kit/ai

Adapter package bridging [surf-kit](https://github.com/barney-w/surf-kit) agent components with [Vercel AI SDK v6](https://sdk.vercel.ai/).

## Installation

```bash
pnpm add @surf-kit/ai ai @ai-sdk/react
```

## Usage

### useAIChat

Wraps `useChat` from `@ai-sdk/react` and maps to surf-kit types (`ChatMessage`, `StreamState`).

```tsx
import { useAIChat } from '@surf-kit/ai'

function Chat() {
  const { messages, streamState, sendMessage, input, setInput, handleSubmit } =
    useAIChat({ api: '/api/chat' })

  return (
    <form onSubmit={handleSubmit}>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button type="submit">Send</button>
    </form>
  )
}
```

### useAIStream

Wraps `useCompletion` from `@ai-sdk/react` for simple text streaming without chat history.

```tsx
import { useAIStream } from '@surf-kit/ai'

function Completion() {
  const { streamState, complete } = useAIStream({ api: '/api/complete' })
  // ...
}
```

### AIChat

Drop-in chat component powered by surf-kit agent UI and the AI SDK.

```tsx
import { AIChat } from '@surf-kit/ai'

function App() {
  return <AIChat api="/api/chat" title="Assistant" />
}
```

## When to Use This vs `@surf-kit/agent`

| | `@surf-kit/agent` | `@surf-kit/ai` |
|---|---|---|
| **Backend** | Custom SSE with surf-kit's bespoke protocol | Vercel AI SDK v6 (`/api/chat`) |
| **Entry point** | `<AgentChat>` | `<AIChat>` |
| **UI components** | surf-kit agent UI | Same surf-kit agent UI |
| **Best for** | Full control over streaming protocol | Standard AI SDK backends (OpenAI, Anthropic, etc.) |

Both packages render the same surf-kit UI components — the difference is how they connect to your backend.

## License

0BSD
