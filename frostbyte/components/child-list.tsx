import React from "react";
import { FlatList, StyleSheet, View} from "react-native";
import { ChildCard } from "./child-card";

const childrenData = [
  { id: "1",  name: "Emma Johansen",         image: require("../assets/images/emma.png"), attendance: "present" },
  { id: "2",  name: "Amalie Sanchez",        image: require("../assets/images/emma.png"), attendance: "present" },
  { id: "3",  name: "Oliver Kristoffersen",  image: require("../assets/images/emma.png"), attendance: "expected" },
  { id: "4",  name: "Sophia Lindberg",       image: require("../assets/images/emma.png"), attendance: "picked_up" },
  { id: "5",  name: "Liam Mikkelsen",        image: require("../assets/images/emma.png"), attendance: "absent" },
  { id: "6",  name: "Ava Nygård",            image: require("../assets/images/emma.png"), attendance: "expected" },
  { id: "7",  name: "Mia Pedersen",          image: require("../assets/images/emma.png"), attendance: "present" },
  { id: "8",  name: "Isabella Rønning",      image: require("../assets/images/emma.png"), attendance: "picked_up" },
  { id: "9",  name: "Lucas Solberg",         image: require("../assets/images/emma.png"), attendance: "absent" },
  { id: "10", name: "James Ulsrud",          image: require("../assets/images/emma.png"), attendance: "expected" },
  { id: "11", name: "Hanne Viken",           image: require("../assets/images/emma.png"), attendance: "picked_up" },
  { id: "12", name: "Benjamin Wold",         image: require("../assets/images/emma.png"), attendance: "absent" },
  { id: "13", name: "Henry Aamodt",          image: require("../assets/images/emma.png"), attendance: "absent" },
  { id: "14", name: "Ella Dahl",             image: require("../assets/images/emma.png"), attendance: "picked_up" },
  { id: "15", name: "William Eide",          image: require("../assets/images/emma.png"), attendance: "absent" },
  { id: "16", name: "Mateo Iversen",         image: require("../assets/images/emma.png"), attendance: "absent" },
] as const;

interface ChildListProps {
  statusFilter?: "present" | "expected" | "picked_up" | "absent";
}

export function ChildList({ statusFilter }: ChildListProps) {
  const filteredData = statusFilter 
    ? childrenData.filter(child => child.attendance === statusFilter)
    : childrenData;

  return (
    <FlatList
      data={filteredData}
      keyExtractor={(item) => item.id}
      numColumns={3}
      columnWrapperStyle={styles.row}
      renderItem={({ item }) => (
        <View style={styles.cardWrapper}>
          <ChildCard
            name={item.name}
            image={item.image}
            attendanceStatus={item.attendance}
          />
        </View>
      )}
      contentContainerStyle={styles.contentContainer}
      style={styles.flatList}
    />
  );
}

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  contentContainer: {
    paddingTop: 16,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  cardWrapper: {
    flex: 1,
    marginHorizontal: 8,
    height: 148,
  },
});