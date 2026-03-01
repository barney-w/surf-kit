import type React from 'react'
import { twMerge } from 'tailwind-merge'

type AspectRatioProps = {
  ratio?: number
  children: React.ReactNode
  className?: string
}

function AspectRatio({ ratio = 1, children, className }: AspectRatioProps) {
  return (
    <div
      className={twMerge('relative w-full overflow-hidden', className)}
      style={{ aspectRatio: String(ratio) }}
    >
      {children}
    </div>
  )
}

export { AspectRatio }
export type { AspectRatioProps }
