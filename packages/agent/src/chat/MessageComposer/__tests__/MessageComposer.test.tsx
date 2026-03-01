import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'
import * as vitestAxe from 'vitest-axe/matchers'

expect.extend(vitestAxe)

import { MessageComposer } from '../MessageComposer'

describe('MessageComposer', () => {
  it('renders textarea and send button', () => {
    render(<MessageComposer onSend={vi.fn()} />)
    expect(screen.getByLabelText('Message input')).toBeDefined()
    expect(screen.getByRole('button', { name: 'Send message' })).toBeDefined()
  })

  it('disables send button when input is empty', () => {
    render(<MessageComposer onSend={vi.fn()} />)
    expect(screen.getByRole('button', { name: 'Send message' })).toBeDisabled()
  })

  it('enables send button when input has text', async () => {
    const user = userEvent.setup()
    render(<MessageComposer onSend={vi.fn()} />)
    await user.type(screen.getByLabelText('Message input'), 'Hello')
    expect(screen.getByRole('button', { name: 'Send message' })).not.toBeDisabled()
  })

  it('disables send button when isLoading is true', async () => {
    const _user = userEvent.setup()
    render(<MessageComposer onSend={vi.fn()} isLoading />)
    // Textarea should be disabled too
    expect(screen.getByLabelText('Message input')).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Send message' })).toBeDisabled()
  })

  it('calls onSend with trimmed content on button click', async () => {
    const onSend = vi.fn()
    const user = userEvent.setup()
    render(<MessageComposer onSend={onSend} />)
    await user.type(screen.getByLabelText('Message input'), '  Hello  ')
    await user.click(screen.getByRole('button', { name: 'Send message' }))
    expect(onSend).toHaveBeenCalledWith('Hello')
  })

  it('calls onSend on Enter key', async () => {
    const onSend = vi.fn()
    const user = userEvent.setup()
    render(<MessageComposer onSend={onSend} />)
    await user.type(screen.getByLabelText('Message input'), 'Hello{Enter}')
    expect(onSend).toHaveBeenCalledWith('Hello')
  })

  it('does not send on Shift+Enter (newline)', async () => {
    const onSend = vi.fn()
    const user = userEvent.setup()
    render(<MessageComposer onSend={onSend} />)
    await user.type(screen.getByLabelText('Message input'), 'Hello{Shift>}{Enter}{/Shift}')
    expect(onSend).not.toHaveBeenCalled()
  })

  it('clears input after sending', async () => {
    const user = userEvent.setup()
    render(<MessageComposer onSend={vi.fn()} />)
    const textarea = screen.getByLabelText('Message input') as HTMLTextAreaElement
    await user.type(textarea, 'Hello{Enter}')
    expect(textarea.value).toBe('')
  })

  it('uses custom placeholder', () => {
    render(<MessageComposer onSend={vi.fn()} placeholder="Ask something..." />)
    expect(screen.getByPlaceholderText('Ask something...')).toBeDefined()
  })

  it('applies custom className', () => {
    const { container } = render(<MessageComposer onSend={vi.fn()} className="custom-composer" />)
    expect(container.firstElementChild?.className).toContain('custom-composer')
  })

  it('passes vitest-axe accessibility audit', async () => {
    const { container } = render(<MessageComposer onSend={vi.fn()} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
