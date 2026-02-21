import "../../global.css";

import { Stack } from "expo-router";
import { KeyboardProvider } from "react-native-keyboard-controller";
import "react-native-reanimated";

import { TanstackReactQueryClientProvider } from "@/providers/tanstack-query-client.provider";
import { HeroUIThemeProvider } from "@/providers/heroui.provider";

import { DatabaseProvider } from "@/db";

export default function RootLayout() {
  return (
    <HeroUIThemeProvider>
      <TanstackReactQueryClientProvider>
        <KeyboardProvider>
          <DatabaseProvider>
            <Stack
              initialRouteName="(main)"
              screenOptions={{ headerShown: false }}
            />
          </DatabaseProvider>
        </KeyboardProvider>
      </TanstackReactQueryClientProvider>
    </HeroUIThemeProvider>
  );
}
