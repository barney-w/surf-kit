import { useCallback, useEffect, useRef } from 'react'

type Priority = 'polite' | 'assertive'

export function useAnnounce(): (message: string, priority?: Priority) => void {
  const politeRef = useRef<HTMLDivElement | null>(null)
  const assertiveRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const createRegion = (ariaLive: Priority): HTMLDivElement => {
      const el = document.createElement('div')
      el.setAttribute('aria-live', ariaLive)
      el.setAttribute('aria-atomic', 'true')
      el.setAttribute('role', ariaLive === 'assertive' ? 'alert' : 'status')
      Object.assign(el.style, {
        position: 'absolute',
        width: '1px',
        height: '1px',
        margin: '-1px',
        padding: '0',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: '0',
      })
      document.body.appendChild(el)
      return el
    }

    politeRef.current = createRegion('polite')
    assertiveRef.current = createRegion('assertive')

    return () => {
      politeRef.current?.remove()
      assertiveRef.current?.remove()
    }
  }, [])

  const announce = useCallback((message: string, priority: Priority = 'polite') => {
    const region = priority === 'assertive' ? assertiveRef.current : politeRef.current
    if (region) {
      // Clear then set to trigger screen reader re-announcement
      region.textContent = ''
      requestAnimationFrame(() => {
        region.textContent = message
      })
    }
  }, [])

  return announce
}
