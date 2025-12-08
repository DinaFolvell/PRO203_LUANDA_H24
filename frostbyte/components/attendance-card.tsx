import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export interface AttendanceCardProps {
  photoUrl: ImageSourcePropType;
  name: string;
  note?: string;
}

const AttendanceCard: React.FC<AttendanceCardProps> = ({
  photoUrl,
  name,
  note,
}) => {
  return (
    <View style={styles.card}>
      <Image source={photoUrl} style={styles.image} />

      <View style={styles.mainSection}>
        <Text style={styles.name}>{name}</Text>

        {note && (
          <View style={styles.noteContainer}>
            <Text style={styles.noteTitle}>VARSLING</Text>
            <Text style={styles.noteText}>{note}</Text>
          </View>
        )}

        <Text style={styles.shortcutTitle}>Snarveier</Text>

        {/* 2 rader med 2 knapper */}
        <View style={styles.row}>
          <ShortcutButton
            icon={
              <MaterialCommunityIcons
                name="account-cancel"
                size={40}
                color="#F54500"
              />
            }
            label="Fravær"
            onPress={() => {}}
          />
          <ShortcutButton
            icon={<MaterialIcons name="checklist" size={40} color="#F54500" />}
            label="Oppmøte"
            onPress={() => {}}
          />
        </View>

        <View style={styles.row}>
          <ShortcutButton
            icon={
              <MaterialCommunityIcons
                name="human-baby-changing-table"
                size={40}
                color="#F54500"
              />
            }
            label="Pleie-liste"
            onPress={() => {}}
          />
          <ShortcutButton
            icon={
              <MaterialCommunityIcons
                name="message-text"
                size={40}
                color="#F54500"
              />
            }
            label="Meldinger"
            onPress={() => {}}
          />
        </View>
      </View>
    </View>
  );
};

export default AttendanceCard;

interface ShortcutButtonProps {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
}

const ShortcutButton: React.FC<ShortcutButtonProps> = ({
  icon,
  label,
  onPress,
}) => (
  <TouchableOpacity style={styles.customButton} onPress={onPress}>
    {icon}
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    paddingTop: 20,
    width: 290,
    backgroundColor: "#F7F7F7",
    borderRadius: 8,
    overflow: "hidden",
    alignItems: "center",
    paddingVertical: 8,
  },
  image: {
    width: "82%",
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  mainSection: {
    width: "95%",
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    marginBottom: 8,
  },
  noteContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: "75%",
    marginBottom: 8,
    alignItems: "center",
  },
  noteTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 4,
    color: "#000",
    textAlign: "center",
  },
  noteText: {
    fontSize: 12,
    color: "#333",
    textAlign: "center",
  },
  shortcutTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
    color: "#000",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "92%",
    marginBottom: 12,
  },
  customButton: {
    backgroundColor: "white",
    borderRadius: 8,
    width: "48%",
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
  },
});
