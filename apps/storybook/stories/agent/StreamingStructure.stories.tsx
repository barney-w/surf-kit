import type { Meta, StoryObj } from '@storybook/react'
import { StreamingStructure } from '@surf-kit/agent'
import { useEffect, useState } from 'react'

const meta: Meta<typeof StreamingStructure> = {
  title: 'Agent/StreamingStructure',
  component: StreamingStructure,
}
export default meta
type Story = StoryObj<typeof StreamingStructure>

export const Default: Story = {
  render: () => (
    <StreamingStructure
      data={{
        name: 'John Doe',
        age: 30,
        email: 'john@example.com',
        address: { city: 'Sydney', country: 'Australia' },
      }}
      isStreaming={false}
    />
  ),
}

export const Streaming: Story = {
  render: () => {
    const [data, setData] = useState<Record<string, unknown>>({ name: 'Jane' })
    const [isStreaming, setIsStreaming] = useState(true)

    useEffect(() => {
      const steps: Record<string, unknown>[] = [
        { age: 28 },
        { email: 'jane@example.com' },
        { tags: ['designer', 'developer'] },
      ]
      let i = 0
      const interval = setInterval(() => {
        if (i < steps.length) {
          setData((prev) => ({ ...prev, ...steps[i] }))
          i++
        } else {
          setIsStreaming(false)
          clearInterval(interval)
        }
      }, 1500)
      return () => clearInterval(interval)
    }, [])

    return <StreamingStructure data={data} isStreaming={isStreaming} />
  },
}

export const WithArrays: Story = {
  render: () => (
    <StreamingStructure
      data={{
        project: 'surf-kit',
        languages: ['TypeScript', 'CSS', 'HTML'],
        active: true,
      }}
      isStreaming={false}
    />
  ),
}
