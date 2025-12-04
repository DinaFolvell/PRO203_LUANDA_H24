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