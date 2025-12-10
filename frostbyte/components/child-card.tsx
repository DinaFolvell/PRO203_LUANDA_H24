import React from "react";
import { View, Text, Image, StyleSheet, ViewStyle } from "react-native";
import { imageMap } from "@/assets/images/imageMap";
import { AttendanceStatus } from "@/api/childApi";

interface ChildCardProps {
  name: string;
  image?: string | null;
  attendanceStatus?: AttendanceStatus;
  style?: ViewStyle;
}

export function ChildCard({
  name,
  image,
  attendanceStatus = "expected",
  style,
}: ChildCardProps) {
  const imageSource =
    image && imageMap[image] ? imageMap[image] : imageMap["noimage.png"];

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

  const borderColor = statusColor[attendanceStatus];
  const statusIcon = statusIcons[attendanceStatus];

  return (
    <View style={[styles.root, { borderBottomColor: borderColor }, style]}>
      {/* Bilde */}
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} resizeMode="cover" />
      </View>

      {/* Navn + status */}
      <View style={styles.nameContainer}>
        <Text style={styles.nameText} numberOfLines={1} ellipsizeMode="tail">
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
    backgroundColor: "#f0f0f0",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  placeholderContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
  },

  placeholderText: {
    fontSize: 48,
    fontWeight: "700",
    color: "#999",
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
    flex: 1,
  },

  statusIcon: {
    width: 16,
    height: 16,
    resizeMode: "contain",
    marginLeft: 4,
  },
});
