import React, { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { AttendanceOverview } from "@/components/attendance-overview";
import { HorizontalChildList } from "@/components/horizontal-child-list";
import { AttendanceStatus, Child } from "../api/childApi";

import { onSnapshot, collection } from "firebase/firestore";
import { db } from "@/firebaseConfig";

export default function CheckInListScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔥 REALTIME LISTENER – henter ALLE barn
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "childData"),
      (snapshot) => {
        const liveChildren = snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as Child)
        );

        setChildren(liveChildren);
        setLoading(false);
      },
      (err) => {
        console.error("Realtime error:", err);
        setError("Kunne ikke laste barn");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Velg status basert på index
  const mapIndexToStatus = (index: number): AttendanceStatus | undefined => {
    switch (index) {
      case 1:
        return "present";
      case 2:
        return "expected";
      case 3:
        return "picked_up";
      case 4:
        return "absent";
      default:
        return undefined; // 0 = "Alle barn"
    }
  };

  const filterStatus = mapIndexToStatus(activeIndex);

  // Filtrer barna dynamisk basert på valgt status
  const filteredChildren = filterStatus
    ? children.filter((c) => c.attendance === filterStatus)
    : children;

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#f54500" />
        <Text style={styles.loadingText}>Laster barn...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>⚠️ {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AttendanceOverview
        activeIndex={activeIndex}
        onIndexChange={setActiveIndex}
      />

      {/* Horisontal liste med børn */}
      <HorizontalChildList filterStatus={filterStatus} />
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
    flex: 1,
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
});
