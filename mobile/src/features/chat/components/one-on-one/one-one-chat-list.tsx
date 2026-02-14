import type { ChatOneToOne } from "@/db/tables/chat-one-to-one.table";
import { FlashList, type FlashListProps } from "@shopify/flash-list";
import { cn } from "tailwind-variants";
import { ChatText } from "./chat-text";
import { useCallback, useState } from "react";
import { ActivityIndicator, View } from "react-native";

interface OneOnOneChatListProps extends Omit<
  FlashListProps<ChatOneToOne>,
  "data" | "children" | "keyExtractor" | "renderItem"
> {
  data: ChatOneToOne[];
  onLoadPrevious?: () => void;
  hasPrevious?: boolean;
}

export function ChatOneToOneList({
  className,
  data,
  onLoadPrevious,
  hasPrevious,
  ...props
}: OneOnOneChatListProps) {
  const reversedData = [...data].reverse();

  const [loadingPrevious, setLoadingPrevious] = useState(false);

  const handleStartReached = useCallback(() => {
    if (!hasPrevious || loadingPrevious || !onLoadPrevious) return;
    setLoadingPrevious(true);
    try {
      onLoadPrevious();
    } finally {
      setLoadingPrevious(false);
    }
  }, [hasPrevious, loadingPrevious, onLoadPrevious]);

  return (
    <>
      <FlashList
        data={reversedData}
        className={cn("p-2", className)}
        snapToStart={false}
        maintainVisibleContentPosition={{
          animateAutoScrollToBottom: true,
          startRenderingFromBottom: true,
          autoscrollToBottomThreshold: 1,
        }}
        onStartReached={handleStartReached}
        ListHeaderComponent={
          loadingPrevious ? (
            <View className="items-center py-2">
              <ActivityIndicator size="small" />
            </View>
          ) : null
        }
        onStartReachedThreshold={0.5}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatText data={item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
        {...props}
      />
    </>
  );
}
