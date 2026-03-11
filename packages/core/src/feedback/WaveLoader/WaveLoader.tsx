'use client'

import { useEffect, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { VisuallyHidden } from '../../primitives/VisuallyHidden'

const sizes = {
  sm: 24,
  md: 32,
  lg: 48,
} as const

type WaveLoaderProps = {
  size?: keyof typeof sizes
  color?: string
  label?: string
  className?: string
}

function WaveLoader({
  size = 'md',
  color = '#38bdf8',
  label = 'Loading',
  className,
}: WaveLoaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const raf = useRef(0)
  const t = useRef(0)

  const px = sizes[size]

  useEffect(() => {
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return

    const s = px * 2
    c.width = s
    c.height = s
    const r = s * 0.46
    const cx = s / 2
    const cy = s / 2

    const hex = color.replace('#', '')
    const cr = parseInt(hex.substring(0, 2), 16)
    const cg = parseInt(hex.substring(2, 4), 16)
    const cb = parseInt(hex.substring(4, 6), 16)

    const draw = () => {
      t.current += 0.04
      ctx.clearRect(0, 0, s, s)

      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.clip()

      const cycle = (Math.sin(t.current * 0.25) + 1) / 2
      const animFill = 0.3 + cycle * 0.5
      const waterY = cy + r - animFill * 2 * r

      for (let layer = 0; layer < 2; layer++) {
        const yOffset = layer === 0 ? -s * 0.12 : 0
        const amp = layer === 0 ? s * 0.07 : s * 0.04
        const freq = layer === 0 ? 0.03 : 0.045
        const speed =
          layer === 0 ? t.current * 1.0 : t.current * 1.6 + 2
        const opacity = layer === 0 ? 0.35 : 1

        ctx.beginPath()
        ctx.moveTo(0, s)
        for (let x = 0; x <= s; x += 1) {
          const y =
            waterY +
            yOffset +
            Math.sin(x * freq + speed) * amp +
            Math.sin(x * freq * 0.6 + speed * 0.7) * amp * 0.5 +
            Math.sin(x * freq * 1.8 + speed * 1.3) * amp * 0.3
          ctx.lineTo(x, y)
        }
        ctx.lineTo(s, s)
        ctx.closePath()

        const grad = ctx.createLinearGradient(0, waterY - amp, 0, cy + r)
        grad.addColorStop(
          0,
          `rgba(${cr},${cg},${cb},${opacity * 0.7})`,
        )
        grad.addColorStop(1, `rgba(${cr},${cg},${cb},${opacity})`)
        ctx.fillStyle = grad
        ctx.fill()
      }

      ctx.restore()

      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.strokeStyle = color
      ctx.globalAlpha = 0.2
      ctx.lineWidth = s * 0.025
      ctx.stroke()
      ctx.globalAlpha = 1

      ctx.beginPath()
      ctx.ellipse(
        cx - r * 0.22,
        cy - r * 0.35,
        r * 0.28,
        r * 0.14,
        -0.35,
        0,
        Math.PI * 2,
      )
      ctx.fillStyle = 'rgba(255,255,255,0.12)'
      ctx.fill()

      raf.current = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(raf.current)
  }, [px, color])

  return (
    <span
      role="status"
      className={twMerge('inline-flex', className)}
    >
      <canvas
        ref={canvasRef}
        style={{ width: px, height: px }}
        aria-hidden="true"
      />
      <VisuallyHidden>{label}</VisuallyHidden>
    </span>
  )
}

export { WaveLoader }
export type { WaveLoaderProps }
