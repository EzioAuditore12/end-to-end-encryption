import { cn } from "tailwind-variants";
import { FlashList, type FlashListProps } from "@shopify/flash-list";

import type { ChatOneToOne } from "@/db/tables/chat-one-to-one.table";

import { ChatText } from "./chat-text";

interface OneOnOneChatListProps extends Omit<
  FlashListProps<ChatOneToOne>,
  "data" | "children" | "keyExtractor" | "renderItem"
> {
  data: ChatOneToOne[];
}

export function OneOnOneChatList({
  data,
  className,
  ...props
}: OneOnOneChatListProps) {
  // We use useMemo to avoid re-reversing on every render if data reference hasn't changed,
  // though with live queries it changes often.
  const reversedData = [...data].reverse();

  return (
    <FlashList
      className={cn("flex-1 p-2", className)}
      data={reversedData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ChatText data={item} />}
      // Calculate initial index based on data length
      initialScrollIndex={reversedData.length > 0 ? reversedData.length - 1 : 0}
      // Increase threshold to trigger fetch earlier
      onStartReachedThreshold={0.5}
      // Reduce estimated size to be closer to a single line message (helps with jumpiness)
      maintainVisibleContentPosition={{
        startRenderingFromBottom: true,
        animateAutoScrollToBottom: true,
        autoscrollToBottomThreshold: 0.1,
      }}
      {...props}
    />
  );
}
