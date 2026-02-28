import { cva, type VariantProps } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import React, { useState } from 'react'

const avatar = cva(
  'inline-flex items-center justify-center rounded-full bg-surface-raised text-text-primary font-medium overflow-hidden',
  {
    variants: {
      size: {
        xs: 'h-6 w-6 text-xs',
        sm: 'h-8 w-8 text-sm',
        md: 'h-10 w-10 text-base',
        lg: 'h-12 w-12 text-lg',
        xl: 'h-16 w-16 text-xl',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

type AvatarProps = {
  src?: string
  alt?: string
  name?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/)
  if (words.length === 1) return words[0][0].toUpperCase()
  return (words[0][0] + words[1][0]).toUpperCase()
}

function Avatar({ src, alt, name, size, className }: AvatarProps) {
  const [imgError, setImgError] = useState(false)
  const showImage = src && !imgError

  return (
    <div className={twMerge(avatar({ size }), className)}>
      {showImage ? (
        <img
          src={src}
          alt={alt || name || ''}
          className="h-full w-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : name ? (
        <span aria-label={name}>{getInitials(name)}</span>
      ) : (
        <span aria-hidden="true">?</span>
      )}
    </div>
  )
}

export { Avatar, avatar }
export type { AvatarProps }
