import React, { useState } from 'react'
import {
  AgentPanel,
  AgentWidget,
  AgentEmbed,
  ConversationList,
  type ConversationSummary,
} from '@surf-kit/agent'

const DEMO_ENDPOINT = '/api/v1'

const sampleConversations: ConversationSummary[] = [
  {
    id: '1',
    title: 'Council tax reduction check',
    lastMessage: 'Can I apply online if I already receive Universal Credit?',
    updatedAt: new Date('2026-02-24'),
    messageCount: 4,
  },
  {
    id: '2',
    title: 'Missed recycling collection',
    lastMessage: 'Bin was out by 6am but not collected',
    updatedAt: new Date('2026-02-23'),
    messageCount: 6,
  },
  {
    id: '3',
    title: 'Rear extension planning advice',
    lastMessage: 'Do we need full planning or householder permission?',
    updatedAt: new Date('2026-02-22'),
    messageCount: 2,
  },
]

export function LayoutDemos() {
  const [panelOpen, setPanelOpen] = useState(false)
  const [panelSide, setPanelSide] = useState<'left' | 'right'>('right')
  const [activeConvId, setActiveConvId] = useState<string>('1')

  return (
    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 32, height: '100%', overflowY: 'auto' }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Layout Component Demos</h2>

      {/* AgentPanel demo */}
      <section>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>AgentPanel</h3>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => { setPanelSide('right'); setPanelOpen(true) }}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: '1px solid var(--surf-color-border-default)',
              background: 'transparent',
              cursor: 'pointer',
              color: 'inherit',
            }}
          >
            Open Right Panel
          </button>
          <button
            onClick={() => { setPanelSide('left'); setPanelOpen(true) }}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: '1px solid var(--surf-color-border-default)',
              background: 'transparent',
              cursor: 'pointer',
              color: 'inherit',
            }}
          >
            Open Left Panel
          </button>
        </div>
        <AgentPanel
          endpoint={DEMO_ENDPOINT}
          isOpen={panelOpen}
          onClose={() => setPanelOpen(false)}
          side={panelSide}
          title="Agent Panel"
        />
      </section>

      {/* ConversationList demo */}
      <section>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>ConversationList</h3>
        <div style={{ width: 300, height: 300, border: '1px solid var(--surf-color-border-default)', borderRadius: 8, overflow: 'hidden' }}>
          <ConversationList
            conversations={sampleConversations}
            activeId={activeConvId}
            onSelect={setActiveConvId}
            onDelete={(id) => console.log('Delete:', id)}
            onNew={() => console.log('New conversation')}
          />
        </div>
      </section>

      {/* AgentEmbed demo */}
      <section>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>AgentEmbed</h3>
        <div style={{ width: '100%', maxWidth: 600, height: 400, border: '1px solid var(--surf-color-border-default)', borderRadius: 8 }}>
          <AgentEmbed endpoint={DEMO_ENDPOINT} title="Embedded Chat" />
        </div>
      </section>

      {/* AgentWidget is always rendered as a floating button */}
      <AgentWidget
        endpoint={DEMO_ENDPOINT}
        position="bottom-right"
        triggerLabel="Chat with AI"
        title="AI Assistant"
      />
    </div>
  )
}
