import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
  Text,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { ChildCard } from "./child-card";
import { ChildService, AttendanceStatus, Child } from "../api/childApi";

interface ChildListProps {
  filterStatus?: AttendanceStatus;
  children?: Child[];
  onRefresh?: () => void;
  isRefreshing?: boolean;
  onChildPress?: (child: Child) => void; 
}

export function ChildList({
  filterStatus,
  children: externalChildren,
  onRefresh,
  isRefreshing = false,
  onChildPress,
}: ChildListProps) {
  const [numColumns, setNumColumns] = useState(3);
  const [cardWidth, setCardWidth] = useState(0);
  const [internalChildren, setInternalChildren] = useState<Child[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const children = externalChildren ?? internalChildren;

  useEffect(() => {

    if (!externalChildren) {
      loadChildren();
    }
  }, [filterStatus, externalChildren]);

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
      console.error("Feil ved lasting av barn:", err);
    } else {
      setInternalChildren(data);
    }

    setIsLoading(false);
  };

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

  const handleRefresh = async () => {
    if (onRefresh) {
      onRefresh();
    } else {
      await loadChildren();
    }
  };

  if (isLoading && !externalChildren) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="rgba(245, 69, 0, 1)" />
        <Text style={styles.loadingText}>Laster barn...</Text>
      </View>
    );
  }

  if (error && !externalChildren) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>⚠️ {error}</Text>
      </View>
    );
  }

  const filteredData = filterStatus
    ? children.filter((child) => child.attendance === filterStatus)
    : children;

  if (filteredData.length === 0) {
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

        const cardContent = (
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
              {cardContent}
            </TouchableOpacity>
          );
        }

        return cardContent;
      }}
      contentContainerStyle={styles.contentContainer}
      style={styles.flatList}
      columnWrapperStyle={{ marginBottom: 16 }}
      key={numColumns}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
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
