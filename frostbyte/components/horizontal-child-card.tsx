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
      <View> 
      </View>
    );
}