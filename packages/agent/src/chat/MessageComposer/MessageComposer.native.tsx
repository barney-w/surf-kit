'use client'

import { twMerge } from 'tailwind-merge'
import React, { useState, useRef, useCallback } from 'react'
import { View, TextInput, Pressable, Text } from 'react-native'

export type MessageComposerProps = {
  onSend: (content: string) => void
  isLoading?: boolean
  placeholder?: string
  className?: string
}

function MessageComposer({
  onSend,
  isLoading = false,
  placeholder = 'Type a message...',
  className,
}: MessageComposerProps) {
  const [value, setValue] = useState('')
  const [inputHeight, setInputHeight] = useState(40)
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<TextInput>(null)

  const canSend = value.trim().length > 0 && !isLoading

  const handleSend = useCallback(() => {
    if (!canSend) return
    onSend(value.trim())
    setValue('')
    setInputHeight(40)
  }, [canSend, onSend, value])

  return (
    <View className={twMerge(
      'relative rounded-3xl border bg-surface shadow-lg shadow-black/10',
      isFocused ? 'border-accent/40' : 'border-border/60',
      className,
    )}>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={setValue}
        onSubmitEditing={handleSend}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        multiline
        editable={!isLoading}
        onContentSizeChange={(e) => {
          const h = Math.min(e.nativeEvent.contentSize.height, 200)
          setInputHeight(Math.max(40, h))
        }}
        style={{ height: inputHeight }}
        className={twMerge(
          'w-full bg-transparent',
          'pl-5 pr-14 pt-4 pb-4 text-[15px]',
          'text-text-primary',
        )}
        placeholderTextColor="rgba(128,128,128,0.7)"
        accessibilityLabel="Message input"
      />

      <Pressable
        onPress={handleSend}
        disabled={!value.trim() || isLoading}
        accessibilityLabel="Send message"
        className={twMerge(
          'absolute bottom-3 right-3',
          'items-center justify-center',
          'w-9 h-9 rounded-full',
          canSend ? 'bg-accent' : isLoading ? 'bg-text-muted/20' : 'bg-transparent',
        )}
      >
        <Text className={twMerge(
          'text-lg font-bold',
          canSend ? 'text-white' : 'text-text-muted/40',
        )}>
          {isLoading ? '■' : '↑'}
        </Text>
      </Pressable>
    </View>
  )
}

export { MessageComposer }
