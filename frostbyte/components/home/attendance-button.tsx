import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import { useRouter } from "expo-router";

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
        <Octicons name="checklist" size={35} color="rgba(245, 69, 0, 1)" />
        <Text style={styles.text}>Oppmøte</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 165,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(254, 240, 235, 1)",
    borderRadius: 6,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
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
