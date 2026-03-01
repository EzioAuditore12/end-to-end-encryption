import { FlashList, type FlashListProps } from '@shopify/flash-list';
import { router } from 'expo-router';
import { cn } from 'tailwind-variants';

import { ConversationOneToOneCard } from './conversation-one-to-one-card';
import type { ConversationOneToOneJoinWithUser } from '@/db/tables/conversation-one-to-one.table';

interface ConversationListProps extends Omit<
  FlashListProps<ConversationOneToOneJoinWithUser>,
  'data' | 'children' | 'keyExtractor' | 'renderItem'
> {
  data: ConversationOneToOneJoinWithUser[];
}

export function ConversationList({ className, data, ...props }: ConversationListProps) {
  return (
    <>
      <FlashList
        data={data}
        onEndReachedThreshold={0.5}
        keyExtractor={(item) => item.conversation_one_to_one.id}
        renderItem={({ item }) => (
          <ConversationOneToOneCard
            className={cn(className)}
            data={item}
            onPress={() =>
              router.push({
                pathname: '/chat/[id]',
                params: {
                  id: item.conversation_one_to_one.id,
                  userId: item.user?.id,
                },
              })
            }
          />
        )}
        {...props}
      />
    </>
  );
}
