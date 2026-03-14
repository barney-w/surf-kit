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
  // brand and dark modes both have dark backgrounds; when context is unavailable
  // (e.g. cross-package symlink resolution) default to dark since native app uses brand mode
  const isDark = themeCtx
    ? themeCtx.colorMode === 'brand' || themeCtx.colorMode === 'dark'
    : true

  const textColor = isDark ? '#e8e8e8' : '#1a1a1a'
  const headingColor = isDark ? '#f0f0f0' : '#111111'
  const accentColor = isDark ? '#38bdf8' : '#0284c7'

  const themedStyles = useMemo(() => ({
    ...markdownStyles,
    body: { color: textColor },
    text: { color: textColor },
    textgroup: { color: textColor },
    paragraph: { ...markdownStyles.paragraph, color: textColor },
    strong: { ...markdownStyles.strong, color: textColor },
    em: { fontStyle: 'italic' as const, color: textColor },
    s: { textDecorationLine: 'line-through' as const, color: textColor },
    bullet_list: { ...markdownStyles.bullet_list },
    ordered_list: { ...markdownStyles.ordered_list },
    list_item: { ...markdownStyles.list_item, color: textColor },
    bullet_list_icon: { color: textColor, marginLeft: 10, marginRight: 10 },
    ordered_list_icon: { color: textColor, marginLeft: 10, marginRight: 10 },
    bullet_list_content: { flex: 1, color: textColor },
    ordered_list_content: { flex: 1, color: textColor },
    heading1: { ...markdownStyles.heading1, color: headingColor },
    heading2: { ...markdownStyles.heading2, color: headingColor },
    heading3: { ...markdownStyles.heading3, color: headingColor },
    heading4: { fontSize: 14, fontWeight: '600' as const, color: headingColor },
    heading5: { fontSize: 13, fontWeight: '600' as const, color: headingColor },
    heading6: { fontSize: 12, fontWeight: '600' as const, color: headingColor },
    code_inline: {
      ...markdownStyles.code_inline,
      backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
      color: accentColor,
    },
    code_block: {
      ...markdownStyles.code_block,
      backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
      borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
      color: textColor,
    },
    fence: {
      ...markdownStyles.code_block,
      backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
      borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
      color: textColor,
    },
    blockquote: {
      ...markdownStyles.blockquote,
      borderLeftColor: accentColor,
      backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
    },
    link: {
      ...markdownStyles.link,
      color: accentColor,
    },
    td: { flex: 1, padding: 5, color: textColor },
    th: { flex: 1, padding: 5, fontWeight: '600' as const, color: headingColor },
    hr: { backgroundColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)', height: 1 },
  }), [isDark, textColor, headingColor, accentColor])

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
