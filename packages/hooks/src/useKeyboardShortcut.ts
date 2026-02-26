import { useEffect } from 'react'

interface ShortcutOptions {
  key: string
  ctrl?: boolean
  meta?: boolean
  shift?: boolean
  alt?: boolean
}

export function useKeyboardShortcut(
  shortcut: ShortcutOptions,
  callback: (event: KeyboardEvent) => void,
): void {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const { key, ctrl, meta, shift, alt } = shortcut
      if (event.key.toLowerCase() !== key.toLowerCase()) return
      if (ctrl && !event.ctrlKey) return
      if (meta && !event.metaKey) return
      if (shift && !event.shiftKey) return
      if (alt && !event.altKey) return

      event.preventDefault()
      callback(event)
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [shortcut, callback])
}
