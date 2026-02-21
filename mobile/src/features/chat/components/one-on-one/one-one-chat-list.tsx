import { cn } from "tailwind-variants";
import {
  FlashList,
  type FlashListProps,
  type FlashListRef,
} from "@shopify/flash-list";
import { useRef, Activity, useState, useMemo } from "react";
import { Button } from "heroui-native/button";
import {
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  View,
} from "react-native";
import { useDatabase } from "@nozbe/watermelondb/react";
import { Q } from "@nozbe/watermelondb";

import { ChatText } from "./chat-text";

import { Ionicons } from "@/components/icon";
import { ChatOneToOne } from "@/db/models/chat-one-to-one.model";

import { CHAT_ONE_TO_ONE_TABLE_NAME } from "@/db/tables/chat-one-to-one.table";
import { useWatermelonModelsPage } from "@/db/hooks/use-watermelondb-infinite-query";

interface OneOnOneChatListProps extends Omit<
  FlashListProps<ChatOneToOne>,
  "data" | "children" | "keyExtractor" | "renderItem"
> {
  conversationId: string;
}

export function OneOnOneChatList({
  className,
  conversationId,
  ...props
}: OneOnOneChatListProps) {
  const ref = useRef<FlashListRef<ChatOneToOne> | null>(null);
  const database = useDatabase();

  const [data, setData] = useState<ChatOneToOne[]>([]);
  const [viewHeight, setViewHeight] = useState<number>(0);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const [isAtListEnd, setIsAtListEnd] = useState<boolean>(false);

  // 1. Sort DESCENDING to fetch the newest messages from the database first
  const query = useMemo(
    () => [
      Q.where("conversation_id", conversationId),
      Q.sortBy("created_at", Q.desc),
    ],
    [conversationId],
  );

  const { next } = useWatermelonModelsPage<ChatOneToOne>({
    collection: CHAT_ONE_TO_ONE_TABLE_NAME,
    database,
    query,
    // 2. Reverse the array so the newest message is at the bottom of the screen
    onChange: (newData) => setData([...newData].reverse()),
    limit: 10, // Increased to 20 for a smoother chat experience
  });

  const scrollToEnd = () => {
    ref.current?.scrollToEnd({ animated: true });
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;

    const paddingToBottom = 20;

    const atBottom =
      contentOffset.y + layoutMeasurement.height >=
      contentSize.height - paddingToBottom;

    setIsAtListEnd(atBottom);
  };

  return (
    <View
      className={cn("flex-1 relative", className)}
      onLayout={(e) => setViewHeight(e.nativeEvent.layout.height)}
    >
      <FlashList
        ref={ref}
        onScroll={handleScroll}
        onContentSizeChange={(_, h) => setContentHeight(h)}
        data={data}
        onStartReached={next} // 3. Fetch older messages when scrolling to the top
        onStartReachedThreshold={0.5}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatText data={item} />}
        initialScrollIndex={data.length > 0 ? data.length - 1 : 0}
        maintainVisibleContentPosition={{
          startRenderingFromBottom: true,
          animateAutoScrollToBottom: true,
          autoscrollToBottomThreshold: 0.1,
        }}
        {...props}
      />
      <Activity
        mode={viewHeight < contentHeight && !isAtListEnd ? "visible" : "hidden"}
      >
        <Button
          className="absolute bottom-2 right-0 z-10"
          variant="tertiary"
          onPress={scrollToEnd}
        >
          <Ionicons name="arrow-down" />
        </Button>
      </Activity>
    </View>
  );
}
