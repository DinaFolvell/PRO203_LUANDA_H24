import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import AttendanceDropdown, { StatusKey } from "./dropdown-menu";

export interface ChildCardProps {
  name: string;
  image?: string | null;
  attendanceStatus?: StatusKey; 
  style?: object;
  onOpen?: () => void;
  onClose?: () => void;
}

export function HorizontalChildCard({
  name,
  image,
  attendanceStatus = "expected",   
  style, 
  onOpen,
  onClose,
}: ChildCardProps) { 

  const [status, setStatus] = useState<StatusKey>(attendanceStatus);

  const statusColors: Record<StatusKey, string> = {
    present: "#496F57",
    expected: "#C28E00",
    picked_up: "#75339B",
    absent: "#F50000",
  };

  const statusIcons: Record<StatusKey, any> = {
    present: require("../assets/icons/white-present-icon.png"),
    expected: require("../assets/icons/white-expected-icon.png"),
    picked_up: require("../assets/icons/white-picked-up-icon.png"),
    absent: require("../assets/icons/white-absent-icon.png"),
  };

  const currentColor = statusColors[status];
  const statusIcon = statusIcons[status];

  return (
    <View style={[styles.card, style]}>
      <View style={styles.imageContainer}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={styles.image}
            resizeMode="cover"
          />
          ) : (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>
            {name.charAt(0).toUpperCase()}
          </Text>
        </View>
      )}

        <View
          style={[styles.statusBadge, { backgroundColor: currentColor }]}
        >
          <Image source={statusIcon} style={styles.statusIcon} />
        </View>
      </View>

      <View style={styles.nameContainer}>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
          {name}
        </Text>
      </View>

      <View style={styles.dropdownContainer}>
        <AttendanceDropdown
          initialStatus={status}
          onChange={setStatus}
          onOpen={onOpen}
          onClose={onClose}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    position: "relative",
    zIndex: 1,
  },
  imageContainer: {
    position: "relative",
    marginRight: 12,
    width: 64,
    height: 64,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  loadingOverlay: {
    position: "absolute",
    inset: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000022",
    borderRadius: 8,
    zIndex: 2,
  },
  placeholderContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#999",
  },
  statusBadge: {
    position: "absolute",
    right: -4,
    top: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  statusIcon: {
    width: 16,
    height: 16,
    resizeMode: "contain",
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
  dropdownContainer: {
    marginLeft: 12,
  },
});