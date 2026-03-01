import { twMerge } from 'tailwind-merge'
import { AgentChat } from '../../chat/AgentChat'

export type AgentEmbedProps = {
  endpoint: string
  title?: string
  className?: string
}

function AgentEmbed({ endpoint, title = 'Chat', className }: AgentEmbedProps) {
  return (
    <div className={twMerge('w-full h-full min-h-0', className)} data-testid="agent-embed">
      <AgentChat endpoint={endpoint} title={title} className="h-full rounded-none border-0" />
    </div>
  )
}

export { AgentEmbed }
