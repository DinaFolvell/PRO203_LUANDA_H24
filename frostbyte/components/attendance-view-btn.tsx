import { router, usePathname } from "expo-router";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function ViewToggleButton() {
  const pathname = usePathname();
  const onPress = () => {
    if (pathname === "/attendance") {
      router.push("/check-in");
    } else {
      router.push("/attendance");
    }
  };
  
  const isOnAttendance = pathname === "/attendance";
  
  return (
    <TouchableOpacity onPress={onPress} style={{ padding: 8 }}>
      {isOnAttendance ? (
        <MaterialIcons name="grid-view" size={24} color="#333" />
      ) : (
        <MaterialIcons name="view-list" size={24} color="#333" />
      )}
    </TouchableOpacity>
  );
}