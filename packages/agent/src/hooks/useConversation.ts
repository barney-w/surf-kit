import { useCallback, useState } from 'react'
import type { ChatMessage, ConversationSummary } from '../types/chat'

export interface Conversation {
  id: string
  title: string
  messages: ChatMessage[]
  createdAt: Date
  updatedAt: Date
}

export interface UseConversationOptions {
  /** Enable localStorage persistence */
  persist?: boolean
  /** localStorage key prefix */
  storageKey?: string
}

const STORAGE_PREFIX = 'surf-kit-conversations'

function getStorageKey(prefix: string) {
  return `${prefix}:list`
}

function loadFromStorage(storageKey: string): Conversation[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(getStorageKey(storageKey))
    if (!raw) return []
    const parsed = JSON.parse(raw) as Array<Conversation & { createdAt: string; updatedAt: string }>
    return parsed.map((c) => ({
      ...c,
      createdAt: new Date(c.createdAt),
      updatedAt: new Date(c.updatedAt),
      messages: c.messages.map((m) => ({
        ...m,
        timestamp: new Date(m.timestamp as unknown as string),
      })),
    }))
  } catch {
    return []
  }
}

function saveToStorage(storageKey: string, conversations: Conversation[]) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(getStorageKey(storageKey), JSON.stringify(conversations))
  } catch {
    // Storage full or unavailable
  }
}

let idCounter = 0
function generateId(): string {
  return `conv-${Date.now()}-${++idCounter}`
}

export function useConversation(options: UseConversationOptions = {}) {
  const { persist = false, storageKey = STORAGE_PREFIX } = options

  const [conversations, setConversations] = useState<Conversation[]>(() =>
    persist ? loadFromStorage(storageKey) : [],
  )
  const [current, setCurrent] = useState<Conversation | null>(null)

  const persistIfNeeded = useCallback(
    (convs: Conversation[]) => {
      if (persist) saveToStorage(storageKey, convs)
    },
    [persist, storageKey],
  )

  const create = useCallback(
    (title?: string): Conversation => {
      const now = new Date()
      const conv: Conversation = {
        id: generateId(),
        title: title ?? 'New Conversation',
        messages: [],
        createdAt: now,
        updatedAt: now,
      }
      setConversations((prev) => {
        const next = [conv, ...prev]
        persistIfNeeded(next)
        return next
      })
      setCurrent(conv)
      return conv
    },
    [persistIfNeeded],
  )

  const list = useCallback((): ConversationSummary[] => {
    return conversations.map((c) => ({
      id: c.id,
      title: c.title,
      lastMessage: c.messages.length > 0 ? c.messages[c.messages.length - 1].content : '',
      updatedAt: c.updatedAt,
      messageCount: c.messages.length,
    }))
  }, [conversations])

  const load = useCallback(
    (id: string): Conversation | null => {
      const conv = conversations.find((c) => c.id === id) ?? null
      setCurrent(conv)
      return conv
    },
    [conversations],
  )

  const remove = useCallback(
    (id: string) => {
      setConversations((prev) => {
        const next = prev.filter((c) => c.id !== id)
        persistIfNeeded(next)
        return next
      })
      setCurrent((prev) => (prev?.id === id ? null : prev))
    },
    [persistIfNeeded],
  )

  const rename = useCallback(
    (id: string, title: string) => {
      setConversations((prev) => {
        const next = prev.map((c) => (c.id === id ? { ...c, title, updatedAt: new Date() } : c))
        persistIfNeeded(next)
        return next
      })
      setCurrent((prev) => (prev?.id === id ? { ...prev, title, updatedAt: new Date() } : prev))
    },
    [persistIfNeeded],
  )

  const addMessage = useCallback(
    (conversationId: string, message: ChatMessage) => {
      setConversations((prev) => {
        const next = prev.map((c) =>
          c.id === conversationId
            ? { ...c, messages: [...c.messages, message], updatedAt: new Date() }
            : c,
        )
        persistIfNeeded(next)
        return next
      })
      setCurrent((prev) =>
        prev?.id === conversationId
          ? { ...prev, messages: [...prev.messages, message], updatedAt: new Date() }
          : prev,
      )
    },
    [persistIfNeeded],
  )

  return {
    conversations,
    current,
    create,
    list,
    load,
    delete: remove,
    rename,
    addMessage,
  }
}
