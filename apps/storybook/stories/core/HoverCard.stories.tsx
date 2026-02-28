import type { Meta, StoryObj } from '@storybook/react'
import { HoverCard } from '@surf-kit/core'
import React from 'react'

const meta: Meta = {
  title: 'Core/HoverCard',
}
export default meta

export const Default: StoryObj = {
  render: () => (
    <div className="flex items-center justify-center p-24">
      <HoverCard
        content={
          <div>
            <p className="font-semibold">@barney</p>
            <p className="text-sm text-text-secondary mt-1">
              Full-stack developer and open source enthusiast.
            </p>
          </div>
        }
      >
        <a href="#" className="text-brand underline">
          @barney
        </a>
      </HoverCard>
    </div>
  ),
}
