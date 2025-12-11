import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { useRouter } from "expo-router";

const groups = [
  {
    name: "Marihøna",
    images: ["../assets/images/amalie.png", "../assets/images/amalie.png"],
    unread: true,
  },
  {
    name: "Barnehagen",
    images: ["../assets/images/amalie.png", "../assets/images/amalie.png"],
    unread: false,
  },
];

const messages = [
  {
    sender: "Ulrikke Amaliussen",
    preview: "Amalie har med egen mat i dag",
    date: "I dag",
  },
  {
    sender: "Silje Sundeberget",
    preview: "Martine tatt med seg en fotbal..",
    date: "I dag",
  },
  {
    sender: "Martin Fossefjell",
    preview: "Dina har mistet ballen igjen..",
    date: "I dag",
  },
  {
    sender: "Petter Hoffset",
    preview: "Gelilah reiser vekk i uke 49",
    date: "2.des",
  },
  {
    sender: "Ulrikke Amaliussen",
    preview: "Amalie skal til legen fredag 12..",
    date: "1.des",
  },
  {
    sender: "Hanna Trei-Skagen",
    preview: "Vi har en ekstra fotball i hus. E..",
    date: "1.des",
  },
  {
    sender: "Martin Fossefjell",
    preview: "Dina har mistet fotballen hun h..",
    date: "28.nov",
  },
  {
    sender: "Line Ytterland",
    preview: "Hvordan går det med Emma?..",
    date: "27.nov",
  },
  {
    sender: "Lucas Fjongers",
    preview: "Sigurd har fått svineinfluensa..",
    date: "25.nov",
  },
];

export default function chatOverview() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/")}>
          <Ionicons name="chevron-back-outline" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meldinger</Text>
        <TouchableOpacity>
          <MaterialIcons
            name="add-comment"
            size={30}
            color="rgba(245, 69, 0, 1)"
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <Text style={styles.sectionTitle}>Grupper</Text>
        <View style={styles.groupRow}>
          {groups.map((group, index) => (
            <View key={index} style={styles.groupCard}>
              {group.images.map((img, i) => (
                <Image
                  key={i}
                  source={require("../assets/images/amalie.png")}
                  style={styles.groupImage}
                />
              ))}
              <View style={styles.groupNameWrapper}>
                <Text style={styles.groupName}>{group.name}</Text>
                {group.unread && <View style={styles.unreadDot} />}
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Meldinger</Text>
        {messages.map((msg, index) => (
          <View key={index} style={styles.messageRow}>
            <Image
              source={require("../assets/images/amalie.png")}
              style={styles.avatar}
            />
            <View style={styles.messageText}>
              <Text style={styles.sender}>{msg.sender}</Text>
              <Text style={styles.preview}>{msg.preview}</Text>
            </View>
            <View style={styles.dateWrapper}>
              <Text style={styles.date}>{msg.date}</Text>
              <View style={styles.unreadDot} />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffdfc",
    paddingTop: 10,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },
  groupRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  groupCard: {
    marginTop: 12,
    width: 112,
    height: 83,
    marginHorizontal: 6,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 4,
  },
  groupImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "cover",
    marginTop: -10,
  },
  groupName: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  messageText: {
    flex: 1,
  },
  sender: {
    fontSize: 16,
    fontWeight: "500",
  },
  preview: {
    fontSize: 14,
    fontWeight: "300",
    color: "#333",
  },
  dateWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  date: {
    fontSize: 10,
    fontWeight: "300",
    color: "#666",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "dodgerblue",
    marginLeft: 2,
  },
  groupNameWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
});
