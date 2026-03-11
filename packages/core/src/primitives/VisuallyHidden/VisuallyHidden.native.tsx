import React from 'react'
import { View } from 'react-native'

function VisuallyHidden({ children }: { children: React.ReactNode }) {
  return (
    <View
      accessibilityElementsHidden={true}
      importantForAccessibility="no-hide-descendants"
      style={{
        position: 'absolute',
        width: 1,
        height: 1,
        overflow: 'hidden',
      }}
    >
      {children}
    </View>
  )
}

export { VisuallyHidden }
