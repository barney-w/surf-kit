import type { Meta, StoryObj } from '@storybook/react'
import { Drawer } from '@surf-kit/core'
import { useState } from 'react'

const meta: Meta = {
  title: 'Core/Drawer',
}
export default meta

function DrawerDemo({ side = 'bottom' }: { side?: 'bottom' | 'left' | 'right' }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Open Drawer ({side})
      </button>
      <Drawer isOpen={open} onClose={() => setOpen(false)} side={side} title="Drawer Title">
        <p>Drawer content goes here.</p>
      </Drawer>
    </>
  )
}

export const Bottom: StoryObj = {
  render: () => <DrawerDemo side="bottom" />,
}

export const Left: StoryObj = {
  render: () => <DrawerDemo side="left" />,
}

export const Right: StoryObj = {
  render: () => <DrawerDemo side="right" />,
}
