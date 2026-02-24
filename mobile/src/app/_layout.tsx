import '../../global.css';

import { Stack } from 'expo-router';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import 'react-native-reanimated';

import { TanstackReactQueryClientProvider } from '@/providers/tanstack-query-client.provider';
import { HeroUIThemeProvider } from '@/providers/heroui.provider';
import { PowerSyncDatabaseProvider } from '@/db';

export default function RootLayout() {
  return (
    <HeroUIThemeProvider>
      <KeyboardProvider>
        <PowerSyncDatabaseProvider>
          <TanstackReactQueryClientProvider>
            <Stack initialRouteName="(main)" screenOptions={{ headerShown: false }} />
          </TanstackReactQueryClientProvider>
        </PowerSyncDatabaseProvider>
      </KeyboardProvider>
    </HeroUIThemeProvider>
  );
}
