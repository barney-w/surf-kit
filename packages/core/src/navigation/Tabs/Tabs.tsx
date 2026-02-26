import { twMerge } from 'tailwind-merge'
import React, { useRef } from 'react'
import { useTabList, useTab, useTabPanel } from 'react-aria'
import { useTabListState, Item } from 'react-stately'
import type { AriaTabListProps } from 'react-aria'
import type { Node } from 'react-stately'

type TabItem = { key: string; title: string; content: React.ReactNode }

type TabsProps = {
  items: TabItem[]
  selectedKey?: string
  onSelectionChange?: (key: string) => void
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

function TabButton({ item, state }: { item: Node<object>; state: ReturnType<typeof useTabListState> }) {
  const ref = useRef<HTMLDivElement>(null)
  const { tabProps } = useTab({ key: item.key }, state, ref)
  const isSelected = state.selectedKey === item.key

  return (
    <div
      {...tabProps}
      ref={ref}
      className={twMerge(
        'px-4 py-2 text-sm font-medium cursor-pointer outline-none transition-colors',
        'focus-visible:ring-2 focus-visible:ring-accent/20',
        isSelected
          ? 'text-accent border-b-2 border-accent'
          : 'text-text-secondary hover:text-text-primary',
      )}
    >
      {item.rendered}
    </div>
  )
}

function TabPanelContent({ state, ...props }: { state: ReturnType<typeof useTabListState> }) {
  const ref = useRef<HTMLDivElement>(null)
  const { tabPanelProps } = useTabPanel(props, state, ref)

  return (
    <div {...tabPanelProps} ref={ref} className="p-4 outline-none">
      {state.selectedItem?.props?.children}
    </div>
  )
}

function Tabs({
  items,
  selectedKey,
  onSelectionChange,
  orientation = 'horizontal',
  className,
}: TabsProps) {
  const ref = useRef<HTMLDivElement>(null)

  const ariaProps: AriaTabListProps<TabItem> = {
    orientation,
    selectedKey,
    onSelectionChange: onSelectionChange
      ? (key) => onSelectionChange(String(key))
      : undefined,
    children: (item: TabItem) => <Item key={item.key} title={item.title}>{item.content}</Item>,
    items,
  }

  const state = useTabListState(ariaProps as Parameters<typeof useTabListState>[0])
  const { tabListProps } = useTabList(ariaProps, state, ref)

  return (
    <div className={twMerge('flex flex-col', orientation === 'vertical' && 'flex-row', className)}>
      <div
        {...tabListProps}
        ref={ref}
        className={twMerge(
          'flex',
          orientation === 'horizontal'
            ? 'flex-row border-b border-border'
            : 'flex-col border-r border-border',
        )}
      >
        {[...state.collection].map((item) => (
          <TabButton key={item.key} item={item} state={state} />
        ))}
      </div>
      <TabPanelContent state={state} />
    </div>
  )
}

export { Tabs }
export type { TabsProps, TabItem }
