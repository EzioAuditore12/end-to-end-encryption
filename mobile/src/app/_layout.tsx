import '../../global.css';
import '@/lib/polyfills';

import { Stack } from 'expo-router';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import 'react-native-reanimated';

import { TanstackReactQueryClientProvider } from '@/providers/tanstack-query-client.provider';
import { HeroUIThemeProvider } from '@/providers/heroui.provider';

export default function RootLayout() {
  return (
    <HeroUIThemeProvider>
      <TanstackReactQueryClientProvider>
        <KeyboardProvider>
          <Stack initialRouteName="(main)" screenOptions={{ headerShown: false }} />
        </KeyboardProvider>
      </TanstackReactQueryClientProvider>
    </HeroUIThemeProvider>
  );
}
