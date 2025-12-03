import { AttendanceButton } from "@/components/attendance-button";
import { AttendanceOverview } from "../components/attendance-overview";
import React from "react";
import { StyleSheet, View } from "react-native";
import { AbsenceButton } from "@/components/absence-button";
import { MessagesButton } from "@/components/messages-button";
import { CareButton } from "@/components/care-button";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <AttendanceButton />
        <AbsenceButton />
        <CareButton />
        <MessagesButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 20 },

  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap", 
    justifyContent: "center",
    gap: 16,
    marginTop: 20,
  },
});
