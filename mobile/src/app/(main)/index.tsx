import { View } from "react-native";

import { useAuthStore } from "@/store/auth";

import { Link, Stack } from "expo-router";
import { Button } from "heroui-native/button";
import { pullChanges } from "@/db/tanstack/sync";
import { useLiveInfiniteQuery } from "@tanstack/react-db";
import { ConversationOnetoOneCollections } from "@/db/tanstack";
import { ConversationList } from "@/features/home/components/conversation-list";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { logout } = useAuthStore((state) => state);

  const safeAreaInsets = useSafeAreaInsets();

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

        <Button
          className="mt-2"
          onPress={() =>
            ConversationOnetoOneCollections.update(
              // Make sure to use the correct ID you want to update
              "6992fb73479add3b77d3af0b",
              (convo) => {
                // @ts-ignore
                if (convo.createdAt instanceof Date) {
                  convo.createdAt = convo.createdAt.getTime();
                }

                // Update the target field
                convo.updatedAt = Date.now();
              },
            )
          }
        >
          Update me
        </Button>
        <ConversationList data={data} onEndReached={fetchNextPage} />
      </View>
    </>
  );
}
