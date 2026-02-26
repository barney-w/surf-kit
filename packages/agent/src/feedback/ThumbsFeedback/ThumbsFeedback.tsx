import React, { useState } from 'react'

type FeedbackRating = 'positive' | 'negative'

type ThumbsFeedbackProps = {
  messageId: string
  onFeedback: (messageId: string, rating: FeedbackRating, comment?: string) => void
  state?: FeedbackRating | null
  onNegative?: () => void
  className?: string
}

function ThumbsFeedback({
  messageId,
  onFeedback,
  state = null,
  onNegative,
  className,
}: ThumbsFeedbackProps) {
  const [selected, setSelected] = useState<FeedbackRating | null>(state)

  const handleClick = (rating: FeedbackRating) => {
    setSelected(rating)
    onFeedback(messageId, rating)
    if (rating === 'negative' && onNegative) {
      onNegative()
    }
  }

  return (
    <div
      className={`inline-flex items-center gap-0.5 ${className ?? ''}`}
      role="group"
      aria-label="Rate this response"
      data-testid="thumbs-feedback"
    >
      <button
        type="button"
        onClick={() => handleClick('positive')}
        aria-label="Thumbs up"
        aria-pressed={selected === 'positive'}
        className={`p-1.5 rounded-md transition-colors duration-200 ${
          selected === 'positive'
            ? 'text-brand-cyan bg-brand-cyan/15'
            : 'text-brand-cream/30 hover:text-brand-cyan hover:bg-brand-cyan/10'
        }`}
        data-testid="thumbs-up"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M7 10v12" />
          <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => handleClick('negative')}
        aria-label="Thumbs down"
        aria-pressed={selected === 'negative'}
        className={`p-1.5 rounded-md transition-colors duration-200 ${
          selected === 'negative'
            ? 'text-brand-watermelon bg-brand-watermelon/15'
            : 'text-brand-cream/30 hover:text-brand-watermelon hover:bg-brand-watermelon/10'
        }`}
        data-testid="thumbs-down"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M17 14V2" />
          <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
        </svg>
      </button>
    </div>
  )
}

export { ThumbsFeedback }
export type { ThumbsFeedbackProps, FeedbackRating }
