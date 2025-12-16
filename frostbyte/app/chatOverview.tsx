import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Stack, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
    sender: "Lucas Fjongers",
    preview: "Sigurd har fått svineinfluensa..",
    date: "Nå",
  },
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
];

export default function ChatOverview() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <View style={styles.container}>
        <View style={[styles.header, { paddingTop: insets.top }]}>
          <TouchableOpacity onPress={() => router.push("/dashboard")}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Meldinger</Text>
          <View style={{ width: 24 }} />
        </View>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionTitle}>Grupper</Text>
          <View style={styles.groupRow}>
            {groups.map((group, index) => (
              <TouchableOpacity key={index} style={styles.groupCard}>
                {group.images.map((_, i) => (
                  <Image
                    key={i}
                    source={require("../assets/images/amalie.png")}
                    style={[
                      styles.groupImage,
                      i === 1 && {
                        position: "absolute",
                        left: 16,
                        top: 14,
                      },
                    ]}
                  />
                ))}

                <View style={styles.groupNameWrapper}>
                  <Text style={styles.groupName}>{group.name}</Text>
                  {group.unread && <View style={styles.unreadDot} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Meldinger</Text>

          {messages.map((msg, index) => (
            <TouchableOpacity
              key={index}
              style={styles.messageRow}
              onPress={() => router.push("/chat-room")}
            >
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
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffdfc",
  },

  header: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fffdfc",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  backArrow: {
    fontSize: 22,
  },

  content: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },

  groupRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  groupCard: {
    marginTop: 13,
    width: 120,
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
  },
  groupNameWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  groupName: {
    fontSize: 16,
    fontWeight: "500",
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
    marginLeft: 4,
  },
});
