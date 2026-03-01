import type { Meta, StoryObj } from '@storybook/react'
import { NavigationMenu } from '@surf-kit/core'

const meta: Meta<typeof NavigationMenu> = {
  title: 'Core/Navigation/NavigationMenu',
  component: NavigationMenu,
}
export default meta
type Story = StoryObj<typeof NavigationMenu>

export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenu.Item label="Home" href="#" />
      <NavigationMenu.Item label="Products">
        <div style={{ padding: '1rem' }}>
          <p>Products mega-menu content</p>
        </div>
      </NavigationMenu.Item>
      <NavigationMenu.Item label="About" href="#" />
    </NavigationMenu>
  ),
}

export const WithMultipleDropdowns: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenu.Item label="Home" href="#" />
      <NavigationMenu.Item label="Products">
        <div
          style={{ padding: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}
        >
          <div>
            <strong>Category A</strong>
            <ul>
              <li>Product 1</li>
              <li>Product 2</li>
            </ul>
          </div>
          <div>
            <strong>Category B</strong>
            <ul>
              <li>Product 3</li>
              <li>Product 4</li>
            </ul>
          </div>
        </div>
      </NavigationMenu.Item>
      <NavigationMenu.Item label="Resources">
        <div style={{ padding: '1rem' }}>
          <p>Documentation, guides, and more</p>
        </div>
      </NavigationMenu.Item>
      <NavigationMenu.Item label="Contact" href="#" />
    </NavigationMenu>
  ),
}
