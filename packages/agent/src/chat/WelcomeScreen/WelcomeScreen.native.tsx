import { twMerge } from 'tailwind-merge'
import React from 'react'
import { View, Text, Pressable } from 'react-native'

export type WelcomeScreenProps = {
  title?: string
  message?: string
  icon?: React.ReactNode
  iconClassName?: string
  suggestedQuestions?: string[]
  onQuestionSelect?: (question: string) => void
  className?: string
}

function WelcomeScreen({
  title = 'Welcome',
  message = 'How can I help you today?',
  icon,
  iconClassName,
  suggestedQuestions = [],
  onQuestionSelect,
  className,
}: WelcomeScreenProps) {
  return (
    <View className={twMerge('flex flex-1 flex-col items-center justify-center gap-8 p-8', className)}>
      {icon ? (
        iconClassName ? <View className={iconClassName}>{icon}</View> : icon
      ) : (
        <View className={twMerge(
          'w-14 h-14 rounded-2xl bg-accent/10 border border-border items-center justify-center',
          iconClassName,
        )}>
          <Text className="text-2xl">✦</Text>
        </View>
      )}

      <View className="flex flex-col gap-2 items-center">
        {title && <Text className="text-3xl font-bold text-text-primary text-center">{title}</Text>}
        <Text className="text-text-secondary text-base leading-relaxed text-center max-w-md">{message}</Text>
      </View>

      {suggestedQuestions.length > 0 && (
        <View className="flex flex-row flex-wrap justify-center gap-2 max-w-md">
          {suggestedQuestions.map(question => (
            <Pressable
              key={question}
              onPress={() => onQuestionSelect?.(question)}
              className="px-4 py-2 rounded-full border border-border bg-transparent"
              accessibilityRole="button"
            >
              <Text className="text-sm text-text-secondary">{question}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  )
}

export { WelcomeScreen }
