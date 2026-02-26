import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeSanitize from 'rehype-sanitize'
import { twMerge } from 'tailwind-merge'

type ResponseMessageProps = {
  content: string
  className?: string
}

function normalizeMarkdownLists(content: string) {
  // Some providers emit compact list markdown like "Intro: - item 1 - item 2".
  // Insert a paragraph break before an inline list marker so markdown parses it as a list.
  return content.replace(/:\s+-\s+/g, ':\n\n- ')
}

function ResponseMessage({ content, className }: ResponseMessageProps) {
  return (
    <div
      className={twMerge(
        'text-sm leading-relaxed text-brand-cream font-body',
        '[&_p]:my-2',
        '[&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-6',
        '[&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-6',
        '[&_li]:my-1',
        '[&_strong]:text-brand-cream [&_strong]:font-semibold',
        '[&_em]:text-brand-cream/80',
        '[&_h1]:font-display [&_h1]:text-lg [&_h1]:font-semibold [&_h1]:text-brand-cream [&_h1]:mt-4 [&_h1]:mb-2',
        '[&_h2]:font-display [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-brand-cream [&_h2]:mt-3 [&_h2]:mb-1.5',
        '[&_h3]:font-display [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:text-brand-gold [&_h3]:mt-2 [&_h3]:mb-1',
        '[&_code]:bg-brand-dark-panel [&_code]:text-brand-cyan [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_code]:font-mono',
        '[&_pre]:bg-brand-dark-panel [&_pre]:border [&_pre]:border-brand-gold/15 [&_pre]:rounded-xl [&_pre]:p-4 [&_pre]:overflow-x-auto',
        '[&_blockquote]:border-l-2 [&_blockquote]:border-brand-gold/40 [&_blockquote]:pl-4 [&_blockquote]:text-brand-cream/70',
        '[&_a]:text-brand-cyan [&_a]:underline-offset-2 [&_a]:hover:text-brand-cyan/80',
        className,
      )}
      data-testid="response-message"
    >
      <ReactMarkdown
        rehypePlugins={[rehypeSanitize]}
        components={{
          script: () => null,
          iframe: () => null,
          p: ({ children }) => <p className="my-2">{children}</p>,
          ul: ({ children }) => <ul className="my-2 list-disc pl-6">{children}</ul>,
          ol: ({ children }) => <ol className="my-2 list-decimal pl-6">{children}</ol>,
          li: ({ children }) => <li className="my-1">{children}</li>,
          strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
          h1: ({ children }) => <h1 className="text-base font-bold mt-4 mb-2">{children}</h1>,
          h2: ({ children }) => <h2 className="text-sm font-bold mt-3 mb-1">{children}</h2>,
          h3: ({ children }) => <h3 className="text-sm font-semibold mt-2 mb-1">{children}</h3>,
          code: ({ children }) => <code className="bg-surface-sunken rounded px-1 py-0.5 text-xs font-mono">{children}</code>,
        }}
      >
        {normalizeMarkdownLists(content)}
      </ReactMarkdown>
    </div>
  )
}

export { ResponseMessage }
export type { ResponseMessageProps }
