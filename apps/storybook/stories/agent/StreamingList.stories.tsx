import React, { useState, useEffect } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { StreamingList } from '@surf-kit/agent'

const meta: Meta<typeof StreamingList> = {
  title: 'Agent/StreamingList',
  component: StreamingList,
}
export default meta
type Story = StoryObj<typeof StreamingList>

export const Default: Story = {
  render: () => {
    const [items, setItems] = useState<string[]>(['First item'])
    const [isStreaming, setIsStreaming] = useState(true)

    useEffect(() => {
      const allItems = ['Second item', 'Third item', 'Fourth item']
      let i = 0
      const interval = setInterval(() => {
        if (i < allItems.length) {
          setItems((prev) => [...prev, allItems[i]])
          i++
        } else {
          setIsStreaming(false)
          clearInterval(interval)
        }
      }, 1500)
      return () => clearInterval(interval)
    }, [])

    return (
      <StreamingList
        items={items}
        renderItem={(item) => (
          <span className="block py-1 text-sm text-text-primary">{item}</span>
        )}
        isStreaming={isStreaming}
      />
    )
  },
}

export const Empty: Story = {
  render: () => (
    <StreamingList
      items={[]}
      renderItem={(item: string) => <span>{item}</span>}
      emptyMessage="No results found"
    />
  ),
}

export const StaticList: Story = {
  render: () => (
    <StreamingList
      items={['Apple', 'Banana', 'Cherry']}
      renderItem={(item: string) => (
        <span className="block py-1 text-sm text-text-primary">{item}</span>
      )}
      isStreaming={false}
    />
  ),
}
