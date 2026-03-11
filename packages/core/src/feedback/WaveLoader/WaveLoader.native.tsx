'use client'

import React, { useEffect, useRef } from 'react'
import { Animated, View } from 'react-native'
import { twMerge } from 'tailwind-merge'

const sizes = {
  sm: 24,
  md: 32,
  lg: 48,
} as const

type WaveLoaderProps = {
  size?: keyof typeof sizes
  color?: string
  label?: string
  className?: string
}

function WaveLoader({
  size = 'md',
  color = '#38bdf8',
  label = 'Loading',
  className,
}: WaveLoaderProps) {
  const px = sizes[size]
  const scaleAnim = useRef(new Animated.Value(0.6)).current
  const opacityAnim = useRef(new Animated.Value(0.3)).current

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 0.6,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0.3,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ]),
    )
    animation.start()
    return () => animation.stop()
  }, [scaleAnim, opacityAnim])

  return (
    <View
      className={twMerge('inline-flex', className)}
      accessibilityRole="progressbar"
      accessibilityLabel={label}
    >
      <Animated.View
        style={{
          width: px,
          height: px,
          borderRadius: px / 2,
          backgroundColor: color,
          opacity: opacityAnim,
          transform: [{ scale: scaleAnim }],
        }}
      />
    </View>
  )
}

export { WaveLoader }
export type { WaveLoaderProps }
