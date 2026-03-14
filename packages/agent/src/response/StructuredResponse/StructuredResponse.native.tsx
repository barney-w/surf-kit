import React, { useContext, useMemo } from 'react'
import { View, Text, Pressable, Linking, useColorScheme } from 'react-native'
import Markdown from 'react-native-markdown-display'
import { ThemeContext } from '@surf-kit/theme'
import type { AgentResponse } from '../../types/agent'

type StructuredResponseProps = {
  uiHint: AgentResponse['ui_hint']
  data: Record<string, unknown> | null
  className?: string
}

/** Parse a value that may be a JSON-encoded string or already parsed. */
function tryParse<T>(value: unknown): T | null {
  if (value === undefined || value === null) return null
  if (typeof value === 'string') {
    try {
      return JSON.parse(value) as T
    } catch {
      return null
    }
  }
  return value as T
}

function useIsDark() {
  const systemScheme = useColorScheme()
  const themeCtx = useContext(ThemeContext)
  return themeCtx
    ? themeCtx.colorMode === 'brand' || themeCtx.colorMode === 'dark'
    : true
}

function useInlineMarkdownStyles() {
  const isDark = useIsDark()
  const textColor = isDark ? '#e8e8e8' : '#1a1a1a'
  return useMemo(() => ({
    body: { fontSize: 14, lineHeight: 22, margin: 0, padding: 0, color: textColor },
    text: { color: textColor },
    textgroup: { color: textColor },
    paragraph: { marginTop: 0, marginBottom: 0, color: textColor },
    strong: { fontWeight: '600' as const, color: textColor },
    em: { fontStyle: 'italic' as const, color: textColor },
    code_inline: { fontSize: 12, fontFamily: 'monospace', color: isDark ? '#38bdf8' : '#0284c7' },
    bullet_list_icon: { color: textColor },
    ordered_list_icon: { color: textColor },
  }), [isDark, textColor])
}

function StepsRenderer({ data }: { data: Record<string, unknown> }) {
  const styles = useInlineMarkdownStyles()
  const steps = tryParse<string[]>(data.steps)
  if (!steps || !Array.isArray(steps)) return null
  return (
    <View className="flex flex-col gap-2" testID="structured-steps">
      {steps.map((step, i) => (
        <View key={i} className="flex-row items-start gap-3">
          <View className="mt-0.5 h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent">
            <Text className="text-[11px] font-semibold text-white">{i + 1}</Text>
          </View>
          <View className="flex-1">
            <Markdown style={styles}>{step}</Markdown>
          </View>
        </View>
      ))}
    </View>
  )
}

function renderTable(data: Record<string, unknown>) {
  const columns = tryParse<string[]>(data.columns)
  const rawRows = tryParse<unknown[]>(data.rows)

  if (columns && rawRows && Array.isArray(columns) && Array.isArray(rawRows)) {
    return (
      <View className="overflow-hidden rounded-lg border border-border" testID="structured-table">
        {/* Header row */}
        <View className="flex-row bg-surface-raised">
          {columns.map((col) => (
            <View key={col} className="flex-1 px-4 py-2.5 border-b border-border">
              <Text className="text-left font-semibold text-text-primary text-sm">{col}</Text>
            </View>
          ))}
        </View>
        {/* Data rows */}
        {rawRows.map((row, i) => {
          const cells = Array.isArray(row)
            ? row
            : columns.map((col) => (row as Record<string, unknown>)[col])
          return (
            <View key={i} className={`flex-row ${i % 2 === 1 ? 'bg-surface-raised/40' : ''}`}>
              {cells.map((cell, j) => (
                <View key={j} className="flex-1 px-4 py-2 border-b border-border">
                  <Text className="text-text-secondary text-sm">{String(cell ?? '')}</Text>
                </View>
              ))}
            </View>
          )
        })}
      </View>
    )
  }

  // Fallback: key-value table
  const entries = Object.entries(data)
  return (
    <View className="overflow-hidden rounded-lg border border-border" testID="structured-table">
      {entries.map(([key, value], i) => (
        <View key={key} className={`flex-row ${i % 2 === 1 ? 'bg-surface-raised/40' : ''}`}>
          <View className="w-1/3 px-4 py-2 border-b border-border">
            <Text className="text-text-primary font-medium text-sm">{key}</Text>
          </View>
          <View className="flex-1 px-4 py-2 border-b border-border">
            <Text className="text-text-secondary text-sm">
              {typeof value === 'object' ? JSON.stringify(value) : String(value ?? '')}
            </Text>
          </View>
        </View>
      ))}
    </View>
  )
}

function renderCard(data: Record<string, unknown>) {
  const title = typeof data.title === 'string' ? data.title : null
  const body = typeof data.body === 'string' ? data.body : null
  const link = typeof data.link === 'string' ? data.link : null
  const linkLabel = typeof data.link_label === 'string' ? data.link_label : 'Learn more'

  return (
    <View
      className="rounded-xl border border-border bg-surface-raised p-4 flex flex-col gap-2"
      testID="structured-card"
    >
      {title && <Text className="text-sm font-semibold text-text-primary">{title}</Text>}
      {body && <Text className="text-sm text-text-secondary leading-relaxed">{body}</Text>}
      {link && (
        <Pressable
          className="mt-1 flex-row items-center gap-1"
          onPress={() => Linking.openURL(link)}
          accessibilityRole="link"
        >
          <Text className="text-xs font-medium text-accent">{linkLabel}</Text>
          <Text className="text-xs text-accent">{'\u2197'}</Text>
        </Pressable>
      )}
    </View>
  )
}

function ListRenderer({ data }: { data: Record<string, unknown> }) {
  const styles = useInlineMarkdownStyles()
  const items = tryParse<string[]>(data.items)
  const title = typeof data.title === 'string' ? data.title : null
  if (!items || !Array.isArray(items)) return null

  return (
    <View className="flex flex-col gap-1.5" testID="structured-list">
      {title && (
        <Text className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1">
          {title}
        </Text>
      )}
      <View className="flex flex-col gap-1.5">
        {items.map((item, i) => (
          <View key={i} className="flex-row items-start gap-2.5">
            <View className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <View className="flex-1">
              <Markdown style={styles}>{item}</Markdown>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

function renderWarning(data: Record<string, unknown>) {
  const severity = typeof data.severity === 'string' ? data.severity : 'medium'
  const action = typeof data.action === 'string' ? data.action : null
  const details = typeof data.details === 'string' ? data.details : null
  const isHigh = severity === 'high'

  return (
    <View
      accessibilityRole="alert"
      className={`rounded-xl border p-4 flex-row gap-3 ${
        isHigh
          ? 'border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/30'
          : 'border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-950/30'
      }`}
      testID="structured-warning"
    >
      <Text className={`mt-0.5 text-lg shrink-0 ${isHigh ? 'text-red-500' : 'text-amber-500'}`}>
        {'\u26A0'}
      </Text>
      <View className="flex flex-col gap-1 flex-1">
        {action && (
          <Text
            className={`text-sm font-semibold ${isHigh ? 'text-red-700 dark:text-red-300' : 'text-amber-700 dark:text-amber-300'}`}
          >
            {action}
          </Text>
        )}
        {details && (
          <Text
            className={`text-sm ${isHigh ? 'text-red-600 dark:text-red-400' : 'text-amber-600 dark:text-amber-400'}`}
          >
            {details}
          </Text>
        )}
      </View>
    </View>
  )
}

function StructuredResponse({ uiHint, data: rawData, className }: StructuredResponseProps) {
  const data =
    typeof rawData === 'string'
      ? (() => {
          try {
            return JSON.parse(rawData) as Record<string, unknown>
          } catch {
            return null
          }
        })()
      : rawData
  if (!data) return null

  let content: React.ReactNode

  switch (uiHint) {
    case 'steps':
      content = <StepsRenderer data={data} />
      break
    case 'table':
      content = renderTable(data)
      break
    case 'card':
      content = renderCard(data)
      break
    case 'list':
      content = <ListRenderer data={data} />
      break
    case 'warning':
      content = renderWarning(data)
      break
    case 'text':
      content =
        typeof data.text === 'string' ? (
          <Text testID="structured-text">{data.text}</Text>
        ) : null
      break
    default:
      content = null
  }

  if (!content) return null

  return (
    <View className={className} testID="structured-response">
      {content}
    </View>
  )
}

export { StructuredResponse }
export type { StructuredResponseProps }
