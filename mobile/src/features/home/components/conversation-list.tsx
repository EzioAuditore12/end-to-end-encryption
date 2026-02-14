import { useEffect, useRef } from "react";
import { FlashList, type FlashListProps } from "@shopify/flash-list";

import { ConversationOneToOne } from "@/db/tables/conversation-one-to-one.table";
import { ConversationOneToOneCard } from "./conversation-one-to-one-card";

interface ConversationListProps extends Omit<
  FlashListProps<ConversationOneToOne>,
  "data" | "children" | "keyExtractor" | "renderItem"
> {
  data: {
    id: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    userName: string | undefined;
    userEmail: string | undefined;
  }[];
}

export function ConversationList({
  className,
  data,
  ...props
}: ConversationListProps) {
  const flashListRef = useRef<null>(null);

  const scrollToTop = () => {
    if (flashListRef.current) {
      flashListRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  };

  useEffect(() => {
    scrollToTop();
  }, [data]); // data is your list of items

  return (
    <>
      <FlashList
        ref={flashListRef}
        data={data}
        onEndReachedThreshold={0.5}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ConversationOneToOneCard
            className="mb-3"
            data={item}
            onPress={() => console.log(item.id)}
          />
        )}
        {...props}
      />
    </>
  );
}
