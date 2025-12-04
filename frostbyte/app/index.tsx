import { AttendanceButton } from "@/components/attendance-button";
import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { AbsenceButton } from "@/components/absence-button";
import { MessagesButton } from "@/components/messages-button";
import { CareButton } from "@/components/care-button";
import {
  NotificationsOverview,
  mockNotifications,
} from "@/components/notifications-overview";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.shortcutsBox}>
          <Text style={styles.shortcutsTitle}>Snarveier</Text>
          <View style={styles.buttonContainer}>
            <AttendanceButton />
            <AbsenceButton />
            <CareButton />
            <MessagesButton />
          </View>
        </View>

        <View style={styles.notificationsContainer}>
          <NotificationsOverview notifications={mockNotifications} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },

  shortcutsBox: {
    width: "100%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    shadowColor: "rgba(0,0,0,0.15)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
  },

  shortcutsTitle: {
    fontSize: 23,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "left",
  },

  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
    marginTop: 20,
  },

  notificationsContainer: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "rgba(0,0,0,0.15)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
    padding: 20,
  },
});
