import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { ChatMessage } from '../../types/chat'
import { useConversation } from '../useConversation'

describe('useConversation', () => {
  beforeEach(() => {
    // jsdom localStorage may not support clear() directly
    const storage: Record<string, string> = {}
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => storage[key] ?? null,
      setItem: (key: string, value: string) => {
        storage[key] = value
      },
      removeItem: (key: string) => {
        delete storage[key]
      },
      clear: () => {
        Object.keys(storage).forEach((k) => {
          delete storage[k]
        })
      },
      get length() {
        return Object.keys(storage).length
      },
      key: (i: number) => Object.keys(storage)[i] ?? null,
    })
  })

  it('starts with empty conversations', () => {
    const { result } = renderHook(() => useConversation())

    expect(result.current.conversations).toEqual([])
    expect(result.current.current).toBeNull()
  })

  it('creates a conversation', () => {
    const { result } = renderHook(() => useConversation())

    let _conv: ReturnType<typeof result.current.create>
    act(() => {
      _conv = result.current.create('Test Conversation')
    })

    expect(result.current.conversations).toHaveLength(1)
    expect(result.current.conversations[0].title).toBe('Test Conversation')
    expect(result.current.current).not.toBeNull()
    expect(result.current.current?.title).toBe('Test Conversation')
  })

  it('creates with default title', () => {
    const { result } = renderHook(() => useConversation())

    act(() => {
      result.current.create()
    })

    expect(result.current.conversations[0].title).toBe('New Conversation')
  })

  it('lists conversations as summaries', () => {
    const { result } = renderHook(() => useConversation())

    act(() => {
      result.current.create('First')
      result.current.create('Second')
    })

    const summaries = result.current.list()
    expect(summaries).toHaveLength(2)
    expect(summaries[0]).toHaveProperty('id')
    expect(summaries[0]).toHaveProperty('title')
    expect(summaries[0]).toHaveProperty('lastMessage')
    expect(summaries[0]).toHaveProperty('updatedAt')
    expect(summaries[0]).toHaveProperty('messageCount')
  })

  it('loads a conversation by id', () => {
    const { result } = renderHook(() => useConversation())

    let conv1Id: string
    act(() => {
      const c = result.current.create('First')
      conv1Id = c.id
      result.current.create('Second')
    })

    act(() => {
      result.current.load(conv1Id!)
    })

    expect(result.current.current?.title).toBe('First')
  })

  it('returns null for unknown conversation id', () => {
    const { result } = renderHook(() => useConversation())

    let loaded: ReturnType<typeof result.current.load>
    act(() => {
      loaded = result.current.load('nonexistent')
    })

    expect(loaded!).toBeNull()
    expect(result.current.current).toBeNull()
  })

  it('deletes a conversation', () => {
    const { result } = renderHook(() => useConversation())

    let convId: string
    act(() => {
      const c = result.current.create('To Delete')
      convId = c.id
    })

    expect(result.current.conversations).toHaveLength(1)

    act(() => {
      result.current.delete(convId!)
    })

    expect(result.current.conversations).toHaveLength(0)
    expect(result.current.current).toBeNull()
  })

  it('renames a conversation', () => {
    const { result } = renderHook(() => useConversation())

    let convId: string
    act(() => {
      const c = result.current.create('Original')
      convId = c.id
    })

    act(() => {
      result.current.rename(convId!, 'Renamed')
    })

    expect(result.current.conversations[0].title).toBe('Renamed')
    expect(result.current.current?.title).toBe('Renamed')
  })

  it('adds messages to a conversation', () => {
    const { result } = renderHook(() => useConversation())

    let convId: string
    act(() => {
      const c = result.current.create('Chat')
      convId = c.id
    })

    const message: ChatMessage = {
      id: 'msg-1',
      role: 'user',
      content: 'Hello',
      timestamp: new Date(),
    }

    act(() => {
      result.current.addMessage(convId!, message)
    })

    expect(result.current.current?.messages).toHaveLength(1)
    expect(result.current.current?.messages[0].content).toBe('Hello')
  })

  it('persists conversations to localStorage', () => {
    const { result } = renderHook(() =>
      useConversation({ persist: true, storageKey: 'test-convos' }),
    )

    act(() => {
      result.current.create('Persisted')
    })

    const stored = window.localStorage.getItem('test-convos:list')
    expect(stored).not.toBeNull()
    const parsed = JSON.parse(stored!)
    expect(parsed).toHaveLength(1)
    expect(parsed[0].title).toBe('Persisted')
  })
})
