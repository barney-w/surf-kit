import {
  AgentAvatar,
  AgentHandoff,
  AgentLabel,
  ConfidenceBadge,
  ConfidenceBreakdownView,
  ConfidenceMeter,
  FeedbackDialog,
  RoutingIndicator,
  SourceBadge,
  SourceCard,
  SourceList,
  ThumbsFeedback,
  VerificationBadge,
  VerificationDetail,
} from '@surf-kit/agent'
import { Separator, Stack, Text } from '@surf-kit/core'
import { useState } from 'react'
import {
  mockAgents,
  mockConfidenceHigh,
  mockConfidenceLow,
  mockConfidenceMedium,
  mockSources,
  mockVerificationFailed,
  mockVerificationFlagged,
  mockVerificationPassed,
} from '../showcase-data'
import { SectionWrapper } from './SectionWrapper'

export function AgentComponentsSection() {
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false)

  return (
    <SectionWrapper title="Agent Components">
      <Stack gap={6}>
        {/* AgentAvatar */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            AgentAvatar — sizes
          </Text>
          <Stack direction="horizontal" gap={3} align="center">
            <AgentAvatar agent={mockAgents[0]} size="sm" />
            <AgentAvatar agent={mockAgents[1]} size="md" />
            <AgentAvatar agent={mockAgents[2]} size="lg" />
            <AgentAvatar agent={mockAgents[3]} size="sm" />
            <AgentAvatar agent={mockAgents[4]} size="md" />
            <AgentAvatar agent={mockAgents[5]} size="lg" />
          </Stack>
        </div>

        {/* AgentLabel */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            AgentLabel
          </Text>
          <Stack direction="horizontal" gap={3} align="center">
            {mockAgents.slice(0, 4).map((a) => (
              <AgentLabel key={a.id} agent={a} />
            ))}
          </Stack>
        </div>

        <Separator />

        {/* AgentHandoff */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            AgentHandoff
          </Text>
          <AgentHandoff from={mockAgents[0]} to={mockAgents[1]} />
        </div>

        {/* RoutingIndicator */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            RoutingIndicator
          </Text>
          <RoutingIndicator
            from="Coordinator"
            to="Finance Agent"
            reason="Pricing-related query detected"
          />
        </div>

        <Separator />

        {/* Sources */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            SourceCard &amp; SourceList
          </Text>
          <Stack gap={3}>
            <SourceCard source={mockSources[0]} variant="expanded" />
            <SourceList sources={mockSources} collapsible defaultExpanded={false} />
            <Stack direction="horizontal" gap={2} align="center">
              <Text size="xs" color="muted">
                SourceBadge:
              </Text>
              <SourceBadge count={mockSources.length} />
            </Stack>
          </Stack>
        </div>

        <Separator />

        {/* Confidence */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            Confidence — Badge, Meter &amp; Breakdown
          </Text>
          <Stack gap={3}>
            <Stack direction="horizontal" gap={2} align="center">
              <ConfidenceBadge confidence={mockConfidenceHigh} />
              <ConfidenceBadge confidence={mockConfidenceMedium} />
              <ConfidenceBadge confidence={mockConfidenceLow} />
            </Stack>
            <Stack gap={2}>
              <ConfidenceMeter value={0.95} label="Retrieval quality" />
              <ConfidenceMeter value={0.72} label="Source authority" />
              <ConfidenceMeter value={0.35} label="Groundedness" />
            </Stack>
            <ConfidenceBreakdownView confidence={mockConfidenceHigh} defaultExpanded />
          </Stack>
        </div>

        <Separator />

        {/* Verification */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            Verification — Badge &amp; Detail
          </Text>
          <Stack gap={3}>
            <Stack direction="horizontal" gap={2} align="center">
              <VerificationBadge verification={mockVerificationPassed} />
              <VerificationBadge verification={mockVerificationFlagged} />
              <VerificationBadge verification={mockVerificationFailed} />
            </Stack>
            <VerificationDetail verification={mockVerificationFlagged} defaultExpanded />
          </Stack>
        </div>

        <Separator />

        {/* Feedback */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            ThumbsFeedback &amp; FeedbackDialog
          </Text>
          <Stack gap={3}>
            <ThumbsFeedback
              messageId="demo-msg-1"
              onFeedback={(id, rating) => console.log('Feedback:', id, rating)}
              onNegative={() => setFeedbackDialogOpen(true)}
            />
            <FeedbackDialog
              isOpen={feedbackDialogOpen}
              onClose={() => setFeedbackDialogOpen(false)}
              onSubmit={(comment) => {
                console.log('Feedback submitted:', comment)
                setFeedbackDialogOpen(false)
              }}
            />
          </Stack>
        </div>
      </Stack>
    </SectionWrapper>
  )
}
