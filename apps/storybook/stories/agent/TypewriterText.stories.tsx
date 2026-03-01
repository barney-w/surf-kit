import type { Meta, StoryObj } from '@storybook/react'
import { TypewriterText } from '@surf-kit/agent'
import { useState } from 'react'

const meta: Meta<typeof TypewriterText> = {
  title: 'Agent/TypewriterText',
  component: TypewriterText,
}
export default meta
type Story = StoryObj<typeof TypewriterText>

const sampleText =
  'The quick brown fox jumps over the lazy dog. This sentence demonstrates the typewriter animation effect.'

export const Default: Story = {
  render: () => <TypewriterText text={sampleText} />,
}

export const Fast: Story = {
  render: () => <TypewriterText text={sampleText} speed={10} />,
}

export const Slow: Story = {
  render: () => <TypewriterText text={sampleText} speed={80} />,
}

export const WithDelay: Story = {
  render: () => <TypewriterText text={sampleText} delay={1500} />,
}

export const NoCursor: Story = {
  render: () => <TypewriterText text={sampleText} showCursor={false} />,
}

export const OnComplete: Story = {
  render: () => {
    const [completed, setCompleted] = useState(false)

    return (
      <div>
        <TypewriterText
          text="This text will trigger a callback when done."
          speed={20}
          onComplete={() => setCompleted(true)}
        />
        {completed && <p className="mt-4 text-sm text-text-secondary">Animation complete!</p>}
      </div>
    )
  },
}
