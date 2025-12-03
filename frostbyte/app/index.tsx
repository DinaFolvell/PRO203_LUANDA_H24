import { AttendanceButton } from "@/components/attendance-button";
import { StatusBar } from "../components/staus-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AbsenceButton } from "@/components/absence-button";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <AttendanceButton />
        <AbsenceButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 20 },

  buttonContainer: {
    flexDirection: "row",
    gap: 16, 
    marginTop: 20,
  },
});
