import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  RefreshControl,
  ScrollView,
} from "react-native";
import { ChildList } from "@/components/child-list";
import { ChildService, Child } from "@/api/childApi";

interface Props {
  onChildPress: (child: Child) => void;
}

export default function AllScreen({ onChildPress }: Props) {
  const [children, setChildren] = useState<Child[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

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
    setIsRefreshing(true);
    await loadChildren();
    setIsRefreshing(false);
  }, []);

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
      <ScrollView
        contentContainerStyle={styles.centerContainer}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={["rgba(245, 69, 0, 1)"]}
          />
        }
      >
        <Text style={styles.errorText}>⚠️ {error}</Text>
        <Text style={styles.errorHint}>Dra ned for å prøve igjen</Text>
      </ScrollView>
    );
  }

  if (children.length === 0) {
    return (
      <ScrollView
        contentContainerStyle={styles.centerContainer}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={["rgba(245, 69, 0, 1)"]}
          />
        }
      >
        <Text style={styles.emptyText}>Ingen barn registrert</Text>
        <Text style={styles.emptyHint}>Legg til barn for å komme i gang</Text>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <ChildList
        children={children}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        onChildPress={onChildPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
    marginBottom: 8,
  },
  errorHint: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  emptyHint: {
    fontSize: 14,
    color: "#999",
  },
});
