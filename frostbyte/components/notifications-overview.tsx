import { StyleSheet, View, Text, ScrollView } from "react-native";
import type { ViewStyle, StyleProp } from "react-native";

export interface NotificationsProps {
  name: string;
  message: string;
  isSeen: boolean;
}

interface NotificationsOverviewProps {
  notifications: NotificationsProps[];
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export const mockNotifications: NotificationsProps[] = [
  {
    name: "Kari Jaquesson",
    message: "Amalie har med egen mat i dag",
    isSeen: false,
  },
  {
    name: "Per Hansen",
    message: "Møte om barnets utvikling kl 14:00",
    isSeen: false,
  },
  {
    name: "Lisa Andersen",
    message: "Tusen takk for hyggelig samtale!",
    isSeen: true,
  },
  {
    name: "Ola Nordmann",
    message: "Barnet ditt har hatt en fin dag!",
    isSeen: false,
  },
  {
    name: "Emma Berg",
    message: "Husk å levere skjema før fredag",
    isSeen: true,
  },
  {
    name: "Jonas Pettersen",
    message: "Tur til skogen på onsdag",
    isSeen: false,
  },
  {
    name: "Maria Olsen",
    message: "Ny meny for neste uke er klar",
    isSeen: true,
  },
];


function NotificationItem({ name, message, isSeen }: NotificationsProps) {
  return (
    <View style={styles.notificationItem}>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
      {!isSeen && <View style={styles.unreadDot} />}
    </View>
  );
}


export function NotificationsOverview({
  notifications,
  style,
  testID,
}: NotificationsOverviewProps) {
  return (
    <View testID={testID} style={[styles.root, style]}>
      <View style={styles.header}>
        <Text style={styles.title}>Varslinger</Text>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.notificationsList}>
          {notifications.map((notification, index) => (
            <NotificationItem key={index} {...notification} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 23,
    fontWeight: "700",
  },
  scrollContainer: {
    maxHeight: 264,
  },
  notificationsList: {
    gap: 12,
  },
  notificationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    minHeight: 76,
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
    color: "#1a1a1a",
  },
  message: {
    fontSize: 14,
    color: "#666",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#007AFF",
    marginLeft: 12,
  },
});
