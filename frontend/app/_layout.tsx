import { Slot, Stack, useRouter } from 'expo-router'
import { ClerkProvider, ClerkLoaded, useAuth } from '@clerk/clerk-expo'
import { tokenCache } from '@/cache'
import { useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser'
import UserChannelContextProvider from '@/context/UserChannel'


const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

export default function RootLayout() {

  useWarmUpBrowser()

  return (
    <ClerkProvider
      publishableKey={publishableKey!}
      tokenCache={tokenCache}
    >
      <UserChannelContextProvider>
        <RootNavigator />
      </UserChannelContextProvider>
    </ClerkProvider>
  )
}


const RootNavigator = () => {

  const { isSignedIn } = useAuth()

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected
        guard={isSignedIn === true}
      >
        <Stack.Screen name='(tabs)' />
      </Stack.Protected>
      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen name='(auth)' />
      </Stack.Protected>
    </Stack>
  )
}
