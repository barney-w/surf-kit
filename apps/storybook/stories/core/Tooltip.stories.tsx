import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip } from '@surf-kit/core'

const meta: Meta = {
  title: 'Core/Tooltip',
}
export default meta

export const Default: StoryObj = {
  render: () => (
    <div style={{ padding: '60px' }}>
      <Tooltip content="This is a tooltip" placement="top">
        <button type="button">Hover me</button>
      </Tooltip>
    </div>
  ),
}
