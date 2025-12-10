import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { AttendanceOverview } from "@/components/attendance-overview";
import { HorizontalChildList } from "@/components/horizontal-child-list";
import {
  AttendanceStatus,
  Child,
  ChildService,
} from "../api/childApi";

export default function CheckInListScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [children, setChildren] = useState<Child[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadChildren();
  }, []);

  const loadChildren = async () => {
    setIsLoading(true);
    setError(null);

    const [data, err] = await ChildService.getAllChildren();

    if (err) {
      setError(err);
      console.error("Feil ved henting av barn:", err);
    } else {
      setChildren(data);
    }

    setIsLoading(false);
  };

  const handleRefresh = useCallback(async () => {
    await loadChildren();
  }, []);

  const mapIndexToStatus = (index: number): AttendanceStatus | undefined => {
    switch (index) {
      case 0:
        return undefined;
      case 1:
        return "present";
      case 2:
        return "expected";
      case 3:
        return "picked_up";
      case 4:
        return "absent";
      default:
        return undefined;
    }
  };

  const filterStatus = mapIndexToStatus(activeIndex);

  // Filtrer barna basert på valgt status
  const filteredChildren = filterStatus
    ? children.filter((child) => child.attendance === filterStatus)
    : children;

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="rgba(245, 69, 0, 1)" />
        <Text style={styles.loadingText}>Laster barn...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>⚠️ {error}</Text>
        <Text style={styles.errorHint}>Dra ned for å prøve igjen</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AttendanceOverview
        activeIndex={activeIndex}
        onIndexChange={setActiveIndex}
      />

      <HorizontalChildList
        children={filteredChildren}
        onRefresh={handleRefresh}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFE3F4",
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
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
    marginBottom: 8,
  },
  errorHint: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
});
