import { View } from 'react-native';
import { Stack } from 'expo-router';
import { Button } from 'heroui-native/button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLiveInfiniteQuery } from '@tanstack/react-db';

import { pullChanges } from '@/db/tanstack/sync';
import { ConversationOnetoOneCollections } from '@/db/tanstack';

import { ConversationList } from '@/features/home/components/conversation-list';
import { HomeHeader } from '@/features/home/components/header';

export default function HomeScreen() {
  const safeAreaInsets = useSafeAreaInsets();

  const { data, fetchNextPage } = useLiveInfiniteQuery(
    (q) =>
      q
        .from({ conversation: ConversationOnetoOneCollections })
        .orderBy(({ conversation }) => conversation.updatedAt, 'desc'),
    {
      pageSize: 10,
      getNextPageParam: (lastPage, allPages) => (lastPage.length ? allPages.length : undefined),
    }
  );

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

        <ConversationList data={data} onEndReached={fetchNextPage} />
      </View>
    </>
  );
}
