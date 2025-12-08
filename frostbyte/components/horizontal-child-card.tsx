import React, { useState } from "react";
import { View, Text, Image, StyleSheet, ImageSourcePropType } from "react-native";
import AttendanceDropdown, { StatusKey } from "./dropdown-menu";

export interface ChildCardProps {
  name: string;
  image: ImageSourcePropType;
  attendanceStatus?: StatusKey;
  style?: object;
}


export function HorizontalChildCard({
  name,
  image,
  attendanceStatus = "expected",
  style,
}: ChildCardProps) {

  const [status, setStatus] = useState<StatusKey>(attendanceStatus);

  const statusColor = {
    present: "#496F57",
    expected: "#C28E00",
    picked_up: "#75339B",
    absent: "#F50000",
  }[status];

  const statusIcon = {
    present: require("../assets/icons/white-present-icon.png"),
    expected: require("../assets/icons/white-expected-icon.png"),
    picked_up: require("../assets/icons/white-picked-up-icon.png"),
    absent: require("../assets/icons/white-absent-icon.png"),
  }[status];

  return (
    <View style={[styles.card, style]}> 
      <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} />
        <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
          <Image source={statusIcon} style={styles.statusIcon} />
        </View>
      </View>

      <View style={styles.nameContainer}>
        <Text style={styles.name}>{name}</Text>
      </View>

      <View style={styles.dropdownContainer}>
        <AttendanceDropdown
          initialStatus={status}
          onChange={setStatus}
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
  cardOpen: {
    zIndex: 999,
    elevation: 10,
  },
  imageContainer: {
    position: "relative",
    marginRight: 12,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 8,
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