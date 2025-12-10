import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ChildService } from "@/api/childApi";

export interface AttendanceOverviewProps {
  activeIndex: number;
  onIndexChange: (index: number) => void;
}

interface AttendanceItem {
  label: string;
  icon: any;
  countKey: "all" | "present" | "expected" | "picked_up" | "absent";
}

interface AttendanceCounts {
  all: number;
  present: number;
  expected: number;
  picked_up: number;
  absent: number;
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
  const [counts, setCounts] = useState<AttendanceCounts>({
    all: 0,
    present: 0,
    expected: 0,
    picked_up: 0,
    absent: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCounts();
  }, []);

  const loadCounts = async () => {
    setIsLoading(true);
    setError(null);

    const [data, err] = await ChildService.getAttendanceCounts();

    if (err) {
      setError(err);
      console.error("Feil ved henting av oppmøte-data:", err);
    } else {
      setCounts(data);
    }

    setIsLoading(false);
  };

  // Funksjon for å refreshe data (kan kalles fra foreldre-komponent om nødvendig)
  const refresh = () => {
    loadCounts();
  };

  if (isLoading) {
    return (
      <View style={[styles.bar, styles.centerContent]}>
        <ActivityIndicator size="small" color="rgba(245, 69, 0, 1)" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.bar, styles.centerContent]}>
        <Text style={styles.errorText}>Kunne ikke laste data</Text>
        <TouchableOpacity onPress={refresh} style={styles.retryButton}>
          <Text style={styles.retryText}>Prøv igjen</Text>
        </TouchableOpacity>
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
  errorText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  retryButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "rgba(245, 69, 0, 0.1)",
    borderRadius: 6,
  },
  retryText: {
    color: "rgba(245, 69, 0, 1)",
    fontSize: 14,
    fontWeight: "600",
  },
});
