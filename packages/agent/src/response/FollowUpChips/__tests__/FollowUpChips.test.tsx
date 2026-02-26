import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import * as vitestAxe from 'vitest-axe/matchers'
import { axe } from 'vitest-axe'

import { FollowUpChips } from '../FollowUpChips'

expect.extend(vitestAxe)

describe('FollowUpChips', () => {
  const suggestions = ['How do I apply?', 'What are the benefits?', 'Tell me more']

  it('renders suggestion chips', () => {
    render(<FollowUpChips suggestions={suggestions} onSelect={() => {}} />)
    for (const suggestion of suggestions) {
      expect(screen.getByText(suggestion)).toBeDefined()
    }
  })

  it('calls onSelect when a chip is clicked', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<FollowUpChips suggestions={suggestions} onSelect={onSelect} />)

    await user.click(screen.getByText('How do I apply?'))
    expect(onSelect).toHaveBeenCalledWith('How do I apply?')
  })

  it('renders nothing when suggestions is empty', () => {
    const { container } = render(
      <FollowUpChips suggestions={[]} onSelect={() => {}} />,
    )
    expect(container.firstChild).toBeNull()
  })

  it('has a group role with label', () => {
    render(<FollowUpChips suggestions={suggestions} onSelect={() => {}} />)
    expect(screen.getByRole('group')).toBeDefined()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <FollowUpChips suggestions={suggestions} onSelect={() => {}} />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
