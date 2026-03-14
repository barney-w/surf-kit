import { twMerge } from 'tailwind-merge'
import React from 'react'
import type { ChatMessage, Attachment } from '../../types/chat'
import { AgentResponse } from '../../response/AgentResponse'
import { ResponseMessage } from '../../response/ResponseMessage'

function DocumentIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  )
}

function AttachmentThumbnail({ attachment }: { attachment: Attachment }) {
  const isImage = attachment.content_type.startsWith('image/')

  if (isImage) {
    return (
      <div className="rounded-lg overflow-hidden border border-black/10 max-w-[240px]">
        <img
          src={attachment.preview_url ?? `data:${attachment.content_type};base64,${attachment.data}`}
          alt={attachment.filename}
          className="max-w-full max-h-[200px] object-contain"
        />
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-black/10 bg-black/5">
      <DocumentIcon />
      <span className="text-xs truncate max-w-[160px]">{attachment.filename}</span>
    </div>
  )
}

export type MessageBubbleProps = {
  message: ChatMessage
  showAgent?: boolean
  showSources?: boolean
  showConfidence?: boolean
  showVerification?: boolean
  animated?: boolean
  userBubbleClassName?: string
  className?: string
}

function MessageBubble({
  message,
  showAgent,
  showSources = true,
  showConfidence = true,
  showVerification = true,
  animated = true,
  userBubbleClassName,
  className,
}: MessageBubbleProps) {
  const isUser = message.role === 'user'
  const hasAttachments = message.attachments && message.attachments.length > 0

  if (isUser) {
    return (
      <div
        data-message-id={message.id}
        className={twMerge('flex w-full justify-end', className)}
      >
        <div
          className={twMerge(
            'max-w-[70%] rounded-[18px] rounded-br-[4px] px-4 py-2.5 bg-[#e8e8e8] text-[#1a1a1a] break-words whitespace-pre-wrap text-sm leading-relaxed',
            animated && 'motion-safe:animate-slideFromRight',
            userBubbleClassName,
          )}
        >
          {hasAttachments && (
            <div className="flex flex-wrap gap-2 mb-2">
              {message.attachments!.map((att, i) => (
                <AttachmentThumbnail key={`${att.filename}-${i}`} attachment={att} />
              ))}
            </div>
          )}
          {message.content}
        </div>
      </div>
    )
  }

  return (
    <div
      data-message-id={message.id}
      className={twMerge('flex w-full flex-col items-start gap-1.5', className)}
    >
      {showAgent && message.agent && (
        <div className="text-[11px] font-display font-semibold uppercase tracking-[0.08em] text-text-muted px-1">
          {message.agent.replace('_agent', '').replace('_', ' ')}
        </div>
      )}
      <div
        className={twMerge(
          'max-w-[88%] rounded-[18px] rounded-tl-[4px] px-4 py-3 bg-surface border border-border',
          animated && 'motion-safe:animate-springFromLeft',
        )}
      >
        {message.response ? (
          <AgentResponse
            response={message.response}
            showSources={showSources}
            showConfidence={showConfidence}
            showVerification={showVerification}
          />
        ) : (
          <ResponseMessage content={message.content} />
        )}
      </div>
    </div>
  )
}

export { MessageBubble }
