import { Stack, useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { eq, useLiveInfiniteQuery } from "@tanstack/react-db";
import ObjectID from "bson-objectid";

import { ChatOnetoOneCollections } from "@/db/tanstack";
import { OneOnOneChatList } from "@/features/chat/components/one-on-one/one-one-chat-list";
import { ChatterInfo } from "@/features/chat/components/one-on-one/chatter-details";
import { SendMessage } from "@/features/chat/components/one-on-one/send-message";

const sendChatMessage = ({
  conversationId,
  text,
}: {
  conversationId: string;
  text: string;
}) => {
  ChatOnetoOneCollections.insert({
    id: ObjectID().toHexString(),
    conversationId,
    text,
    mode: "SENT",
    status: "SENT",
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
  });
};

export default function ChattingScreen() {
  const { id, userId } = useLocalSearchParams() as unknown as {
    id: string;
    userId: string;
  };

  const { data, fetchNextPage } = useLiveInfiniteQuery(
    (q) =>
      q
        .from({ chatOneToOne: ChatOnetoOneCollections })
        .where(({ chatOneToOne }) => eq(chatOneToOne.conversationId, id))
        .orderBy(({ chatOneToOne }) => chatOneToOne.createdAt, "desc"),
    {
      pageSize: 10, // Increased from 6 to 20
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length ? allPages.length : undefined,
    },
  );

  // Flatten the pages into a single array
  const flatData = data ? data.flat().reverse() : [];

  return (
    <>
      <Stack.Screen
        options={{
          header: () => <ChatterInfo userId={userId} />,
        }}
      />

      <View className="flex-1 relative p-2">
        {/* Pass flattened data */}
        <OneOnOneChatList onStartReached={fetchNextPage} data={flatData} />
        <SendMessage conversationId={id} handleSubmit={sendChatMessage} />
      </View>
    </>
  );
}
