import { AbsenceButton } from "@/components/absence-button";
import { AttendanceButton } from "@/components/attendance-button";
import { CareButton } from "@/components/care-button";
import DayPlanOverview from "@/components/day-plan-overview";
import { MessagesButton } from "@/components/messages-button";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
        <DayPlanOverview />
      <View style={styles.buttonContainer}>
      </View>
    
      <View style={styles.shortcutsBox}>
        <Text style={styles.shortcutsTitle}>Snarveier</Text>
        <View style={styles.buttonContainer}>
          <AttendanceButton />
          <AbsenceButton />
          <CareButton />
          <MessagesButton />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 20 },
  
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
});
