import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ChildService, AttendanceStatus } from "@/api/childApi";

export interface AttendanceCardProps {
  childId: string;
  photoUrl: ImageSourcePropType;
  name: string;
  note?: string;
  onClose?: () => void;
  onStatusChange?: (status: AttendanceStatus) => void;
}

const AttendanceCard: React.FC<AttendanceCardProps> = ({
  childId,
  photoUrl,
  name,
  note,
  onClose,
  onStatusChange,
}) => {
  const changeStatus = async (status: AttendanceStatus) => {
    await ChildService.updateChildAttendance(childId, status);

    onStatusChange?.(status);

    onClose?.();
  };

  return (
    <View style={styles.card}>
      {onClose && (
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <MaterialCommunityIcons name="close" size={21} color="#333" />
        </TouchableOpacity>
      )}

      {note && (
        <View style={styles.noteContainer}>
          <Text style={styles.noteTitle}>VARSLING</Text>
          <Text style={styles.noteText}>{note}</Text>
        </View>
      )}

      <Image source={photoUrl} style={styles.image} />

      <View style={styles.mainSection}>
        <Text style={styles.name}>{name}</Text>

        <View style={styles.buttonRowTwo}>
          <ShortcutButton
            iconName="account-cancel"
            iconColor="#F50000"
            label="Fravær"
            onPress={() => changeStatus("absent")}
          />

          <ShortcutButton
            iconName="hand-wave-outline"
            iconColor="#75339B"
            label="Henting"
            onPress={() => changeStatus("picked_up")}
            iconSize={18}
          />
        </View>

        <View style={styles.buttonRowFull}>
          <ShortcutButton
            iconName="account-check-outline"
            iconColor="#496F57"
            label="Registrer ankomst"
            onPress={() => changeStatus("present")}
            fullWidth
          />
        </View>
      </View>
    </View>
  );
};

export default AttendanceCard;

interface ShortcutButtonProps {
  iconName: "account-cancel" | "hand-wave-outline" | "account-check-outline";
  iconColor: string;
  label: string;
  onPress?: () => void;
  fullWidth?: boolean;
  iconSize?: number;
}

const ShortcutButton: React.FC<ShortcutButtonProps> = ({
  iconName,
  iconColor,
  label,
  onPress,
  fullWidth = false,
  iconSize = 20,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.buttonBase,
        fullWidth && { width: "100%", marginHorizontal: 0 },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.inlineContent}>
        <MaterialCommunityIcons
          name={iconName}
          size={iconSize}
          color={iconColor}
        />
        <Text style={[styles.buttonText, { color: iconColor }]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingTop: 40,
    width: 260,
    backgroundColor: "#F7F7F7",
    borderRadius: 8,
    alignItems: "center",
    paddingVertical: 14,
  },

  closeButton: {
    position: "absolute",
    top: 4,
    right: 10,
    zIndex: 10,
    padding: 6,
  },

  image: {
    width: "85%",
    height: 200,
    borderRadius: 6,
    marginBottom: 12,
  },

  mainSection: {
    width: "95%",
    alignItems: "center",
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    marginBottom: 14,
  },

  noteContainer: {
    backgroundColor: "white",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: "85%",
    marginBottom: 12,
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

  buttonRowTwo: {
    flexDirection: "row",
    width: "95%",
    height: 50,
    justifyContent: "space-between",
    marginBottom: 12,
  },

  buttonRowFull: {
    width: "90%",
    height: 50,
    marginBottom: 10,
  },

  buttonBase: {
    backgroundColor: "white",
    borderRadius: 6,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
  },

  inlineContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  buttonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "600",
  },
});
