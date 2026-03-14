import React, { useContext, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import { View, useColorScheme } from 'react-native'
import Markdown from 'react-native-markdown-display'
import { ThemeContext } from '@surf-kit/theme'

type ResponseMessageProps = {
  content: string
  className?: string
}

function normalizeMarkdownLists(content: string) {
  return content.replace(/:\s+-\s+/g, ':\n\n- ')
}

const markdownStyles = {
  body: { color: undefined }, // Let NativeWind handle via parent
  paragraph: { marginVertical: 4, fontSize: 14, lineHeight: 22 },
  heading1: { fontSize: 18, fontWeight: '700' as const, marginTop: 16, marginBottom: 8 },
  heading2: { fontSize: 16, fontWeight: '700' as const, marginTop: 12, marginBottom: 6 },
  heading3: { fontSize: 14, fontWeight: '600' as const, marginTop: 8, marginBottom: 4 },
  bullet_list: { marginVertical: 4 },
  ordered_list: { marginVertical: 4 },
  list_item: { marginVertical: 2 },
  strong: { fontWeight: '600' as const },
  code_inline: { fontSize: 12, fontFamily: 'monospace', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  code_block: { fontSize: 12, fontFamily: 'monospace', padding: 16, borderRadius: 12, borderWidth: 1 },
  blockquote: { borderLeftWidth: 2, paddingLeft: 16 },
  link: { textDecorationLine: 'underline' as const },
}

function ResponseMessage({ content, className }: ResponseMessageProps) {
  const systemScheme = useColorScheme()
  const themeCtx = useContext(ThemeContext)
  // brand and dark modes both have dark backgrounds; fall back to system scheme
  const isDark = themeCtx?.colorMode === 'brand' || themeCtx?.colorMode === 'dark' || systemScheme === 'dark'

  const themedStyles = useMemo(() => ({
    ...markdownStyles,
    body: { color: isDark ? '#e8e8e8' : '#1a1a1a' },
    code_inline: {
      ...markdownStyles.code_inline,
      backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
      color: isDark ? '#38bdf8' : '#0284c7',
    },
    code_block: {
      ...markdownStyles.code_block,
      backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
      borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
    },
    blockquote: {
      ...markdownStyles.blockquote,
      borderLeftColor: isDark ? '#38bdf8' : '#0284c7',
    },
    link: {
      ...markdownStyles.link,
      color: isDark ? '#38bdf8' : '#0284c7',
    },
    heading1: { ...markdownStyles.heading1, color: isDark ? '#f0f0f0' : '#111111' },
    heading2: { ...markdownStyles.heading2, color: isDark ? '#f0f0f0' : '#111111' },
    heading3: { ...markdownStyles.heading3, color: isDark ? '#f0f0f0' : '#111111' },
  }), [isDark])

  return (
    <View className={twMerge('text-sm', className)} data-testid="response-message">
      <Markdown style={themedStyles}>
        {normalizeMarkdownLists(content)}
      </Markdown>
    </View>
  )
}

export { ResponseMessage }
export type { ResponseMessageProps }
