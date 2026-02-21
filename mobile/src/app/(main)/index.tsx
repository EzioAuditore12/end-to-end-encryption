import { View } from "react-native";
import { Link, Stack } from "expo-router";
import { Button } from "heroui-native/button";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useAuthStore } from "@/store/auth";

import { ConversationList } from "@/features/home/components/conversation-list";
import { pullChanges } from "@/db/sync";

export default function HomeScreen() {
  const { logout } = useAuthStore((state) => state);

  const safeAreaInsets = useSafeAreaInsets();

  return (
    <>
      <Stack.Screen
        options={{
          title: "End To End",
          headerRight: () => (
            <>
              <Link className="text-foreground mr-2" href={"/(main)/search"}>
                Search
              </Link>
              <Link className="text-foreground mr-2" href={"/(main)/profile"}>
                Profile
              </Link>
              <Button variant="danger" onPress={logout}>
                Logout
              </Button>
            </>
          ),
        }}
      />
      <View
        style={{ paddingBottom: safeAreaInsets.bottom }}
        className="flex-1 p-2"
      >
        <Button onPress={pullChanges}>Pull Changes</Button>

        <ConversationList />
      </View>
    </>
  );
}
