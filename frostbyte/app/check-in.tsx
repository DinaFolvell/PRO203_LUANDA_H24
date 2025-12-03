import { AttendanceOverview } from '@/components/attendance-overview';
import AttendanceDropdown from '@/components/dropdown-menu';
import React from 'react';
import { StyleSheet, View} from 'react-native';

export default function CheckInScreen() {
  return (
    <View style={styles.container}>
      <AttendanceOverview />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: "#fff",
  },
  text: { 
    fontSize: 20 
  },
});