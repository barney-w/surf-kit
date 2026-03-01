import {
  Breadcrumb,
  Menubar,
  NavigationMenu,
  Pagination,
  Separator,
  Stack,
  Tabs,
  Text,
} from '@surf-kit/core'
import { useState } from 'react'
import { breadcrumbItems } from '../showcase-data'
import { SectionWrapper } from './SectionWrapper'

export function NavigationSection() {
  const [page, setPage] = useState(3)

  return (
    <SectionWrapper title="Navigation">
      <Stack gap={6}>
        {/* Tabs */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            Tabs
          </Text>
          <Tabs
            items={[
              {
                key: 'overview',
                title: 'Overview',
                content: <Text size="sm">Overview content — the main dashboard view.</Text>,
              },
              {
                key: 'analytics',
                title: 'Analytics',
                content: <Text size="sm">Analytics content — charts and metrics.</Text>,
              },
              {
                key: 'settings',
                title: 'Settings',
                content: <Text size="sm">Settings content — configure your preferences.</Text>,
              },
            ]}
          />
        </div>

        <Separator />

        {/* Breadcrumb */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            Breadcrumb
          </Text>
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <Separator />

        {/* Pagination */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            Pagination
          </Text>
          <Pagination totalPages={10} currentPage={page} onPageChange={setPage} />
        </div>

        <Separator />

        {/* NavigationMenu */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            NavigationMenu
          </Text>
          <NavigationMenu>
            <NavigationMenu.Item label="Home" href="#" />
            <NavigationMenu.Item label="Components" href="#">
              <div className="p-3">
                <Text size="sm">Browse all available components in the library.</Text>
              </div>
            </NavigationMenu.Item>
            <NavigationMenu.Item label="Docs" href="#" />
          </NavigationMenu>
        </div>

        <Separator />

        {/* Menubar */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            Menubar
          </Text>
          <Menubar>
            <Menubar.Menu label="File">
              <Menubar.Item label="New" shortcut="⌘N" onSelect={() => {}} />
              <Menubar.Item label="Open" shortcut="⌘O" onSelect={() => {}} />
              <Menubar.Separator />
              <Menubar.Item label="Save" shortcut="⌘S" onSelect={() => {}} />
            </Menubar.Menu>
            <Menubar.Menu label="Edit">
              <Menubar.Item label="Undo" shortcut="⌘Z" onSelect={() => {}} />
              <Menubar.Item label="Redo" shortcut="⇧⌘Z" onSelect={() => {}} />
            </Menubar.Menu>
            <Menubar.Menu label="View">
              <Menubar.Item label="Zoom In" shortcut="⌘+" onSelect={() => {}} />
              <Menubar.Item label="Zoom Out" shortcut="⌘-" onSelect={() => {}} />
            </Menubar.Menu>
          </Menubar>
        </div>
      </Stack>
    </SectionWrapper>
  )
}
