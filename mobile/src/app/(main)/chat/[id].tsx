import { Stack, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

import { SendMessage } from '@/features/chat/components/one-on-one/send-message';
import { ChatOneToOneList } from '@/features/chat/components/one-on-one/chat-one-to-one-list';
import { db } from '@/db';
import { chatOneToOneTable } from '@/db/tables/chat-one-to-one.table';

import { desc, eq } from 'drizzle-orm';
import { ChatterInfo } from '@/features/chat/components/one-on-one/chatter-info';

import { useLiveInfiniteQuery } from '@/db/hooks/use-live-infinite-query';
import { useSocketState } from '@/store/socket-io';
import { useEffect } from 'react';
import { sendMessageEvent } from '@/features/chat/events/send-message.event';

export default function ChattingScreen() {
  const { id, userId } = useLocalSearchParams() as unknown as {
    id: string;
    userId: string;
  };

  const { socket, connectSocket } = useSocketState();

  useEffect(() => {
    connectSocket();

    socket?.emit('conversation:join', id);

    return () => {
      socket?.emit('conversation:leave', id);
    };
  }, [socket, id, connectSocket]);

  const { data, fetchNextPage } = useLiveInfiniteQuery({
    query: db
      .select()
      .from(chatOneToOneTable)
      .orderBy(desc(chatOneToOneTable.createdAt))
      .where(eq(chatOneToOneTable.conversationId, id)),
    pageSize: 10,
  });

  const reversedData = data.flat().reverse();

  return (
    <>
      <Stack.Screen
        options={{
          header: () => <ChatterInfo userId={userId} />,
        }}
      />

      <View className="relative flex-1 p-2">
        <ChatOneToOneList data={reversedData} onStartReached={fetchNextPage} />
        <SendMessage
          socket={socket as any}
          conversationId={id}
          receiverId={userId}
          handleSubmit={sendMessageEvent}
        />
      </View>
    </>
  );
}
