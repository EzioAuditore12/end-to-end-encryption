import { useState, useMemo } from "react";
import { FlashList, type FlashListProps } from "@shopify/flash-list";
import { router } from "expo-router";
import { useDatabase } from "@nozbe/watermelondb/react";
import { Q } from "@nozbe/watermelondb";

import { EnhancedConversationOneToOneCard } from "./conversation-one-to-one-card";
import { ConversationOneToOne } from "@/db/models/conversation-one-to-one.model";
import { CONVERSATION_ONE_TO_ONE_TABLE_NAME } from "@/db/tables/conversation-one-to-one.table";
import { useWatermelonModelsPage } from "@/db/hooks/use-watermelondb-infinite-query";

export function ConversationList({
  className,
  ...props
}: Omit<
  FlashListProps<ConversationOneToOne>,
  "data" | "children" | "keyExtractor" | "renderItem"
>) {
  const database = useDatabase();
  const [data, setData] = useState<ConversationOneToOne[]>([]);

  // ⚠️ IMPORTANT: Memoize the query array so it doesn't trigger infinite re-renders in the hook
  const query = useMemo(() => [Q.sortBy("updated_at", Q.desc)], []);

  const { next } = useWatermelonModelsPage<ConversationOneToOne>({
    collection: CONVERSATION_ONE_TO_ONE_TABLE_NAME,
    database,
    query,
    onChange: setData,
    limit: 2,
  });

  return (
    <>
      <FlashList
        maintainVisibleContentPosition={{
          autoscrollToTopThreshold: 0.7,
        }}
        data={data}
        onEndReachedThreshold={0.5}
        onEndReached={next} // <-- Triggers fetching the next page when scrolling near the bottom
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EnhancedConversationOneToOneCard
            className="mb-3"
            data={item}
            onPress={() =>
              router.push({
                pathname: "/chat/[id]",
                params: {
                  id: item.id,
                  userId: item._getRaw("user_id") as string,
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
