import { Stack, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

import { SendMessage } from '@/features/chat/components/one-on-one/send-message';
import { chatOneToOneRepository } from '@/db/repositories/chat-one-to-one.repository';
import { ChatOneToOneList } from '@/features/chat/components/one-on-one/chat-one-to-one-list';
import { db } from '@/db';
import { chatOneToOneTable } from '@/db/tables/chat-one-to-one.table';
import { useQuery } from '@powersync/react-native';
import { toCompilableQuery } from '@powersync/drizzle-driver';
import { desc, eq } from 'drizzle-orm';
import { ChatterInfo } from '@/features/chat/components/one-on-one/chatter-info';
import { conversationOneToOneRepository } from '@/db/repositories/conversation-one-to-one.repository';

const query = db.select().from(chatOneToOneTable).orderBy(desc(chatOneToOneTable.createdAt));

const sendChatMessage = async ({
  conversationId,
  text,
}: {
  conversationId: string;
  text: string;
}) => {
  await chatOneToOneRepository.create({
    conversationId,
    mode: 'SENT',
    status: 'SENT',
    text,
  });

  await conversationOneToOneRepository.updateTime(conversationId, Date.now());
};

export default function ChattingScreen() {
  const { id, userId } = useLocalSearchParams() as unknown as {
    id: string;
    userId: string;
  };

  console.log(id, userId);

  const { data } = useQuery(
    toCompilableQuery(query.where(eq(chatOneToOneTable.conversationId, id)))
  );

  return (
    <>
      <Stack.Screen
        options={{
          header: () => <ChatterInfo userId={userId} />,
        }}
      />

      <View className="relative flex-1 p-2">
        <ChatOneToOneList data={data} />
        <SendMessage conversationId={id} handleSubmit={sendChatMessage} />
      </View>
    </>
  );
}
