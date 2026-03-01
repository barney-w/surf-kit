import type { Meta, StoryObj } from '@storybook/react'
import { Accordion } from '@surf-kit/core'

const meta: Meta<typeof Accordion> = {
  title: 'Core/Accordion',
  component: Accordion,
  argTypes: {
    type: { control: 'select', options: ['single', 'multiple'] },
  },
}
export default meta
type Story = StoryObj<typeof Accordion>

const items = [
  { key: 'faq1', title: 'What is surf-kit?', content: 'A design system for building agent UIs.' },
  {
    key: 'faq2',
    title: 'How do I install it?',
    content: 'Run pnpm add @surf-kit/core in your project.',
  },
  {
    key: 'faq3',
    title: 'Is it accessible?',
    content: 'Yes, all components follow WAI-ARIA patterns.',
  },
]

export const Single: Story = {
  render: () => <Accordion items={items} type="single" />,
}

export const Multiple: Story = {
  render: () => <Accordion items={items} type="multiple" />,
}

export const DefaultExpanded: Story = {
  render: () => <Accordion items={items} defaultExpandedKeys={['faq1']} />,
}
