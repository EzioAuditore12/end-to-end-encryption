import { Redirect, Stack } from 'expo-router';
import '@/lib/polyfills';

import { useAuthStore } from '@/store/auth';

export default function AuthenticationLayout() {
  const { tokens } = useAuthStore((state) => state);

  if (tokens) return <Redirect href={'/(main)'} />;

  return (
    <Stack initialRouteName="login">
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
    </Stack>
  );
}
