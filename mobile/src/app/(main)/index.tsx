import { View } from 'react-native';
import { Stack } from 'expo-router';
import { Button } from 'heroui-native/button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Description } from 'heroui-native/description';
import { desc, eq } from 'drizzle-orm';

import { HomeHeader } from '@/features/home/components/header';
import { db } from '@/db';
import { conversationOneToOneTable } from '@/db/tables/conversation-one-to-one.table';

import { pullChanges } from '@/db/sync';
import { ConversationList } from '@/features/home/components/conversation-list';

import { userTable } from '@/db/tables/user.table';
import { useLiveInfiniteQuery } from '@/db/hooks/use-live-infinite-query';

export default function HomeScreen() {
  const safeAreaInsets = useSafeAreaInsets();

  const { data, isLoading, fetchNextPage } = useLiveInfiniteQuery({
    query: db
      .select()
      .from(conversationOneToOneTable)
      .leftJoin(userTable, eq(conversationOneToOneTable.userId, userTable.id))
      .orderBy(desc(conversationOneToOneTable.updatedAt)),
    pageSize: 10,
  });

  if (isLoading) return <Description>{isLoading}</Description>;

  return (
    <>
      <Stack.Screen
        options={{
          header: () => (
            <HomeHeader
              style={{
                paddingTop: safeAreaInsets.top,
                paddingRight: safeAreaInsets.right,
                paddingLeft: safeAreaInsets.left,
              }}
            />
          ),
        }}
      />
      <View
        style={{
          paddingBottom: safeAreaInsets.bottom,
          paddingRight: safeAreaInsets.right,
          paddingLeft: safeAreaInsets.left,
        }}
        className="flex-1 p-2">
        <Button onPress={pullChanges}>Pull Changes</Button>

        <ConversationList className="mt-2" onEndReached={fetchNextPage} data={data} />
      </View>
    </>
  );
}
