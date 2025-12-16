import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Child, AttendanceStatus } from "@/api/childApi";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "@/firebaseConfig";

export interface AttendanceOverviewProps {
  activeIndex: number;
  onIndexChange: (index: number) => void;
}

interface AttendanceItem {
  label: string;
  icon: any;
  countKey: AttendanceStatus | "all";
}

const attendanceItems: AttendanceItem[] = [
  {
    label: "Alle barn",
    icon: require("../assets/icons/all-icon.png"),
    countKey: "all",
  },
  {
    label: "Tilstede",
    icon: require("../assets/icons/green-present-icon.png"),
    countKey: "present",
  },
  {
    label: "Forventet",
    icon: require("../assets/icons/yellow-expected-icon.png"),
    countKey: "expected",
  },
  {
    label: "Hentet",
    icon: require("../assets/icons/purple-picked-up-icon.png"),
    countKey: "picked_up",
  },
  {
    label: "Fravær",
    icon: require("../assets/icons/red-absent-icon.png"),
    countKey: "absent",
  },
];

export function AttendanceOverview({
  activeIndex,
  onIndexChange,
}: AttendanceOverviewProps) {
  const [counts, setCounts] = useState({
    all: 0,
    present: 0,
    expected: 0,
    picked_up: 0,
    absent: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "childData"),
      (snapshot) => {
        const children = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Child)
        );

        const newCounts = {
          all: children.length,
          present: 0,
          expected: 0,
          picked_up: 0,
          absent: 0,
        };

        children.forEach((child) => {
          newCounts[child.attendance] += 1;
        });

        setCounts(newCounts);
        setLoading(false);
      },
      (error) => {
        console.error("Realtime error:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={[styles.bar, styles.centerContent]}>
        <ActivityIndicator size="small" color="rgba(245, 69, 0, 1)" />
      </View>
    );
  }

  return (
    <View style={styles.bar}>
      {attendanceItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.statusItem}
          onPress={() => onIndexChange(index)}
        >
          <View style={styles.countContainer}>
            <Text style={styles.countText}>{counts[item.countKey]}</Text>
            <Image source={item.icon} style={styles.icon} />
          </View>

          <Text style={styles.labelText}>{item.label}</Text>

          {activeIndex === index && <View style={styles.activeMarker} />}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  statusItem: {
    alignItems: "center",
    padding: 4,
  },
  countContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  countText: {
    fontSize: 18,
    fontWeight: "600",
  },
  labelText: {
    fontSize: 14,
    fontWeight: "500",
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginLeft: 4,
  },
  activeMarker: {
    height: 2,
    backgroundColor: "black",
    width: "100%",
    marginTop: 4,
  },
});
