import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View, Dimensions } from "react-native";
import { ChildCard } from "./child-card";
import { ChildService, AttendanceStatus } from "../services/childService";

interface ChildListProps {
  filterStatus?: AttendanceStatus;
}

export function ChildList({ filterStatus }: ChildListProps) {
  const [numColumns, setNumColumns] = useState(3);
  const [cardWidth, setCardWidth] = useState(0);

  const filteredData = filterStatus 
    ? ChildService.getChildrenByStatus(filterStatus)
    : ChildService.getAllChildren();

  useEffect(() => {
    const updateLayout = () => {
      const screenWidth = Dimensions.get("window").width;
      const horizontalPadding = 16 * 2;
      const spacing = 16;
      const desiredCardWidth = 140;

      let columns = Math.floor((screenWidth + spacing) / (desiredCardWidth + spacing));
      columns = columns < 3 ? 3 : columns; // always at least 3 columns

      const calculatedCardWidth = (screenWidth - horizontalPadding - spacing * (columns - 1)) / columns;
      setNumColumns(columns);
      setCardWidth(calculatedCardWidth);
    };

    updateLayout();

    const subscription = Dimensions.addEventListener("change", updateLayout);
    return () => subscription.remove();
  }, []);

  return (
    <FlatList
      data={filteredData}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      renderItem={({ item, index }) => {
        const marginRight = (index + 1) % numColumns === 0 ? 0 : 16;
        return (
          <View style={[styles.cardWrapper, { width: cardWidth, marginRight }]}>
            <ChildCard
              name={item.name}
              image={item.image}
              attendanceStatus={item.attendance}
              style={{ width: cardWidth }}
            />
          </View>
        );
      }}
      contentContainerStyle={styles.contentContainer}
      style={styles.flatList}
      columnWrapperStyle={{ marginBottom: 16 }}
      key={numColumns}
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
  cardWrapper: {
    aspectRatio: 115 / 148, // optional: maintain original card ratio if needed
  },
});
