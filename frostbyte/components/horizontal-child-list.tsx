import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { HorizontalChildCard } from "./horizontal-child-card";
import { ChildService, AttendanceStatus, Child } from "../api/childApi";

interface HorizontalChildListProps {
  filterStatus?: AttendanceStatus;
}

export function HorizontalChildList({ filterStatus }: HorizontalChildListProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [children, setChildren] = useState<Child[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadChildren = async () => {
    setIsLoading(true);
    setError(null);

    let result: [Child[], string | null];

    if (filterStatus) {
      result = await ChildService.getChildrenByStatus(filterStatus);
    } else {
      result = await ChildService.getAllChildren();
    }

    const [data, err] = result;

    if (err) {
      setError(err);
      console.error("Feil ved lasting av barn (horisontal liste):", err);
    } else {
      setChildren(data);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadChildren();
  }, [filterStatus]);

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="rgba(245, 69, 0, 1)" />
        <Text style={styles.loadingText}>Laster barn...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (children.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>Ingen barn funnet</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={children}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.contentContainer}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({ item, index }) => (
        <View
          style={[
            styles.rowWrapper,
            openIndex === index && styles.rowWrapperOpen,
          ]}
        >
          <HorizontalChildCard
            name={item.name}
            image={item.image}
            attendanceStatus={item.attendance}
            onOpen={() => setOpenIndex(index)}
            onClose={() => setOpenIndex(null)}
          />
        </View>
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
  rowWrapper: {
    position: "relative",
    zIndex: 1,
    overflow: "visible",
  },
  rowWrapperOpen: {
    zIndex: 999,
    elevation: 12,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    fontSize: 16,
    color: "#d32f2f",
    textAlign: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },
});