'use client'

import { twMerge } from 'tailwind-merge'
import React, { useState, useRef, useCallback } from 'react'
import type { Attachment } from '../../types/chat'

const ALLOWED_TYPES = new Set([
  'image/png',
  'image/jpeg',
  'image/gif',
  'image/webp',
  'application/pdf',
])
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 MB
const MAX_ATTACHMENTS = 5

export type MessageComposerProps = {
  onSend: (content: string, attachments?: Attachment[]) => void
  onStop?: () => void
  isLoading?: boolean
  placeholder?: string
  className?: string
}

function ArrowUpIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 16V4" />
      <path d="M4 10l6-6 6 6" />
    </svg>
  )
}

function StopIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <rect x="3" y="3" width="10" height="10" rx="2" />
    </svg>
  )
}

function PaperclipIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
    </svg>
  )
}

function XIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  )
}

function DocumentIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  )
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      // Strip data URL prefix (e.g. "data:image/png;base64,")
      const base64 = result.split(',')[1]
      resolve(base64)
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function AttachmentPreview({
  attachment,
  onRemove,
}: {
  attachment: Attachment
  onRemove: () => void
}) {
  const isImage = attachment.content_type.startsWith('image/')

  return (
    <div className="relative group flex-shrink-0">
      {isImage ? (
        <div className="w-16 h-16 rounded-lg overflow-hidden border border-border/60 bg-surface-alt">
          <img
            src={attachment.preview_url ?? `data:${attachment.content_type};base64,${attachment.data}`}
            alt={attachment.filename}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="h-16 px-3 rounded-lg border border-border/60 bg-surface-alt flex items-center gap-2">
          <div className="text-text-muted">
            <DocumentIcon />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs text-text-primary truncate max-w-[120px]">
              {attachment.filename}
            </span>
            <span className="text-[10px] text-text-muted">PDF</span>
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={onRemove}
        className={twMerge(
          'absolute -top-1.5 -right-1.5',
          'w-5 h-5 rounded-full',
          'bg-text-muted/80 text-white',
          'flex items-center justify-center',
          'opacity-0 group-hover:opacity-100',
          'transition-opacity duration-150',
          'hover:bg-text-primary',
        )}
        aria-label={`Remove ${attachment.filename}`}
      >
        <XIcon size={10} />
      </button>
    </div>
  )
}

function MessageComposer({
  onSend,
  onStop,
  isLoading = false,
  placeholder = 'Type a message...',
  className,
}: MessageComposerProps) {
  const [value, setValue] = useState('')
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const [dragOver, setDragOver] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const canSend = (value.trim().length > 0 || attachments.length > 0) && !isLoading

  const resetHeight = useCallback(() => {
    const el = textareaRef.current
    if (el) {
      el.style.height = 'auto'
      el.style.overflowY = 'hidden'
    }
  }, [])

  const handleSend = useCallback(() => {
    if (!canSend) return
    const message = value.trim() || (attachments.length > 0 ? 'Please analyse the attached file(s).' : '')
    if (!message && attachments.length === 0) return
    onSend(message, attachments.length > 0 ? attachments : undefined)
    setValue('')
    setAttachments([])
    resetHeight()
    textareaRef.current?.focus()
  }, [canSend, onSend, value, attachments, resetHeight])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSend()
      }
    },
    [handleSend],
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value)
      const el = e.target
      el.style.height = 'auto'
      const capped = Math.min(el.scrollHeight, 200)
      el.style.height = `${capped}px`
      el.style.overflowY = el.scrollHeight > 200 ? 'auto' : 'hidden'
    },
    [],
  )

  const addFiles = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files)

    for (const file of fileArray) {
      if (attachments.length >= MAX_ATTACHMENTS) break
      if (!ALLOWED_TYPES.has(file.type)) continue
      if (file.size > MAX_FILE_SIZE) continue

      try {
        const data = await fileToBase64(file)
        const previewUrl = file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
        const attachment: Attachment = {
          filename: file.name,
          content_type: file.type,
          data,
          preview_url: previewUrl,
        }
        setAttachments(prev => {
          if (prev.length >= MAX_ATTACHMENTS) return prev
          return [...prev, attachment]
        })
      } catch {
        // Skip files that can't be read
      }
    }
  }, [attachments.length])

  const handleFileSelect = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        void addFiles(e.target.files)
        e.target.value = '' // reset so the same file can be selected again
      }
    },
    [addFiles],
  )

  const removeAttachment = useCallback((index: number) => {
    setAttachments(prev => {
      const removed = prev[index]
      if (removed?.preview_url) URL.revokeObjectURL(removed.preview_url)
      return prev.filter((_, i) => i !== index)
    })
  }, [])

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      const items = e.clipboardData.items
      const files: File[] = []
      for (const item of items) {
        if (item.kind === 'file' && ALLOWED_TYPES.has(item.type)) {
          const file = item.getAsFile()
          if (file) files.push(file)
        }
      }
      if (files.length > 0) {
        void addFiles(files)
      }
    },
    [addFiles],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragOver(false)
      if (e.dataTransfer.files.length > 0) {
        void addFiles(e.dataTransfer.files)
      }
    },
    [addFiles],
  )

  return (
    <div
      className={twMerge(
        'relative shrink-0 rounded-3xl border bg-surface',
        'shadow-lg shadow-black/10',
        'transition-all duration-200',
        'focus-within:border-accent/40 focus-within:shadow-accent/5',
        dragOver ? 'border-accent/60 bg-accent/5' : 'border-border/60',
        className,
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/png,image/jpeg,image/gif,image/webp,application/pdf"
        onChange={handleFileInputChange}
        className="hidden"
        aria-hidden="true"
      />

      {/* Attachment previews */}
      {attachments.length > 0 && (
        <div className="flex gap-2 px-4 pt-3 pb-1 overflow-x-auto">
          {attachments.map((att, i) => (
            <AttachmentPreview
              key={`${att.filename}-${i}`}
              attachment={att}
              onRemove={() => removeAttachment(i)}
            />
          ))}
        </div>
      )}

      {/* Drag overlay */}
      {dragOver && (
        <div className="absolute inset-0 rounded-3xl flex items-center justify-center bg-accent/10 border-2 border-dashed border-accent/40 z-10 pointer-events-none">
          <span className="text-sm font-display font-semibold text-accent">Drop files here</span>
        </div>
      )}

      <div className="flex items-end">
        {/* Attach button */}
        <button
          type="button"
          onClick={handleFileSelect}
          disabled={isLoading || attachments.length >= MAX_ATTACHMENTS}
          aria-label="Attach file"
          className={twMerge(
            'flex-shrink-0 ml-2 mb-3',
            'inline-flex items-center justify-center',
            'w-9 h-9 rounded-full',
            'transition-all duration-200',
            'text-text-muted/60 hover:text-text-secondary hover:bg-text-muted/10',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
            'disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent',
          )}
        >
          <PaperclipIcon />
        </button>

        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          placeholder={placeholder}
          rows={1}
          disabled={isLoading}
          className={twMerge(
            'flex-1 resize-none bg-transparent',
            'pl-2 pr-14 pt-4 pb-4 text-[15px] leading-relaxed',
            'text-text-primary placeholder:text-text-muted/70',
            'focus:outline-none',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'overflow-hidden',
          )}
          style={{ colorScheme: 'dark' }}
          aria-label="Message input"
        />

        <button
          type="button"
          onClick={isLoading && onStop ? onStop : handleSend}
          disabled={!canSend && !isLoading}
          aria-label={isLoading ? 'Stop generating' : 'Send message'}
          className={twMerge(
            'absolute bottom-3 right-3',
            'inline-flex items-center justify-center',
            'w-9 h-9 rounded-full',
            'transition-all duration-200',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
            canSend
              ? 'bg-accent text-white hover:bg-accent-hover active:scale-90 shadow-md shadow-accent/25'
              : isLoading
                ? 'bg-text-muted/20 text-text-secondary hover:bg-text-muted/30 cursor-pointer'
                : 'bg-transparent text-text-muted/40 cursor-default',
          )}
        >
          {isLoading ? <StopIcon /> : <ArrowUpIcon />}
        </button>
      </div>
    </div>
  )
}

export { MessageComposer }
