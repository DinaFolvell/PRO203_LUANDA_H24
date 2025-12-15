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

export interface CareButtonProps {
  style?: StyleProp<ViewStyle>;
}

export function CareButton(props: CareButtonProps) {
  return (
    <TouchableOpacity style={[styles.container, props.style]}>
      <View style={styles.button}>
        <MaterialCommunityIcons
          name="human-baby-changing-table"
          size={38}
          color="rgba(245, 69, 0, 1)"
          style={{ marginBottom: 8 }}
        />
        <Text style={styles.text}>Pleie</Text>
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
    shadowRadius: 1,
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
