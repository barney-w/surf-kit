import '../global.css'
import { Stack } from 'expo-router'
import { ThemeProvider } from '@surf-kit/theme'

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  )
}
