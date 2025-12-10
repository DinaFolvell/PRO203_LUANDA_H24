import { Child } from "@/api/childApi";
import { ChildList } from "@/components/child-list";
import React from "react";
import { View, StyleSheet } from "react-native";

interface Props {
  onChildPress: (child: Child) => void;
}

export default function PickedUpScreen({ onChildPress }: Props) {
  return (
    <View style={styles.container}>
      <ChildList
        filterStatus="picked_up"
        onChildPress={onChildPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
