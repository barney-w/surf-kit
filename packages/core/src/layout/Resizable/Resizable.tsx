import type React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

type ResizableProps = {
  children: [React.ReactNode, React.ReactNode]
  direction?: 'horizontal' | 'vertical'
  defaultSize?: number
  minSize?: number
  maxSize?: number
  className?: string
}

function Resizable({
  children,
  direction = 'horizontal',
  defaultSize = 50,
  minSize = 10,
  maxSize = 90,
  className,
}: ResizableProps) {
  const [size, setSize] = useState(defaultSize)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const clamp = useCallback(
    (value: number) => Math.min(maxSize, Math.max(minSize, value)),
    [minSize, maxSize],
  )

  const handleMouseDown = useCallback(() => {
    isDragging.current = true

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const isHorizontal = direction === 'horizontal'
      const position = isHorizontal ? e.clientX - rect.left : e.clientY - rect.top
      const total = isHorizontal ? rect.width : rect.height
      const percentage = (position / total) * 100
      setSize(clamp(percentage))
    }

    const handleMouseUp = () => {
      isDragging.current = false
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }, [direction, clamp])

  useEffect(() => {
    return () => {
      isDragging.current = false
    }
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const step = 5
      if (direction === 'horizontal') {
        if (e.key === 'ArrowLeft') {
          e.preventDefault()
          setSize((s) => clamp(s - step))
        }
        if (e.key === 'ArrowRight') {
          e.preventDefault()
          setSize((s) => clamp(s + step))
        }
      } else {
        if (e.key === 'ArrowUp') {
          e.preventDefault()
          setSize((s) => clamp(s - step))
        }
        if (e.key === 'ArrowDown') {
          e.preventDefault()
          setSize((s) => clamp(s + step))
        }
      }
    },
    [direction, clamp],
  )

  const isHorizontal = direction === 'horizontal'

  return (
    <div
      ref={containerRef}
      className={twMerge('flex', isHorizontal ? 'flex-row' : 'flex-col', 'h-full', className)}
    >
      <div style={{ [isHorizontal ? 'width' : 'height']: `${size}%` }} className="overflow-auto">
        {children[0]}
      </div>
      <div
        role="separator"
        tabIndex={0}
        aria-valuenow={Math.round(size)}
        aria-valuemin={minSize}
        aria-valuemax={maxSize}
        className={twMerge(
          'flex-shrink-0 bg-border hover:bg-accent transition-colors',
          isHorizontal ? 'w-1 cursor-col-resize' : 'h-1 cursor-row-resize',
        )}
        onMouseDown={handleMouseDown}
        onKeyDown={handleKeyDown}
      />
      <div
        style={{ [isHorizontal ? 'width' : 'height']: `${100 - size}%` }}
        className="overflow-auto"
      >
        {children[1]}
      </div>
    </div>
  )
}

export { Resizable }
export type { ResizableProps }
