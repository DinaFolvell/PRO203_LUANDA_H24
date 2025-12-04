import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ChildCard } from "./child-card";
import { ChildService, AttendanceStatus } from "../services/childService";

interface ChildListProps {
  filterStatus?: AttendanceStatus;
}

export function ChildList({ filterStatus }: ChildListProps) {
  const filteredData = filterStatus 
    ? ChildService.getChildrenByStatus(filterStatus)
    : ChildService.getAllChildren();

  return (
    <FlatList
      data={filteredData}
      keyExtractor={(item) => item.id}
      numColumns={3}
      columnWrapperStyle={styles.row}
      renderItem={({ item }) => (
        <View style={styles.cardWrapper}>
          <ChildCard
            name={item.name}
            image={item.image}
            attendanceStatus={item.attendance}
          />
        </View>
      )}
      contentContainerStyle={styles.contentContainer}
      style={styles.flatList}
    />
  );
}

const styles = StyleSheet.create({
  flatList: {
    paddingHorizontal: 16,
    flex: 1,
  },
  contentContainer: {
    paddingTop: 16,
  },
  row: {
    marginBottom: 16,
  },
  cardWrapper: {
    marginHorizontal: 8,
    height: 148,
  },
});
