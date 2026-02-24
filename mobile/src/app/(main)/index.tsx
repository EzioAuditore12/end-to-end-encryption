import { View } from 'react-native';
import { Stack } from 'expo-router';
import { Button } from 'heroui-native/button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { toCompilableQuery } from '@powersync/drizzle-driver';
import { Description } from 'heroui-native/description';
import { useQuery } from '@powersync/react-native';
import { desc, eq } from 'drizzle-orm';

import { HomeHeader } from '@/features/home/components/header';
import { db } from '@/db';
import { conversationOneToOneTable } from '@/db/tables/conversation-one-to-one.table';

import { pullChanges } from '@/db/sync';
import { ConversationList } from '@/features/home/components/conversation-list';

import { userTable } from '@/db/tables/user.table';

const query = db
  .select()
  .from(conversationOneToOneTable)
  .leftJoin(userTable, eq(conversationOneToOneTable.userId, userTable.id))
  .orderBy(desc(conversationOneToOneTable.updatedAt));

export default function HomeScreen() {
  const safeAreaInsets = useSafeAreaInsets();

  const { data, isLoading } = useQuery(toCompilableQuery(query));

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

        <ConversationList data={data} />
      </View>
    </>
  );
}
