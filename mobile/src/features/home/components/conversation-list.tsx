import { LegendList, type LegendListProps } from "@legendapp/list";
import { router } from "expo-router";

import { ConversationOneToOne } from "@/db/tables/conversation-one-to-one.table";
import { ConversationOneToOneCard } from "./conversation-one-to-one-card";

interface ConversationListProps extends Omit<
  LegendListProps<ConversationOneToOne>,
  "data" | "children" | "keyExtractor" | "renderItem"
> {
  data: ConversationOneToOne[];
}

export function ConversationList({
  className,
  data,
  ...props
}: ConversationListProps) {
  return (
    <>
      <LegendList
        data={data}
        onEndReachedThreshold={0.5}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ConversationOneToOneCard
            className="mb-3"
            data={item}
            onPress={() =>
              router.push({
                pathname: "/chat/[id]",
                params: { id: item.id, userId: item.userId },
              })
            }
          />
        )}
        recycleItems
        {...props}
      />
    </>
  );
}
