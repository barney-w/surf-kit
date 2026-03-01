import type { Meta, StoryObj } from '@storybook/react'
import { Popover } from '@surf-kit/core'
import { useRef, useState } from 'react'

const meta: Meta = {
  title: 'Core/Popover',
}
export default meta

function PopoverDemo() {
  const ref = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button type="button" ref={ref} onClick={() => setOpen(!open)}>
        Toggle Popover
      </button>
      <Popover triggerRef={ref} isOpen={open} onClose={() => setOpen(false)} placement="bottom">
        <p>Popover content here</p>
      </Popover>
    </div>
  )
}

export const Default: StoryObj = {
  render: () => <PopoverDemo />,
}
