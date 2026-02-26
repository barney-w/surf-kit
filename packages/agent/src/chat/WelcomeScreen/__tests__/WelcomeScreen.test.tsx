import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import * as vitestAxe from 'vitest-axe/matchers'
import { axe } from 'vitest-axe'

expect.extend(vitestAxe)
import { WelcomeScreen } from '../WelcomeScreen'

describe('WelcomeScreen', () => {
  it('renders default title and message', () => {
    render(<WelcomeScreen />)
    expect(screen.getByText('Welcome')).toBeDefined()
    expect(screen.getByText('How can I help you today?')).toBeDefined()
  })

  it('renders custom title and message', () => {
    render(<WelcomeScreen title="Agent" message="Ask me anything" />)
    expect(screen.getByText('Agent')).toBeDefined()
    expect(screen.getByText('Ask me anything')).toBeDefined()
  })

  it('renders suggested questions as clickable chips', () => {
    const questions = ['What is X?', 'How do I Y?']
    render(<WelcomeScreen suggestedQuestions={questions} />)
    expect(screen.getByText('What is X?')).toBeDefined()
    expect(screen.getByText('How do I Y?')).toBeDefined()
  })

  it('calls onQuestionSelect when a chip is clicked', async () => {
    const onSelect = vi.fn()
    const user = userEvent.setup()
    render(
      <WelcomeScreen
        suggestedQuestions={['What is X?']}
        onQuestionSelect={onSelect}
      />,
    )
    await user.click(screen.getByText('What is X?'))
    expect(onSelect).toHaveBeenCalledWith('What is X?')
  })

  it('does not render suggestion group when no questions', () => {
    render(<WelcomeScreen />)
    expect(screen.queryByRole('group', { name: 'Suggested questions' })).toBeNull()
  })

  it('applies custom className', () => {
    const { container } = render(<WelcomeScreen className="custom-welcome" />)
    expect(container.firstElementChild?.className).toContain('custom-welcome')
  })

  it('passes vitest-axe accessibility audit', async () => {
    const { container } = render(
      <WelcomeScreen
        title="Welcome"
        message="Hello"
        suggestedQuestions={['Q1', 'Q2']}
        onQuestionSelect={vi.fn()}
      />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
