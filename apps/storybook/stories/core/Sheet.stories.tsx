import type { Meta, StoryObj } from '@storybook/react'
import { Sheet } from '@surf-kit/core'
import React, { useState } from 'react'

const meta: Meta = {
  title: 'Core/Sheet',
}
export default meta

function SheetDemo({ side = 'right' }: { side?: 'left' | 'right' }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)}>Open Sheet ({side})</button>
      <Sheet
        isOpen={open}
        onClose={() => setOpen(false)}
        side={side}
        title="Sheet Title"
      >
        <p>Sheet content goes here.</p>
      </Sheet>
    </>
  )
}

export const Right: StoryObj = {
  render: () => <SheetDemo side="right" />,
}

export const Left: StoryObj = {
  render: () => <SheetDemo side="left" />,
}
