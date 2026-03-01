import type { Meta, StoryObj } from '@storybook/react'
import { Menubar } from '@surf-kit/core'

const meta: Meta<typeof Menubar> = {
  title: 'Core/Navigation/Menubar',
  component: Menubar,
}
export default meta
type Story = StoryObj<typeof Menubar>

export const Default: Story = {
  render: () => (
    <Menubar>
      <Menubar.Menu label="File">
        <Menubar.Item label="New File" shortcut="⌘N" onSelect={() => {}} />
        <Menubar.Item label="Open" shortcut="⌘O" onSelect={() => {}} />
        <Menubar.Separator />
        <Menubar.Item label="Save" shortcut="⌘S" onSelect={() => {}} />
      </Menubar.Menu>
      <Menubar.Menu label="Edit">
        <Menubar.Item label="Undo" shortcut="⌘Z" onSelect={() => {}} />
        <Menubar.Item label="Redo" shortcut="⌘⇧Z" onSelect={() => {}} />
      </Menubar.Menu>
      <Menubar.Menu label="View">
        <Menubar.Item label="Zoom In" shortcut="⌘+" onSelect={() => {}} />
        <Menubar.Item label="Zoom Out" shortcut="⌘-" onSelect={() => {}} />
        <Menubar.Separator />
        <Menubar.Item label="Full Screen" shortcut="F11" onSelect={() => {}} />
      </Menubar.Menu>
    </Menubar>
  ),
}

export const WithDisabledItems: Story = {
  render: () => (
    <Menubar>
      <Menubar.Menu label="File">
        <Menubar.Item label="New File" shortcut="⌘N" onSelect={() => {}} />
        <Menubar.Item label="Open" shortcut="⌘O" onSelect={() => {}} />
        <Menubar.Separator />
        <Menubar.Item label="Save" shortcut="⌘S" isDisabled />
      </Menubar.Menu>
      <Menubar.Menu label="Edit">
        <Menubar.Item label="Undo" shortcut="⌘Z" isDisabled />
        <Menubar.Item label="Redo" shortcut="⌘⇧Z" isDisabled />
        <Menubar.Separator />
        <Menubar.Item label="Cut" shortcut="⌘X" onSelect={() => {}} />
        <Menubar.Item label="Copy" shortcut="⌘C" onSelect={() => {}} />
        <Menubar.Item label="Paste" shortcut="⌘V" onSelect={() => {}} />
      </Menubar.Menu>
    </Menubar>
  ),
}
