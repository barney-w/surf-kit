import { Button, Dialog, TextArea } from '@surf-kit/core'
import { useState } from 'react'

type FeedbackDialogProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (comment: string) => void
  className?: string
}

function FeedbackDialog({ isOpen, onClose, onSubmit, className }: FeedbackDialogProps) {
  const [comment, setComment] = useState('')

  const handleSubmit = () => {
    onSubmit(comment)
    setComment('')
    onClose()
  }

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Share your feedback"
      size="sm"
      className={className}
      footer={
        <>
          <Button intent="ghost" onPress={onClose}>
            Cancel
          </Button>
          <Button intent="primary" onPress={handleSubmit} isDisabled={comment.trim().length === 0}>
            Submit
          </Button>
        </>
      }
    >
      <TextArea
        label="What could be improved?"
        value={comment}
        onChange={setComment}
        placeholder="Tell us what went wrong or how this response could be better..."
        rows={4}
        data-testid="feedback-textarea"
      />
    </Dialog>
  )
}

export { FeedbackDialog }
export type { FeedbackDialogProps }
