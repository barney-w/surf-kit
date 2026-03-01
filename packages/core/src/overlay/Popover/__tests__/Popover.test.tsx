import { render, screen } from '@testing-library/react'
import { useRef } from 'react'
import { describe, expect, it } from 'vitest'
import { Popover } from '../Popover'

function TestPopover({ isOpen }: { isOpen: boolean }) {
  const ref = useRef<HTMLButtonElement>(null)
  return (
    <div>
      <button type="button" ref={ref}>
        Trigger
      </button>
      <Popover triggerRef={ref} isOpen={isOpen} onClose={() => {}}>
        Popover content
      </Popover>
    </div>
  )
}

describe('Popover', () => {
  it('renders nothing when not open', () => {
    render(<TestPopover isOpen={false} />)
    expect(screen.queryByText('Popover content')).toBeNull()
  })

  it('renders content when open', () => {
    render(<TestPopover isOpen={true} />)
    expect(screen.getByText('Popover content')).toBeDefined()
  })
})
