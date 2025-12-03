import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  Image,
} from "react-native";

export interface AbsenceButtonProps {
  style?: StyleProp<ViewStyle>;
}

export function AbsenceButton(props: AbsenceButtonProps) {
    
  return (
    <TouchableOpacity style={[styles.container, props.style]}>
      <View style={styles.button}>
        <Image
          source={require("../assets/icons/absence-icon.png")}
          style={styles.icon}
          resizeMode="contain"
        />
        <Text style={styles.text}>Fravær</Text>
      </View>
    </TouchableOpacity>
  );
}
//./assets/icons/abcense-icon.png

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
    backgroundColor: "rgba(237, 243, 239, 1)",
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
    fontFamily: "Roboto",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "600",
  },
});
