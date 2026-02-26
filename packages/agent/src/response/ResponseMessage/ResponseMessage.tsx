import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeSanitize from 'rehype-sanitize'

type ResponseMessageProps = {
  content: string
  className?: string
}

function ResponseMessage({ content, className }: ResponseMessageProps) {
  return (
    <div
      className={className}
      data-testid="response-message"
    >
      <ReactMarkdown
        rehypePlugins={[rehypeSanitize]}
        components={{
          script: () => null,
          iframe: () => null,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

export { ResponseMessage }
export type { ResponseMessageProps }
