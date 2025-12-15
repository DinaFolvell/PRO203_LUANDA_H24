import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export interface AttendanceButtonProps {
  style?: StyleProp<ViewStyle>;
}

export function AttendanceButton(props: AttendanceButtonProps) {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={[styles.container, props.style]}
      onPress={() => router.push("/check-in")}
    >
      <View style={styles.button}>
        <MaterialIcons
          name="checklist"
          size={38}
          color="rgba(245, 69, 0, 1)"
          style={{ marginBottom: 8 }}
        />
        <Text style={styles.text}>Oppmøte</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 165,
    height: 96,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "rgba(0, 0, 0, 0.20)",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  text: {
    color: "rgba(0, 0, 0, 1)",
    textAlign: "center",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "600",
  },
});
