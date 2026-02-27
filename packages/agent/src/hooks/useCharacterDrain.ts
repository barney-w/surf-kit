import { useState, useRef, useEffect } from 'react'

export interface CharacterDrainResult {
  displayed: string
  isDraining: boolean
}

/**
 * Smoothly drains a growing `target` string character-by-character using
 * `requestAnimationFrame`, decoupling visual rendering from network packet
 * timing so text appears to type out instead of arriving in chunks.
 *
 * When `target` resets to empty (e.g. stream finished), the hook continues
 * draining the previous content to completion before resetting, so the
 * typing animation isn't cut short.
 *
 * Design: the RAF loop is long-lived — it does NOT restart on every delta.
 * The tick function is stored in a ref (updated each render) so the loop
 * always reads the latest drainTarget without being cancelled/restarted.
 * A separate kick-start effect re-fires the loop when it was idle and new
 * content arrives.
 */
export function useCharacterDrain(target: string, msPerChar = 15): CharacterDrainResult {
  const [displayed, setDisplayed] = useState('')
  const indexRef = useRef(0)
  const lastTimeRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  // Holds the last non-empty target so we can finish draining after source resets
  const drainTargetRef = useRef('')
  const msPerCharRef = useRef(msPerChar)

  msPerCharRef.current = msPerChar

  // Update drain target when new content arrives; preserve old value on reset
  if (target !== '') {
    drainTargetRef.current = target
  }

  const drainTarget = drainTargetRef.current
  const isDraining = displayed.length < drainTarget.length

  // Tick function stored in ref so the long-lived RAF loop always reads the
  // latest drainTarget and msPerChar without being cancelled/recreated.
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const tickRef = useRef<(now: number) => void>(() => {})
  tickRef.current = (now: number) => {
    const currentTarget = drainTargetRef.current
    if (currentTarget === '') {
      rafRef.current = null
      return
    }

    if (lastTimeRef.current === 0) lastTimeRef.current = now
    const elapsed = now - lastTimeRef.current
    const charsToAdvance = Math.floor(elapsed / msPerCharRef.current)

    if (charsToAdvance > 0 && indexRef.current < currentTarget.length) {
      const nextIndex = Math.min(indexRef.current + charsToAdvance, currentTarget.length)
      indexRef.current = nextIndex
      lastTimeRef.current = now
      setDisplayed(currentTarget.slice(0, nextIndex))
    }

    if (indexRef.current < currentTarget.length) {
      rafRef.current = requestAnimationFrame((t) => tickRef.current(t))
    } else {
      rafRef.current = null
    }
  }

  // Kick-start the RAF loop when new content arrives and the loop is idle.
  // No cleanup here — we intentionally do NOT cancel the running loop when
  // drainTarget grows; the long-lived tick will pick up new chars automatically.
  useEffect(() => {
    if (
      drainTargetRef.current !== '' &&
      indexRef.current < drainTargetRef.current.length &&
      rafRef.current === null
    ) {
      rafRef.current = requestAnimationFrame((t) => tickRef.current(t))
    }
  }, [drainTarget]) // drainTarget change = new content; check if loop needs kicking

  // Once drain completes and source stream is already done, reset all state
  useEffect(() => {
    if (target === '' && !isDraining && displayed !== '') {
      indexRef.current = 0
      lastTimeRef.current = 0
      drainTargetRef.current = ''
      setDisplayed('')
    }
  }, [target, isDraining, displayed])

  // Cancel any pending RAF on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [])

  return { displayed, isDraining }
}
