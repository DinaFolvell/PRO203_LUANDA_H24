import React from "react";
import { View, Text, Image, StyleSheet, ImageSourcePropType } from "react-native";
import { AttendanceStatus } from "../services/childService";

export interface ChildCardProps {
  name: string;
  image: ImageSourcePropType;
  attendanceStatus?: AttendanceStatus;
  style?: object;
}

export function ChildCard({
  name,
  image,
  attendanceStatus = "expected",
  style,
}: ChildCardProps) {
  // Map attendance status to bottom border color
  const statusColor: Record<AttendanceStatus, string> = {
    present: "#496F57",
    expected: "#C28E00",
    picked_up: "#75339B",
    absent: "#F50000",
  };

  // Map attendance status to icon
  const statusIcons: Record<AttendanceStatus, any> = {
    present: require("../assets/icons/green-present-icon.png"),
    expected: require("../assets/icons/yellow-expected-icon.png"),
    picked_up: require("../assets/icons/purple-picked-up-icon.png"),
    absent: require("../assets/icons/red-absent-icon.png"),
  };

  const statusIcon = statusIcons[attendanceStatus];
  const borderColor = statusColor[attendanceStatus];

  return (
    <View style={[styles.root, { borderBottomColor: borderColor }, style]}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} resizeMode="cover" />
      </View>

      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>{name}</Text>

        {/* Status icon */}
        <Image source={statusIcon} style={styles.statusIcon} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: 115,
    height: 148,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderBottomWidth: 4, // dynamic bottom border
  },

  imageContainer: {
    width: "100%",
    aspectRatio: 1,
    overflow: "hidden",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 4,
    height: 25,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },

  nameText: {
    color: "#000",
    fontSize: 12,
  },

  statusIcon: {
    width: 16,
    height: 16,
    resizeMode: "contain",
  },
});
