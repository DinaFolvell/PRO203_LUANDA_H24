import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { dayPlanEvents } from "../../data/dayplan-events";

export default function DayPlanDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const event = dayPlanEvents.find((e) => e.id === id);

  if (!event) {
    return (
      <View style={styles.center}>
        <Text>Fant ikke aktivitet.</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <View style={styles.container}>
        <View
          style={[
            styles.header,
            { backgroundColor: event.color, paddingTop: insets.top },
          ]}
        >
          <TouchableOpacity onPress={() => router.push("/dashboard")}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{event.title}</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Tidspunkt</Text>
            <Text style={styles.timeText}>
              {event.start}–{event.end}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Kommentar</Text>
            <Text style={styles.bodyText}>{event.description}</Text>
          </View>
        </View>

        <View
          style={[
            styles.buttonsContainer,
            { paddingBottom: insets.bottom + 16 },
          ]}
        >
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() =>
              router.push({
                pathname: "/day-plan/[id]/edit",
                params: { id: event.id },
              })
            }
          >
            <Text style={styles.primaryButtonText}>Endre på aktivitet</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Slett aktivitet</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  header: {
    backgroundColor: "#d7e9ff",
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backArrow: {
    fontSize: 22,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  timeText: {
    fontSize: 16,
  },
  bodyText: {
    fontSize: 15,
  },
  list: {
    marginTop: 4,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  bullet: {
    marginRight: 6,
    fontSize: 15,
  },
  buttonsContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    backgroundColor: "#f7f7f7",
    gap: 12,
  },

  primaryButton: {
    backgroundColor: "#e85a1c",
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  secondaryButton: {
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e85a1c",
  },
  secondaryButtonText: {
    color: "#e85a1c",
    fontWeight: "700",
    fontSize: 16,
  },
  sectionDivider: {
    flexGrow: 1,
  },
});
