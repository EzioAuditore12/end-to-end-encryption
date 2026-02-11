import "../../global.css";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaListener } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Uniwind, useUniwind } from "uniwind";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

export default function RootLayout() {
  const { theme } = useUniwind();
  return (
    <SafeAreaListener
      onChange={({ insets }) => {
        Uniwind.updateInsets(insets);
      }}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <GluestackUIProvider mode="system">
          <StatusBar style={theme === "dark" ? "light" : "dark"} />
          <Stack />
        </GluestackUIProvider>
      </GestureHandlerRootView>
    </SafeAreaListener>
  );
}
