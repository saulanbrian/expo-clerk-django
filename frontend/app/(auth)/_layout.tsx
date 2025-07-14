import { Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'
import { ThemedView } from '@/components/ThemedView'
import { ActivityIndicator } from 'react-native'
import { styles } from '@/constants/styles'

export default function AuthLayout() {

  const { isLoaded } = useAuth()

  if (!isLoaded) return (
    <ThemedView style={styles.centerContainer}>
      <ActivityIndicator />
    </ThemedView>
  )

  return <Stack />
}
