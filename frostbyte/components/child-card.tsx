// Dette kortet er det som vises for hvert barn i rutenettet på oppmøtelisten.
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export interface ChildCardProps {
  /** Barnets navn som skal vises */
  name?: string;
  /** Ekstra stil på root */
  style?: object;
}

export function ChildCard({ name = "Emma Y J", style }: ChildCardProps) {
  return (
    <View style={[styles.root, style]}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/emma.png")}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>{name}</Text>
        <View style={styles.statusVector}>
          {/* Her kan du legge inn et ikon eller status */}
        </View>
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
    borderTopRightRadius: 8,  // avrundede hjørner øverst
    marginBottom: 0, // litt luft mellom bilde og navn/status
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  nameContainer: {
    flexDirection: "row", // navn og status på samme linje
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


