import { useState, useCallback, useRef } from 'react'

export function useClipboard(): { copy: (text: string) => Promise<void>; copied: boolean } {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const copy = useCallback(async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(true)

    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setCopied(false), 2000)
  }, [])

  return { copy, copied }
}
