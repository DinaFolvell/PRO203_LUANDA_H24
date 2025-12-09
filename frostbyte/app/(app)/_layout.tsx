import { Redirect, Stack } from "expo-router";
import "react-native-reanimated";

import { useAuthSession } from "@/providers/authctx";
import { Text, View } from "react-native";

export default function RootLayout() {
  const { user, isLoading } = useAuthSession();

  if (isLoading) {
    return (
      <View>
        <Text>Henter bruker...</Text>
      </View>
    );
  }

  if (!user) {
    return <Redirect href={"../authentication"} />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="+not-found" />
      <Stack.Screen name="post-details/[id]" />
    </Stack>
  );
}
