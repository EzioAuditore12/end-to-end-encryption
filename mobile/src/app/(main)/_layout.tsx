import { Redirect, Stack } from 'expo-router';
import { useEffect } from 'react';

import { useAuthStore } from '@/store/auth';
import { useSocketState } from '@/store/socket-io';

export default function MainScreensLayout() {
  const { tokens } = useAuthStore((state) => state);
  const { connectSocket, disconnectSocket } = useSocketState();

  useEffect(() => {
    if (tokens) connectSocket();

    return () => disconnectSocket();
  }, [tokens, connectSocket, disconnectSocket]);

  if (!tokens) return <Redirect href={'/(auth)/login'} />;

  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" />
      <Stack.Screen name="search" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="user/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="chat/[id]" />
      <Stack.Screen name="new-chat/[id]" />
    </Stack>
  );
}
