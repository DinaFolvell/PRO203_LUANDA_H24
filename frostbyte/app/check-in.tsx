import AttendanceCard from '@/components/attendance-card';
import { AttendanceOverview } from '@/components/attendance-overview';
import AttendanceDropdown from '@/components/dropdown-menu';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function CheckInScreen() {
  return (
    <View style={styles.container}>
      <AttendanceOverview style={styles.overView} />
      <AttendanceDropdown />
      <AttendanceCard
        photoUrl={require("../assets/images/dina.jpg")}
        name="Amalie S. Ulriksen"
        note="Blir hentet klokka 1200 pga. tidlig ferie"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 20 },
  overView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
});
