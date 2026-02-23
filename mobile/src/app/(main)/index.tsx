import { View } from "react-native";
import { Stack } from "expo-router";
import { Button } from "heroui-native/button";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HomeHeader } from "@/features/home/components/header";
import { db } from "@/db";
import { conversationOneToOneTable } from "@/db/tables/conversation-one-to-one.table";
import { asc } from "drizzle-orm";
import { pullChanges } from "@/db/sync";
import { toCompilableQuery } from "@powersync/drizzle-driver";
import { useQuery } from "@powersync/react-native";

const query = db
  .select()
  .from(conversationOneToOneTable)
  .orderBy(asc(conversationOneToOneTable.updatedAt));

export default function HomeScreen() {
  const safeAreaInsets = useSafeAreaInsets();

  const { data } = useQuery(toCompilableQuery(query));

  console.log("Data with hook", data);

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
        className="flex-1 p-2"
      >
        <Button onPress={pullChanges}>Pull Changes</Button>
      </View>
    </>
  );
}
