import { Stack, useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { eq, useLiveInfiniteQuery } from "@tanstack/react-db";
import { ChatOnetoOneCollections } from "@/db/tanstack";
import { ChatOneToOneList } from "@/features/chat/components/one-on-one/one-one-chat-list";
import { ChatterInfo } from "@/features/chat/components/one-on-one/chatter-details";
import { SendMessage } from "@/features/chat/components/one-on-one/send-message";
import ObjectID from "bson-objectid";

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

  const { data, fetchNextPage, hasNextPage } = useLiveInfiniteQuery(
    (q) =>
      q
        .from({ chatOneToOne: ChatOnetoOneCollections })
        .where(({ chatOneToOne }) => eq(chatOneToOne.conversationId, id))
        .orderBy(({ chatOneToOne }) => chatOneToOne.createdAt, "desc"),
    {
      pageSize: 5,
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length ? allPages.length : undefined,
    },
  );

  return (
    <>
      <Stack.Screen
        options={{
          header: () => <ChatterInfo userId={userId} />,
        }}
      />
      <View className="flex-1 p-2">
        <ChatOneToOneList
          data={data}
          onLoadPrevious={fetchNextPage}
          hasPrevious={hasNextPage}
        />
        <SendMessage
          className="items-center"
          conversationId={id}
          handleSubmit={sendChatMessage}
        />
      </View>
    </>
  );
}
