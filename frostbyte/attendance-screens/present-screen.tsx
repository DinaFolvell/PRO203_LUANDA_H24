import { Child } from "@/api/childApi";
import { ChildList } from "@/components/child-list";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";

import { onSnapshot, collection } from "firebase/firestore";
import { db } from "@/firebaseConfig";

interface Props {
  onChildPress: (child: Child) => void;
}

export default function PresentScreen({ onChildPress }: Props) {
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "childData"),
      (snapshot) => {
        const allChildren = snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as Child)
        );

        const presentChildren = allChildren.filter(
          (child) => child.attendance === "present"
        );

        setChildren(presentChildren);
        setLoading(false);
      },
      (error) => {
        console.error("Realtime error:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#496F57" />
        <Text>Laster tilstedeværende barn...</Text>
      </View>
    );
  }

  if (children.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.empty}>Ingen barn er registrert som tilstede</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ChildList
        children={children}
        onChildPress={onChildPress}
        isRefreshing={false}
        onRefresh={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  empty: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
