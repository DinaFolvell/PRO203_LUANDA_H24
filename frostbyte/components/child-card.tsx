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
  const statusColor: Record<AttendanceStatus, string> = {
    present: "#496F57",
    expected: "#C28E00",
    picked_up: "#75339B",
    absent: "#F50000",
  };

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
        <Text
          style={styles.nameText}
          numberOfLines={1}       // prevents wrapping
          ellipsizeMode="tail"    // adds "..." if text is too long
          >
        {name}
        </Text>
        <Image source={statusIcon} style={styles.statusIcon} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderBottomWidth: 4,
    overflow: "hidden",
  },

  imageContainer: {
    width: "100%",
    aspectRatio: 1,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffffff",
    paddingHorizontal: 4,
    height: 32,
    borderTopWidth: 1,
  },

  nameText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "500",
  },

  statusIcon: {
    width: 16,
    height: 16,
    resizeMode: "contain",
  },
});
