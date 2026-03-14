'use client'

import { twMerge } from 'tailwind-merge'
import React, { useState, useRef, useCallback } from 'react'
import { View, TextInput, Pressable } from 'react-native'

export type MessageComposerProps = {
  onSend: (content: string) => void
  isLoading?: boolean
  placeholder?: string
  className?: string
}

function ArrowUpIcon({ color }: { color: string }) {
  return (
    <View style={{ width: 18, height: 18, alignItems: 'center', justifyContent: 'center' }}>
      {/* Upward-pointing triangle */}
      <View style={{
        width: 0,
        height: 0,
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderBottomWidth: 7,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: color,
      }} />
      {/* Vertical stem */}
      <View style={{
        width: 2.5,
        height: 7,
        backgroundColor: color,
      }} />
    </View>
  )
}

function StopIcon({ color }: { color: string }) {
  return (
    <View style={{
      width: 12,
      height: 12,
      borderRadius: 2,
      backgroundColor: color,
    }} />
  )
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
      'flex-row items-end rounded-3xl border bg-surface shadow-lg shadow-black/10',
      isFocused ? 'border-accent/40' : 'border-border/60',
      className,
    )}>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={setValue}
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
          'flex-1 bg-transparent',
          'pl-5 pr-3 pt-4 pb-4 text-[15px]',
          'text-text-primary',
        )}
        placeholderTextColor="rgba(128,128,128,0.7)"
        accessibilityLabel="Message input"
      />

      <View className="pb-3 pr-3">
        <Pressable
          onPress={handleSend}
          disabled={!canSend && !isLoading}
          accessibilityLabel={isLoading ? 'Stop generating' : 'Send message'}
          className={twMerge(
            'items-center justify-center',
            'w-9 h-9 rounded-full',
            canSend
              ? 'bg-accent active:opacity-70'
              : isLoading
                ? 'bg-text-muted/20 active:opacity-70'
                : 'bg-transparent',
          )}
        >
          {isLoading ? (
            <StopIcon color="rgba(128,128,128,0.7)" />
          ) : (
            <ArrowUpIcon color={canSend ? '#ffffff' : 'rgba(128,128,128,0.4)'} />
          )}
        </Pressable>
      </View>
    </View>
  )
}

export { MessageComposer }
