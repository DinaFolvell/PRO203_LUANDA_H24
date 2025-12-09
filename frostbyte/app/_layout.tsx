// app/_layout.tsx
import { Stack } from "expo-router";
import { AuthSessionProvider, useAuthSession } from "@/providers/authctx";
import { ActivityIndicator, View } from "react-native";

function RootNavigator() {
  const { user, isLoading } = useAuthSession();

  // Vis enkel loader mens vi sjekker om brukeren er logget inn
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {user ? (
        // 🔓 BRUKER ER LOGGET INN → vis “ordentlig” app
        <>
          {/* Hvis du har en tabs-gruppe som mappe: app/(tabs)/... */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          {/* Evt andre skjermer som ligger ved siden av */}
          <Stack.Screen name="side-menu" options={{ presentation: "modal" }} />
        </>
      ) : (
        // 🔒 IKKE LOGGET INN → vis kun authentication-skjermen
        <Stack.Screen
          name="authentication"
          options={{ headerShown: false }}
        />
      )}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthSessionProvider>
      <RootNavigator />
    </AuthSessionProvider>
  );
}