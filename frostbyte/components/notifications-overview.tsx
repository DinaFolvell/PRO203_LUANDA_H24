import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
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
  onViewAll?: () => void;
}

export const mockNotifications: NotificationsProps[] = [
  {
    name: "Lucas Fjongers",
    message: "Sigurd har fått svineinfluensa🤧",
    isSeen: false,
  },
  {
    name: "Ulrikke Amaliussen",
    message: "Amalie har med egen mat i dag☺️",
    isSeen: true,
  },
  {
    name: "Silje Sundeberget",
    message: "Martine har tatt med seg en ball hjem...",
    isSeen: false,
  },
  {
    name: "Martin Fossefjell",
    message: "Dina har mistet ballen igjen..⚽️",
    isSeen: false,
  },
  {
    name: "Petter Hoffset",
    message: "Gelilah reiser vekk i uke 49!⛰️",
    isSeen: true,
  },
  {
    name: "Hanna Trei-Skagen",
    message: "Vi har en ekstra fotball i hus😟 Er det noen...",
    isSeen: false,
  },
  {
    name: "Line Ytterland",
    message: "Hvordan går det med Emma? Hun sov litt då...",
    isSeen: false,
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
  onViewAll,
}: NotificationsOverviewProps) {
  return (
    <View testID={testID} style={[styles.root, style]}>
      <View style={styles.header}>
        <Text style={styles.title}>Varslinger</Text>
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={onViewAll}
          activeOpacity={0.7}
        >
          <Text style={styles.arrowIcon}>›</Text>
        </TouchableOpacity>
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
    flexShrink: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 23,
    fontWeight: "700",
  },
  arrowButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(254, 240, 235, 1)",
    justifyContent: "center",
    alignItems: "center",
    color: "",
  },
  arrowIcon: {
    fontSize: 24,
    fontWeight: "600",
    color: "rgba(245, 69, 0, 1)",
  },
  scrollContainer: {
    flexGrow: 1,
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
