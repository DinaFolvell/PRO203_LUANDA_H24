import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  Image,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";

export interface AbsenceButtonProps {
  style?: StyleProp<ViewStyle>;
}

export function AbsenceButton(props: AbsenceButtonProps) {
    
  return (
    <TouchableOpacity

      style={[styles.container, props.style]}
      onPress={() => router.push("/absence")}
    >
      <View style={styles.button}>
        <MaterialCommunityIcons
          name="account-cancel-outline"
          size={40}
          color="rgba(245, 69, 0, 1)"
          style={{ marginBottom: 8 }}
        />
        <Text style={styles.text}>Fravær</Text>
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
    color: "rgba(0, 0, 0, 1)",
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
