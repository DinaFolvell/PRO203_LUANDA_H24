import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { AttendanceOverview } from "@/components/attendance-overview";
import { HorizontalChildList } from "@/components/horizontal-child-list";
import { AttendanceStatus } from "@/services/childService";

export default function CheckInListScreen() {
  const [activeIndex, setActiveIndex] = useState(0);

  const mapIndexToStatus = (index: number): AttendanceStatus | undefined => {
    switch (index) {
      case 0: return undefined;
      case 1: return "present";
      case 2: return "expected";
      case 3: return "picked_up";
      case 4: return "absent";
      default: return undefined;
    }
  };

  const filterStatus = mapIndexToStatus(activeIndex);

  return (
    <View style={styles.container}>
      <AttendanceOverview
        activeIndex={activeIndex}
        onIndexChange={setActiveIndex}
      />

      <HorizontalChildList filterStatus={filterStatus} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFE3F4",
  },
});
