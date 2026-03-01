import {
  RetrievalProgress,
  StreamingList,
  StreamingStructure,
  TextGlimmer,
  ThinkingIndicator,
  ToolExecution,
  TypewriterText,
  TypingIndicator,
  VerificationProgress,
} from '@surf-kit/agent'
import { Button, Separator, Stack, Text } from '@surf-kit/core'
import { useState } from 'react'
import { mockSources } from '../showcase-data'
import { SectionWrapper } from './SectionWrapper'

export function AgentStreamingSection() {
  const [streamingActive, setStreamingActive] = useState(true)
  const [listItems, setListItems] = useState(['Item 1', 'Item 2'])

  return (
    <SectionWrapper title="Agent Streaming">
      <Stack gap={6}>
        {/* ThinkingIndicator */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            ThinkingIndicator
          </Text>
          <Stack gap={2}>
            <ThinkingIndicator />
            <ThinkingIndicator label="Processing your request..." />
          </Stack>
        </div>

        <Separator />

        {/* TypingIndicator */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            TypingIndicator
          </Text>
          <TypingIndicator label="Agent is typing" />
        </div>

        <Separator />

        {/* TextGlimmer */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            TextGlimmer
          </Text>
          <TextGlimmer lines={3} />
        </div>

        <Separator />

        {/* TypewriterText */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            TypewriterText
          </Text>
          <div className="p-3 rounded-lg border border-brand-gold/15">
            <TypewriterText
              text="This text appears character by character, creating a typewriter effect that feels natural and engaging."
              speed={30}
            />
          </div>
        </div>

        <Separator />

        {/* StreamingList */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            StreamingList
          </Text>
          <StreamingList
            items={listItems}
            renderItem={(item) => (
              <div className="px-3 py-2 rounded-lg border border-brand-gold/15">
                <Text size="sm">{item}</Text>
              </div>
            )}
            isStreaming={streamingActive}
          />
          <Stack direction="horizontal" gap={2} className="mt-2">
            <Button
              intent="ghost"
              size="sm"
              onPress={() => setListItems((prev) => [...prev, `Item ${prev.length + 1}`])}
            >
              Add item
            </Button>
            <Button intent="ghost" size="sm" onPress={() => setStreamingActive((p) => !p)}>
              {streamingActive ? 'Stop streaming' : 'Start streaming'}
            </Button>
          </Stack>
        </div>

        <Separator />

        {/* StreamingStructure */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            StreamingStructure
          </Text>
          <StreamingStructure
            data={{
              plan: 'Enterprise',
              features: { apiCalls: 'Unlimited', support: 'Dedicated' },
              pricing: '$499/month',
            }}
            isStreaming={streamingActive}
          />
        </div>

        <Separator />

        {/* ToolExecution */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            ToolExecution
          </Text>
          <Stack gap={2}>
            <ToolExecution tool="search_documents" label="Searching knowledge base..." />
            <ToolExecution tool="calculate_pricing" label="Computing pricing breakdown..." />
          </Stack>
        </div>

        <Separator />

        {/* RetrievalProgress */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            RetrievalProgress
          </Text>
          <RetrievalProgress sources={mockSources} isActive={streamingActive} />
        </div>

        {/* VerificationProgress */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            VerificationProgress
          </Text>
          <VerificationProgress isActive={streamingActive} label="Checking accuracy..." />
        </div>
      </Stack>
    </SectionWrapper>
  )
}
