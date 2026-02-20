import { View } from "react-native";
import { Link, Stack } from "expo-router";
import { Button } from "heroui-native/button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLiveInfiniteQuery } from "@tanstack/react-db";

import { useAuthStore } from "@/store/auth";

import { pullChanges } from "@/db/tanstack/sync";
import { ConversationOnetoOneCollections } from "@/db/tanstack";

import { ConversationList } from "@/features/home/components/conversation-list";

export default function HomeScreen() {
  const { logout, dhPrivateKey } = useAuthStore((state) => state);

  const safeAreaInsets = useSafeAreaInsets();

  console.log(dhPrivateKey);

  const { data, fetchNextPage } = useLiveInfiniteQuery(
    (q) =>
      q
        .from({ conversation: ConversationOnetoOneCollections })
        .orderBy(({ conversation }) => conversation.updatedAt, "desc"),
    {
      pageSize: 10,
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length ? allPages.length : undefined,
    },
  );

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

        <ConversationList data={data} onEndReached={fetchNextPage} />
      </View>
    </>
  );
}
