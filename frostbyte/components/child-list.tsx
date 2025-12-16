import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Dimensions,
  Text,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { ChildCard } from "./child-card";
import { Child, AttendanceStatus } from "@/api/childApi";

interface ChildListProps {
  children: Child[];
  filterStatus?: AttendanceStatus; 
  onRefresh?: () => void;
  isRefreshing?: boolean;
  onChildPress?: (child: Child) => void;
}

export function ChildList({
  children,
  filterStatus,
  onRefresh,
  isRefreshing = false,
  onChildPress,
}: ChildListProps) {
  const [numColumns, setNumColumns] = useState(3);
  const [cardWidth, setCardWidth] = useState(0);

  const filteredData = filterStatus
    ? children.filter((c) => c.attendance === filterStatus)
    : children;

  useEffect(() => {
    const updateLayout = () => {
      const screenWidth = Dimensions.get("window").width;
      const horizontalPadding = 16 * 2;
      const spacing = 16;
      const desiredCardWidth = 140;

      let columns = Math.floor(
        (screenWidth + spacing) / (desiredCardWidth + spacing)
      );

      columns = columns < 3 ? 3 : columns;

      const calculatedCardWidth =
        (screenWidth - horizontalPadding - spacing * (columns - 1)) / columns;

      setNumColumns(columns);
      setCardWidth(calculatedCardWidth);
    };

    updateLayout();
    const subscription = Dimensions.addEventListener("change", updateLayout);
    return () => subscription.remove();
  }, []);

  if (!filteredData || filteredData.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>Ingen barn funnet</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={filteredData}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      scrollEnabled={false}
      renderItem={({ item, index }) => {
        const marginRight = (index + 1) % numColumns === 0 ? 0 : 16;

        const card = (
          <View style={[styles.cardWrapper, { width: cardWidth, marginRight }]}>
            <ChildCard
              name={item.name}
              image={item.image}
              attendanceStatus={item.attendance}
              style={{ width: cardWidth }}
            />
          </View>
        );

        if (onChildPress) {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onChildPress(item)}
            >
              {card}
            </TouchableOpacity>
          );
        }

        return card;
      }}
      contentContainerStyle={styles.contentContainer}
      style={styles.flatList}
      columnWrapperStyle={{ marginBottom: 16 }}
      key={numColumns}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          colors={["rgba(245, 69, 0, 1)"]}
        />
      }
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
    aspectRatio: 115 / 148,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
  },
});
