import { Redirect, Stack } from "expo-router";
import "@/lib/polyfills";

import { useAuthStore } from "@/store/auth";

export default function MainScreensLayout() {
  const { tokens } = useAuthStore((state) => state);

  if (!tokens) return <Redirect href={"/(auth)/login"} />;
  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" />
      <Stack.Screen name="search" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="user/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="chat/[id]" />
    </Stack>
  );
}
