import { Stack, useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import ObjectID from "bson-objectid";

import { OneOnOneChatList } from "@/features/chat/components/one-on-one/one-one-chat-list";
import { EnhancedChatterInfo } from "@/features/chat/components/one-on-one/chatter-details";
import { SendMessage } from "@/features/chat/components/one-on-one/send-message";

import { chatOneToOneRepository } from "@/db/repositories/chat-one-to-one";

const sendChatMessage = async ({
  conversationId,
  text,
}: {
  conversationId: string;
  text: string;
}) => {
  await chatOneToOneRepository.create({
    id: ObjectID().toHexString(),
    conversationId,
    text,
    mode: "SENT",
    status: "SENT",
  });
};

export default function ChattingScreen() {
  const { id, userId } = useLocalSearchParams() as unknown as {
    id: string;
    userId: string;
  };

  return (
    <>
      <Stack.Screen
        options={{
          header: () => <EnhancedChatterInfo id={userId} />,
        }}
      />

      <View className="flex-1 relative p-2">
        <OneOnOneChatList conversationId={id} />
        <SendMessage conversationId={id} handleSubmit={sendChatMessage} />
      </View>
    </>
  );
}
