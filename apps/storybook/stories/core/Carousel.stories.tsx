import type { Meta, StoryObj } from '@storybook/react'
import { Carousel } from '@surf-kit/core'

const meta: Meta<typeof Carousel> = {
  title: 'Core/Data/Carousel',
  component: Carousel,
}
export default meta
type Story = StoryObj<typeof Carousel>

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 600 }}>
      <Carousel>
        <div
          style={{
            background: '#e0e0e0',
            height: 300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Slide 1
        </div>
        <div
          style={{
            background: '#d0d0d0',
            height: 300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Slide 2
        </div>
        <div
          style={{
            background: '#c0c0c0',
            height: 300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Slide 3
        </div>
      </Carousel>
    </div>
  ),
}

export const WithAutoPlay: Story = {
  render: () => (
    <div style={{ maxWidth: 600 }}>
      <Carousel autoPlay autoPlayInterval={3000}>
        <div style={{ background: '#e0e0e0', height: 200 }}>Slide 1</div>
        <div style={{ background: '#d0d0d0', height: 200 }}>Slide 2</div>
        <div style={{ background: '#c0c0c0', height: 200 }}>Slide 3</div>
      </Carousel>
    </div>
  ),
}

export const WithLoop: Story = {
  render: () => (
    <div style={{ maxWidth: 600 }}>
      <Carousel loop>
        <div
          style={{
            background: '#e0e0e0',
            height: 250,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Slide 1
        </div>
        <div
          style={{
            background: '#d0d0d0',
            height: 250,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Slide 2
        </div>
        <div
          style={{
            background: '#c0c0c0',
            height: 250,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Slide 3
        </div>
      </Carousel>
    </div>
  ),
}

export const NoControls: Story = {
  render: () => (
    <div style={{ maxWidth: 600 }}>
      <Carousel showArrows={false} showDots={false}>
        <div
          style={{
            background: '#e0e0e0',
            height: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Slide 1
        </div>
        <div
          style={{
            background: '#d0d0d0',
            height: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Slide 2
        </div>
        <div
          style={{
            background: '#c0c0c0',
            height: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Slide 3
        </div>
      </Carousel>
    </div>
  ),
}
