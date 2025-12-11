import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
} from "react-native";

import { HorizontalChildCard } from "./horizontal-child-card";
import { Child, AttendanceStatus } from "@/api/childApi";

import { onSnapshot, collection } from "firebase/firestore";
import { db } from "@/firebaseConfig";

import { imageMap } from "@/assets/images/imageMap";

interface HorizontalChildListProps {
  filterStatus?: AttendanceStatus;
}

export function HorizontalChildList({
  filterStatus,
}: HorizontalChildListProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "childData"),
      (snapshot) => {
        const allChildren = snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as Child)
        );

     
        const filtered =
          filterStatus != null
            ? allChildren.filter((c) => c.attendance === filterStatus)
            : allChildren;

        setChildren(filtered);
        setLoading(false);
      },
      (error) => {
        console.error("Realtime error (horizontal list):", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [filterStatus]);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#f54500" />
        <Text style={styles.loadingText}>Laster barn...</Text>
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
            image={imageMap[item.image] || imageMap["noimage.png"]}
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
  emptyText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },
});
