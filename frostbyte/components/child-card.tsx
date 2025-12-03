import React from "react";
import { View, Text, Image, StyleSheet, ImageSourcePropType } from "react-native";

export interface ChildCardProps {
  name: string;
  image: ImageSourcePropType;
  attendanceStatus?: "present" | "expected" | "picked_up" | "absent";
  style?: object;
}

export function ChildCard({
  name,
  image,
  attendanceStatus = "expected",
  style,
}: ChildCardProps) {

  const statusColor = {
    present: "#496F57",
    expected: "#C28E00",
    picked_up: "#75339B",
    absent: "#F50000",
  }[attendanceStatus];

  return (
    <View style={[styles.root, style]}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} resizeMode="cover" />
      </View>

      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>{name}</Text>

        <View
          style={[styles.statusVector, { backgroundColor: statusColor }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: 115,
    height: 148,
    padding: -1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },

  imageContainer: {
    width: '100%',   
    aspectRatio: 1,   
    backgroundColor: "red",
    position: "relative",
    overflow: "hidden",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginBottom: 0,
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  nameContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 4,
    height: 25,
    borderTopWidth: 2,
    borderColor: "#ccc",
  },

  nameText: {
    textAlign: "left",
    color: "#000",
    fontSize: 12,
    fontWeight: "400",
  },

  statusVector: {
    width: 24,
    height: 24,
    borderRadius: 10,
    backgroundColor: "green",
  },
});


