import { ChildList } from "@/components/child-list";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Child } from "@/api/childApi";

interface Props {
  onChildPress: (child: Child) => void;
}

export default function PresentScreen({ onChildPress }: Props) {
  return (
    <View style={styles.container}>
      <ChildList
        filterStatus="present"
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
