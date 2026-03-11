import React from 'react'
import { View } from 'react-native'
import { Badge } from '@surf-kit/core'
import type { AgentResponse as AgentResponseType } from '../../types/agent'
import { ResponseMessage } from '../ResponseMessage'
import { StructuredResponse } from '../StructuredResponse'
import { SourceList } from '../../sources/SourceList'
import { FollowUpChips } from '../FollowUpChips'

type AgentResponseProps = {
  response: AgentResponseType
  showSources?: boolean
  showConfidence?: boolean
  showVerification?: boolean
  onFollowUp?: (suggestion: string) => void
  onNavigateSource?: (source: AgentResponseType['sources'][number]) => void
  className?: string
}

function getConfidenceIntent(overall: 'high' | 'medium' | 'low') {
  if (overall === 'high') return 'success' as const
  if (overall === 'medium') return 'warning' as const
  return 'error' as const
}

function getVerificationIntent(status: 'passed' | 'flagged' | 'failed') {
  if (status === 'passed') return 'success' as const
  if (status === 'flagged') return 'warning' as const
  return 'error' as const
}

function getVerificationLabel(status: 'passed' | 'flagged' | 'failed') {
  if (status === 'passed') return 'Verified'
  if (status === 'flagged') return 'Flagged'
  return 'Failed'
}

function AgentResponse({
  response,
  showSources = true,
  showConfidence = false,
  showVerification = false,
  onFollowUp,
  onNavigateSource,
  className,
}: AgentResponseProps) {
  return (
    <View className={`flex flex-col gap-4 ${className ?? ''}`} testID="agent-response">
      {/* Lead message */}
      <ResponseMessage content={response.message} />

      {/* Structured content */}
      {response.ui_hint !== 'text' && response.structured_data && (() => {
        const parsed = typeof response.structured_data === 'string'
          ? (() => { try { return JSON.parse(response.structured_data) as Record<string, unknown> } catch { return null } })()
          : response.structured_data as Record<string, unknown>
        return parsed ? <StructuredResponse uiHint={response.ui_hint} data={parsed} /> : null
      })()}

      {/* Confidence & Verification badges */}
      {(showConfidence || showVerification) && (
        <View className="flex flex-row flex-wrap items-center gap-2 mt-1" testID="response-meta">
          {showConfidence && (
            <Badge
              intent={getConfidenceIntent(response.confidence.overall)}
              size="sm"
            >
              {response.confidence.overall} confidence
            </Badge>
          )}
          {showVerification && (
            <Badge
              intent={getVerificationIntent(response.verification.status)}
              size="sm"
            >
              {getVerificationLabel(response.verification.status)} ({response.verification.claims_verified}/{response.verification.claims_checked})
            </Badge>
          )}
        </View>
      )}

      {/* Sources */}
      {showSources && response.sources.length > 0 && (
        <SourceList
          sources={response.sources}
          variant="compact"
          collapsible
          defaultExpanded={false}
          onNavigate={onNavigateSource}
        />
      )}

      {/* Follow-up suggestions */}
      {response.follow_up_suggestions.length > 0 && onFollowUp && (
        <FollowUpChips
          suggestions={response.follow_up_suggestions}
          onSelect={onFollowUp}
        />
      )}
    </View>
  )
}

export { AgentResponse }
export type { AgentResponseProps }
