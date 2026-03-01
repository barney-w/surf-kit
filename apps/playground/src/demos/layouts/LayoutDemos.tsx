import {
  AgentEmbed,
  AgentPanel,
  AgentWidget,
  ConversationList,
  type ConversationSummary,
} from '@surf-kit/agent'
import { useState } from 'react'

const DEMO_ENDPOINT = '/api/v1'

const sampleConversations: ConversationSummary[] = [
  {
    id: '1',
    title: 'Pricing plan comparison',
    lastMessage: 'What is included in the Pro plan?',
    updatedAt: new Date('2026-02-24'),
    messageCount: 4,
  },
  {
    id: '2',
    title: 'API rate limit question',
    lastMessage: 'How do I increase my requests per minute?',
    updatedAt: new Date('2026-02-23'),
    messageCount: 6,
  },
  {
    id: '3',
    title: 'Onboarding assistance',
    lastMessage: 'How do I connect a Slack integration?',
    updatedAt: new Date('2026-02-22'),
    messageCount: 2,
  },
]

export function LayoutDemos() {
  const [panelOpen, setPanelOpen] = useState(false)
  const [panelSide, setPanelSide] = useState<'left' | 'right'>('right')
  const [activeConvId, setActiveConvId] = useState<string>('1')

  return (
    <div className="h-full overflow-y-auto bg-brand-dark p-8 flex flex-col gap-10">
      <div>
        <h2 className="font-display text-2xl font-bold text-brand-cream tracking-tight">
          Layout Components
        </h2>
        <p className="text-brand-cream/50 text-sm font-body mt-1">
          Live demonstrations of all agent layout variants
        </p>
      </div>

      {/* AgentPanel demo */}
      <section className="glass-panel p-6 flex flex-col gap-4">
        <div>
          <h3 className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-brand-gold">
            AgentPanel
          </h3>
          <p className="text-brand-cream/50 text-xs font-body mt-0.5">
            Sliding side panel — left or right
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            className="px-4 py-2 rounded-xl text-sm font-display font-medium border border-brand-gold/25 text-brand-gold/80 hover:border-brand-gold hover:text-brand-gold hover:bg-brand-gold/10 transition-all duration-200"
            onClick={() => {
              setPanelSide('right')
              setPanelOpen(true)
            }}
          >
            Open Right Panel
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded-xl text-sm font-display font-medium border border-brand-gold/25 text-brand-gold/80 hover:border-brand-gold hover:text-brand-gold hover:bg-brand-gold/10 transition-all duration-200"
            onClick={() => {
              setPanelSide('left')
              setPanelOpen(true)
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
      <section className="glass-panel p-6 flex flex-col gap-4">
        <div>
          <h3 className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-brand-gold">
            ConversationList
          </h3>
          <p className="text-brand-cream/50 text-xs font-body mt-0.5">
            Sidebar list of past conversations
          </p>
        </div>
        <div className="w-72 h-80 rounded-2xl overflow-hidden border border-brand-gold/15">
          <ConversationList
            conversations={sampleConversations}
            activeId={activeConvId}
            onSelect={setActiveConvId}
            onDelete={(id: string) => console.log('Delete:', id)}
            onNew={() => console.log('New conversation')}
          />
        </div>
      </section>

      {/* AgentEmbed demo */}
      <section className="glass-panel p-6 flex flex-col gap-4">
        <div>
          <h3 className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-brand-gold">
            AgentEmbed
          </h3>
          <p className="text-brand-cream/50 text-xs font-body mt-0.5">
            Full embedded chat interface
          </p>
        </div>
        <div className="w-full max-w-2xl h-[400px] rounded-2xl overflow-hidden border border-brand-gold/15">
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
