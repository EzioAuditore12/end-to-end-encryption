import { cn } from "tailwind-variants";
import { LegendList, type LegendListProps } from "@legendapp/list";

import type { ChatOneToOne } from "@/db/tables/chat-one-to-one.table";

import { ChatText } from "./chat-text";

interface OneOnOneChatListProps extends Omit<
  LegendListProps<ChatOneToOne>,
  "data" | "children" | "keyExtractor" | "renderItem"
> {
  data: ChatOneToOne[];
}

export function OneOnOneChatList({
  data,
  className,

  ...props
}: OneOnOneChatListProps) {
  const reversedData = [...data].reverse();

  console.log(reversedData.length);

  return (
    <LegendList
      className={cn("p-2", className)}
      data={reversedData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ChatText data={item} />}
      initialScrollIndex={reversedData.length - 1}
      estimatedItemSize={160}
      alignItemsAtEnd
      maintainScrollAtEnd
      maintainScrollAtEndThreshold={0.1}
      {...props}
    />
  );
}
