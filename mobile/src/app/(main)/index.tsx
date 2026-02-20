import { View } from "react-native";
import { Link, Stack } from "expo-router";
import { Button } from "heroui-native/button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLiveInfiniteQuery } from "@tanstack/react-db";

import { useAuthStore } from "@/store/auth";

import { pullChanges } from "@/db/tanstack/sync";
import { ConversationOnetoOneCollections } from "@/db/tanstack";

import { ConversationList } from "@/features/home/components/conversation-list";
import { encryption } from "@/features/chat/encryption";

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
        <Button
          onPress={
            // () =>
            // encryption.encrypt(
            //   "3efb2c58fc8c9400e1c8d78d3e2909b66e54236fea9aa581679e5970b7c5d478",
            //   "Hi sir how are you?? 🥲",
            // )

            () =>
              encryption.decrypt(
                "3efb2c58fc8c9400e1c8d78d3e2909b66e54236fea9aa581679e5970b7c5d478",
                "197d95951eac04848efc8ac4b82f9086:cd5c63d0207aed7f5cb0e980a6b8182f8e5ce4fb52ad1dd3cf8624783a045c23",
              )
          }
        >
          Pull Changes
        </Button>

        <ConversationList data={data} onEndReached={fetchNextPage} />
      </View>
    </>
  );
}
