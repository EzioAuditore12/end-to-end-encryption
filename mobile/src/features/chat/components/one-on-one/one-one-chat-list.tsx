import { cn } from "tailwind-variants";
import { useCallback, useState, type ComponentProps } from "react";
import { ActivityIndicator, View } from "react-native";
import { LegendList } from "@legendapp/list";

import type { ChatOneToOne } from "@/db/tables/chat-one-to-one.table";

import { ChatText } from "./chat-text";

interface OneOnOneChatListProps extends Omit<
  ComponentProps<typeof LegendList<ChatOneToOne>>,
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
      <LegendList
        data={reversedData}
        className={cn("p-2", className)}
        snapToStart={false}
        initialScrollIndex={reversedData.length - 1}
        alignItemsAtEnd
        maintainScrollAtEnd
        maintainScrollAtEndThreshold={0.1}
        maintainVisibleContentPosition
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
