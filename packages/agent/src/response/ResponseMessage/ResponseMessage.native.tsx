import React from 'react'
import { twMerge } from 'tailwind-merge'
import { View } from 'react-native'
import Markdown from 'react-native-markdown-display'

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
  return (
    <View className={twMerge('text-sm', className)} data-testid="response-message">
      <Markdown style={markdownStyles}>
        {normalizeMarkdownLists(content)}
      </Markdown>
    </View>
  )
}

export { ResponseMessage }
export type { ResponseMessageProps }
