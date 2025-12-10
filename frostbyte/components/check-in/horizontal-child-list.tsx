import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { HorizontalChildCard } from "./horizontal-child-card";
import { ChildService, AttendanceStatus } from "@/services/childService";

interface HorizontalChildListProps {
  filterStatus?: AttendanceStatus;
}

export function HorizontalChildList({ filterStatus }: HorizontalChildListProps) {
  const data = filterStatus
    ? ChildService.getChildrenByStatus(filterStatus)
    : ChildService.getAllChildren();

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.contentContainer}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({ item }) => (
        <HorizontalChildCard
          name={item.name}
          image={item.image}
          attendanceStatus={item.attendance}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  separator: {
    height: 8,
  },
});
