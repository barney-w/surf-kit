import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { AgentInfo } from '../../types/agent'
import { useAgentTheme } from '../useAgentTheme'

describe('useAgentTheme', () => {
  const themes: Record<string, AgentInfo> = {
    'research-agent': {
      id: 'research-agent',
      label: 'Research',
      accent: '#10b981',
    },
    'code-agent': {
      id: 'code-agent',
      label: 'Code Assistant',
      accent: '#f59e0b',
    },
  }

  it('returns defaults when agentId is null', () => {
    const { result } = renderHook(() => useAgentTheme(null))

    expect(result.current.accent).toBe('#6366f1')
    expect(result.current.icon).toBeNull()
    expect(result.current.label).toBe('Agent')
  })

  it('returns defaults when agentId is undefined', () => {
    const { result } = renderHook(() => useAgentTheme(undefined))

    expect(result.current.accent).toBe('#6366f1')
    expect(result.current.label).toBe('Agent')
  })

  it('resolves theme from config', () => {
    const { result } = renderHook(() => useAgentTheme('research-agent', themes))

    expect(result.current.accent).toBe('#10b981')
    expect(result.current.label).toBe('Research')
    expect(result.current.icon).toBeNull()
  })

  it('falls back to agentId as label when not in config', () => {
    const { result } = renderHook(() => useAgentTheme('unknown-agent', themes))

    expect(result.current.accent).toBe('#6366f1')
    expect(result.current.label).toBe('unknown-agent')
    expect(result.current.icon).toBeNull()
  })

  it('returns different themes for different agents', () => {
    const { result: r1 } = renderHook(() => useAgentTheme('research-agent', themes))
    const { result: r2 } = renderHook(() => useAgentTheme('code-agent', themes))

    expect(r1.current.accent).toBe('#10b981')
    expect(r2.current.accent).toBe('#f59e0b')
    expect(r1.current.label).toBe('Research')
    expect(r2.current.label).toBe('Code Assistant')
  })

  it('uses default accent when theme has no accent', () => {
    const themesNoAccent: Record<string, AgentInfo> = {
      minimal: { id: 'minimal', label: 'Minimal Agent' },
    }

    const { result } = renderHook(() => useAgentTheme('minimal', themesNoAccent))

    expect(result.current.accent).toBe('#6366f1')
    expect(result.current.label).toBe('Minimal Agent')
  })
})
