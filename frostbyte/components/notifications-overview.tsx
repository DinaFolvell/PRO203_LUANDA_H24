import { StyleSheet, View, Text } from "react-native";
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
];

// Enkelt varsel-element
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

// Hovedkomponent
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

      <View style={styles.notificationsList}>
        {notifications.map((notification, index) => (
          <NotificationItem key={index} {...notification} />
        ))}
      </View>
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
    backgroundColor: "#00C0F5",
    marginLeft: 12,
  },
});
