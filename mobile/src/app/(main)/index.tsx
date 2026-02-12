import { View } from "react-native";

import { Description } from "heroui-native/description";

import { useAuthStore } from "@/store/auth";

import { Link, Stack } from "expo-router";
import { Button } from "heroui-native/button";

export default function HomeScreen() {
  const { user, logout } = useAuthStore((state) => state);

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
      <View className="flex-1 justify-center items-center">
        <Description>Hello {user?.name}</Description>
      </View>
    </>
  );
}
